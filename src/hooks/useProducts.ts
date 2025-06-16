import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

// Define a type for our products view
export type ProductView = {
  offer_id: string;
  title: string;
  url_slug: string;
  deep_link_url: string;
  brand_name: string;
  advertiser_name: string;
  store_name: string;
  image_url: string;
  sale_price: number | null;
  promotional_price: number | null;
  // Adding missing properties for compatibility
  id: string;
  nome: string;
  description: string;
  url: string;
  photo: string;
  price: number | null;
  loja_nome: string;
  category: string;
};

export interface ProductsResponse {
  products: ProductView[];
  totalCount: number;
  hasMore: boolean;
  availableBrands: string[];
  availableStores: string[];
}

export const useProducts = (
  searchQuery: string, 
  sortBy: string, 
  page: number = 1,
  pageSize: number = 50,
  brandFilter?: string[], 
  priceRange?: { min: number; max: number },
  storeFilter?: string[]
) => {
  return useQuery({
    queryKey: ["products", searchQuery, sortBy, page, pageSize, brandFilter, priceRange, storeFilter],
    queryFn: async (): Promise<ProductsResponse> => {
      try {
        console.log('Fetching products with params:', { searchQuery, sortBy, page, pageSize, brandFilter, priceRange, storeFilter });

        // Create a base query for filtering
        const createBaseQuery = () => {
          let query = supabase.from('offer_search').select('*');
          
          // Apply search filter
          if (searchQuery) {
            const searchTerms = searchQuery.trim().split(/\s+/);
            if (searchTerms.length > 0) {
              // Use individual ilike conditions combined with or
              const searchConditions = searchTerms.map(term => `title.ilike.%${term}%`).join(',');
              query = query.or(searchConditions);
            }
          }

          // Apply filters
          if (brandFilter && brandFilter.length > 0) {
            query = query.in('brand_name', brandFilter);
          }

          if (storeFilter && storeFilter.length > 0) {
            query = query.in('store_name', storeFilter);
          }

          if (priceRange && (priceRange.min > 0 || priceRange.max < 1000)) {
            query = query.gte('sale_price', priceRange.min).lte('sale_price', priceRange.max);
          }

          return query;
        };

        // Data query with pagination and sorting
        let dataQuery = createBaseQuery();
        
        // Apply sorting
        switch (sortBy) {
          case 'price-desc':
            dataQuery = dataQuery.order('sale_price', { ascending: false });
            break;
          case 'price-asc':
            dataQuery = dataQuery.order('sale_price', { ascending: true });
            break;
          case 'nome-desc':
            dataQuery = dataQuery.order('title', { ascending: false });
            break;
          case 'nome-asc':
          default:
            dataQuery = dataQuery.order('title', { ascending: true });
            break;
        }

        // Apply pagination
        const from = (page - 1) * pageSize;
        const to = from + pageSize - 1;
        dataQuery = dataQuery.range(from, to);

        // Count query - same filters but for count only
        let countQuery = createBaseQuery().select('*', { count: 'exact', head: true });

        // For filters, we need to get all available brands and stores from the filtered dataset
        // Create separate queries for brands and stores that match the search criteria
        let filtersQuery = supabase.from('offer_search').select('brand_name, store_name');
        
        // Only apply search filter to filters query, not brand/store/price filters
        // This ensures we show all available options for the current search
        if (searchQuery) {
          const searchTerms = searchQuery.trim().split(/\s+/);
          if (searchTerms.length > 0) {
            const searchConditions = searchTerms.map(term => `title.ilike.%${term}%`).join(',');
            filtersQuery = filtersQuery.or(searchConditions);
          }
        }

        // Execute queries
        console.log('Executing queries...');
        const [{ data, error }, { count, error: countError }, { data: filtersData, error: filtersError }] = await Promise.all([
          dataQuery,
          countQuery,
          filtersQuery
        ]);

        if (error) {
          console.error("Error fetching data:", error);
          return { 
            products: [], 
            totalCount: 0, 
            hasMore: false, 
            availableBrands: [], 
            availableStores: [] 
          };
        }

        if (countError) {
          console.warn("Error fetching count:", countError);
        }

        if (filtersError) {
          console.warn("Error fetching filters:", filtersError);
        }

        console.log('Query results:', { dataLength: data?.length, count, filtersDataLength: filtersData?.length });

        // Transform the data to match our ProductView interface
        const products: ProductView[] = (data || []).map((item: any) => ({
          offer_id: item.offer_id || Math.random().toString(),
          title: item.title || 'Unnamed Product',
          url_slug: item.url_slug || '',
          deep_link_url: item.deep_link_url || '',
          brand_name: item.brand_name || 'Unknown Store',
          advertiser_name: item.advertiser_name || '',
          store_name: item.store_name || '',
          image_url: item.image_url || '/placeholder.svg',
          sale_price: parseFloat(item.sale_price) || null,
          promotional_price: parseFloat(item.promotional_price) || null,
          // Compatibility properties
          id: item.offer_id || Math.random().toString(),
          nome: item.title || 'Unnamed Product',
          description: `Product from ${item.brand_name || 'Unknown'}`,
          url: item.deep_link_url || '',
          photo: item.image_url || '/placeholder.svg',
          price: parseFloat(item.sale_price) || null,
          loja_nome: item.store_name || item.brand_name || 'Unknown Store',
          category: item.brand_name || 'Uncategorized'
        }));

        // Extract unique brands and stores from the filters data
        const availableBrands = [...new Set(filtersData?.map(product => product.brand_name))]
          .filter(brand => brand && brand !== 'Unknown Store')
          .sort();

        const availableStores = [...new Set(filtersData?.map(product => product.store_name))]
          .filter(store => store && store.trim() !== '')
          .sort();

        const totalCount = count || 0;
        const hasMore = (from + products.length) < totalCount;

        console.log('Final results:', { 
          productsCount: products.length, 
          totalCount, 
          hasMore, 
          availableBrandsCount: availableBrands.length,
          availableStoresCount: availableStores.length 
        });

        return { 
          products, 
          totalCount, 
          hasMore, 
          availableBrands, 
          availableStores 
        };

      } catch (fallbackError) {
        console.error("Error in products query:", fallbackError);
        return { 
          products: [], 
          totalCount: 0, 
          hasMore: false, 
          availableBrands: [], 
          availableStores: [] 
        };
      }
    },
    // Keep data fresh for 5 minutes to avoid unnecessary refetches
    staleTime: 5 * 60 * 1000,
    // Add retry logic for failed queries
    retry: 2,
    retryDelay: 1000,
  });
};

// Remove the applyFilters function as filtering is now done server-side
