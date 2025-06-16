
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

// Define a type for our products view
export type ProductView = {
  offer_id: string;
  title: string;
  url_slug: string;
  deep_link_url: string;
  brand_name: string;
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

export const useProducts = (searchQuery: string, sortBy: string, brandFilter?: string, priceRange?: { min: number; max: number }) => {
  return useQuery({
    queryKey: ["products", searchQuery, sortBy, brandFilter, priceRange],
    queryFn: async () => {
      try {
        let query = supabase
          .from('offer_search')
          .select('*')
          .limit(1000); // Limiting to 1000 products as requested

        if (searchQuery) {
          const searchTerms = searchQuery.trim().split(/\s+/);
          
          if (searchTerms.length > 0) {
            const filters = searchTerms.map(term => 
              `product_name.ilike.%${term}%,merchant_name.ilike.%${term}%`
            );
            
            query = query.or(filters.join(','));
          }
        }

        // Apply brand filter if provided
        if (brandFilter) {
          query = query.ilike('merchant_name', `%${brandFilter}%`);
        }

        // Apply price range filter if provided
        if (priceRange) {
          query = query.gte('price', priceRange.min).lte('price', priceRange.max);
        }

        const { data, error } = await query;

        if (error) {
          console.error("Error fetching from offer_search:", error);
          return { products: [], availableBrands: [] };
        }

        // Transform the data to match our ProductView interface
        const transformedData: ProductView[] = (data || []).map((item: any) => ({
          offer_id: item.id || Math.random().toString(),
          title: item.product_name || item.name || 'Unnamed Product',
          url_slug: item.url_slug || '',
          deep_link_url: item.aw_deep_link || item.url || '',
          brand_name: item.merchant_name || item.store_name || 'Unknown Store',
          image_url: item.aw_image_url || item.photo || '/placeholder.svg',
          sale_price: parseFloat(item.price) || null,
          promotional_price: parseFloat(item.promotional_price) || null,
          // Compatibility properties
          id: item.id || Math.random().toString(),
          nome: item.product_name || item.name || 'Unnamed Product',
          description: item.description || `Product from ${item.merchant_name || 'Unknown'}`,
          url: item.aw_deep_link || item.url || '',
          photo: item.aw_image_url || item.photo || '/placeholder.svg',
          price: parseFloat(item.price) || null,
          loja_nome: item.merchant_name || item.store_name || 'Unknown Store',
          category: item.merchant_name || item.store_name || 'Uncategorized'
        }));

        // Extract unique brands from the results
        const availableBrands = [...new Set(transformedData.map(product => product.brand_name))]
          .filter(brand => brand && brand !== 'Unknown Store')
          .sort();

        return { products: transformedData, availableBrands };

      } catch (fallbackError) {
        console.error("Error in products query:", fallbackError);
        return { products: [], availableBrands: [] };
      }
    }
  });
};
