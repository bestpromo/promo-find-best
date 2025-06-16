
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
          .limit(1000);

        if (searchQuery) {
          const searchTerms = searchQuery.trim().split(/\s+/);
          
          if (searchTerms.length > 0) {
            // Using correct field names from the offer_search view
            const filters = searchTerms.map(term => 
              `name.ilike.%${term}%,store_name.ilike.%${term}%,description.ilike.%${term}%`
            );
            
            query = query.or(filters.join(','));
          }
        }

        // Apply brand filter if provided - using store_name instead of merchant_name
        if (brandFilter) {
          query = query.ilike('store_name', `%${brandFilter}%`);
        }

        // Apply price range filter if provided
        if (priceRange) {
          query = query.gte('price', priceRange.min).lte('price', priceRange.max);
        }

        console.log('Executing query with filters:', { searchQuery, brandFilter, priceRange });

        const { data, error } = await query;

        if (error) {
          console.error("Error fetching from offer_search:", error);
          return { products: [], availableBrands: [] };
        }

        console.log('Raw data from offer_search:', data);

        // Transform the data to match our ProductView interface
        const transformedData: ProductView[] = (data || []).map((item: any) => ({
          offer_id: item.id || Math.random().toString(),
          title: item.name || 'Unnamed Product',
          url_slug: item.url_slug || '',
          deep_link_url: item.url || '',
          brand_name: item.store_name || 'Unknown Store',
          image_url: item.photo || '/placeholder.svg',
          sale_price: parseFloat(item.price) || null,
          promotional_price: null, // This field might not exist in the view
          // Compatibility properties
          id: item.id || Math.random().toString(),
          nome: item.name || 'Unnamed Product',
          description: item.description || `Product from ${item.store_name || 'Unknown'}`,
          url: item.url || '',
          photo: item.photo || '/placeholder.svg',
          price: parseFloat(item.price) || null,
          loja_nome: item.store_name || 'Unknown Store',
          category: item.store_name || 'Uncategorized'
        }));

        console.log('Transformed data:', transformedData);

        // Extract unique brands from the results
        const availableBrands = [...new Set(transformedData.map(product => product.brand_name))]
          .filter(brand => brand && brand !== 'Unknown Store')
          .sort();

        console.log('Available brands:', availableBrands);

        return { products: transformedData, availableBrands };

      } catch (fallbackError) {
        console.error("Error in products query:", fallbackError);
        return { products: [], availableBrands: [] };
      }
    }
  });
};
