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
  store_name: string; // Add store_name field
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

export const useProducts = (searchQuery: string, sortBy: string, brandFilter?: string[], priceRange?: { min: number; max: number }) => {
  return useQuery({
    // Remove brandFilter and priceRange from queryKey to prevent refetching on filter changes
    queryKey: ["products", searchQuery],
    queryFn: async () => {
      try {
        let query = supabase
          .from('offer_search')
          .select('*')
          .limit(1000);

        if (searchQuery) {
          const searchTerms = searchQuery.trim().split(/\s+/);
          
          if (searchTerms.length > 0) {
            // Using correct field names from the offer_search view
            const filters = searchTerms.map(term => 
              `title.ilike.%${term}%,store_name.ilike.%${term}%`
            );
            
            query = query.or(filters.join(','));
          }
        }

        const { data, error } = await query;

        if (error) {
          console.error("Error fetching from offer_search:", error);
          return { allProducts: [], availableBrands: [], availableStores: [] };
        }

        // Transform the data to match our ProductView interface
        const allProducts: ProductView[] = (data || []).map((item: any) => ({
          offer_id: item.offer_id || Math.random().toString(),
          title: item.title || 'Unnamed Product',
          url_slug: item.url_slug || '',
          deep_link_url: item.deep_link_url || '',
          brand_name: item.brand_name || 'Unknown Store',
          advertiser_name: item.advertiser_name || '',
          store_name: item.store_name || '', // Add store_name mapping
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
          loja_nome: item.store_name || item.brand_name || 'Unknown Store', // Use store_name for loja_nome
          category: item.brand_name || 'Uncategorized'
        }));

        // Extract ALL unique brands from the products
        const availableBrands = [...new Set(allProducts.map(product => product.brand_name))]
          .filter(brand => brand && brand !== 'Unknown Store')
          .sort();

        // Extract ALL unique stores from the products
        const availableStores = [...new Set(allProducts.map(product => product.store_name))]
          .filter(store => store && store.trim() !== '')
          .sort();

        // Return raw data, filtering will be done in the component
        return { allProducts, availableBrands, availableStores };

      } catch (fallbackError) {
        console.error("Error in products query:", fallbackError);
        return { allProducts: [], availableBrands: [], availableStores: [] };
      }
    },
    // Keep data fresh for 5 minutes to avoid unnecessary refetches
    staleTime: 5 * 60 * 1000,
  });
};

// Helper function to apply filters client-side
export const applyFilters = (
  allProducts: ProductView[], 
  brandFilter?: string[], 
  priceRange?: { min: number; max: number },
  storeFilter?: string[]
) => {
  let filteredProducts = allProducts;

  // Apply brand filter
  if (brandFilter && brandFilter.length > 0) {
    filteredProducts = filteredProducts.filter(product => {
      return brandFilter.includes(product.brand_name);
    });
  }

  // Apply store filter
  if (storeFilter && storeFilter.length > 0) {
    filteredProducts = filteredProducts.filter(product => {
      return storeFilter.includes(product.store_name);
    });
  }

  // Apply price range filter
  if (priceRange && (priceRange.min > 0 || priceRange.max < 1000)) {
    filteredProducts = filteredProducts.filter(product => {
      const price = product.sale_price || 0;
      return price >= priceRange.min && price <= priceRange.max;
    });
  }

  return filteredProducts;
};
