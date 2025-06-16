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
        // First, get total count and available filters
        let countQuery = supabase
          .from('offer_search')
          .select('*', { count: 'exact', head: false });

        let dataQuery = supabase
          .from('offer_search')
          .select('*');

        // Apply search filter
        if (searchQuery) {
          const searchTerms = searchQuery.trim().split(/\s+/);
          
          if (searchTerms.length > 0) {
            const filters = searchTerms.map(term => 
              `title.ilike.%${term}%,store_name.ilike.%${term}%`
            );
            
            const searchFilter = filters.join(',');
            countQuery = countQuery.or(searchFilter);
            dataQuery = dataQuery.or(searchFilter);
          }
        }

        // Apply brand filter
        if (brandFilter && brandFilter.length > 0) {
          countQuery = countQuery.in('brand_name', brandFilter);
          dataQuery = dataQuery.in('brand_name', brandFilter);
        }

        // Apply store filter
        if (storeFilter && storeFilter.length > 0) {
          countQuery = countQuery.in('store_name', storeFilter);
          dataQuery = dataQuery.in('store_name', storeFilter);
        }

        // Apply price range filter
        if (priceRange && (priceRange.min > 0 || priceRange.max < 1000)) {
          countQuery = countQuery.gte('sale_price', priceRange.min).lte('sale_price', priceRange.max);
          dataQuery = dataQuery.gte('sale_price', priceRange.min).lte('sale_price', priceRange.max);
        }

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

        // Execute queries
        const [{ data: allData, error: countError }, { data, error }] = await Promise.all([
          countQuery,
          dataQuery
        ]);

        if (countError || error) {
          console.error("Error fetching from offer_search:", countError || error);
          return { 
            products: [], 
            totalCount: 0, 
            hasMore: false, 
            availableBrands: [], 
            availableStores: [] 
          };
        }

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

        // Extract unique brands and stores from all data (for filters)
        const availableBrands = [...new Set(allData?.map(product => product.brand_name))]
          .filter(brand => brand && brand !== 'Unknown Store')
          .sort();

        const availableStores = [...new Set(allData?.map(product => product.store_name))]
          .filter(store => store && store.trim() !== '')
          .sort();

        const totalCount = allData?.length || 0;
        const hasMore = (from + products.length) < totalCount;

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
  });
};

// Remove the applyFilters function as filtering is now done server-side
