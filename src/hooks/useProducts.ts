
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
};

export const useProducts = (searchQuery: string, sortBy: string) => {
  return useQuery({
    queryKey: ["products", searchQuery, sortBy],
    queryFn: async () => {
      // Try to use offer_search view first, if that fails, fall back to a basic query
      try {
        let query = supabase
          .from('offer_search')
          .select('*');

        if (searchQuery) {
          // Split search query into individual terms
          const searchTerms = searchQuery.trim().split(/\s+/);
          
          // Create conditions for each term
          if (searchTerms.length > 0) {
            const filters = searchTerms.map(term => 
              `product_name.ilike.%${term}%,merchant_name.ilike.%${term}%`
            );
            
            // Apply filters using Supabase's Filter API syntax
            query = query.or(filters.join(','));
          }
        }

        const { data, error } = await query.limit(50);

        if (error) {
          console.error("Error fetching from offer_search:", error);
          // Return empty array as fallback
          return [];
        }

        // Transform the data to match our ProductView interface
        const transformedData: ProductView[] = (data || []).map((item: any) => ({
          id: item.id || Math.random(),
          nome: item.product_name || item.name || 'Unnamed Product',
          description: item.description || `Product from ${item.merchant_name || 'Unknown'}`,
          url: item.aw_deep_link || item.url || null,
          photo: item.aw_image_url || item.photo || null,
          price: parseFloat(item.price) || null,
          loja_nome: item.merchant_name || item.store_name || 'Unknown Store'
        }));

        return transformedData;

      } catch (fallbackError) {
        console.error("Error in products query:", fallbackError);
        return [];
      }
    }
  });
};
