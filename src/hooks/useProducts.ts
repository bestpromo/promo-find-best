
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

export const useProducts = (searchQuery: string, sortBy: string, brandFilter?: string[], priceRange?: { min: number; max: number }) => {
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
              `title.ilike.%${term}%,brand_name.ilike.%${term}%`
            );
            
            query = query.or(filters.join(','));
          }
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
          offer_id: item.offer_id || Math.random().toString(),
          title: item.title || 'Unnamed Product',
          url_slug: item.url_slug || '',
          deep_link_url: item.deep_link_url || '',
          brand_name: item.brand_name || 'Unknown Store',
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
          loja_nome: item.brand_name || 'Unknown Store',
          category: item.brand_name || 'Uncategorized'
        }));

        console.log('Transformed data:', transformedData);

        // Extract unique brands from search results for dynamic filtering
        const availableBrands = [...new Set(transformedData.map(product => product.brand_name))]
          .filter(brand => brand && brand !== 'Unknown Store')
          .sort();

        // Apply client-side filtering for better performance
        let filteredProducts = transformedData;

        // Apply brand filter if provided
        if (brandFilter && brandFilter.length > 0) {
          filteredProducts = filteredProducts.filter(product => 
            brandFilter.includes(product.brand_name)
          );
          console.log('After brand filter:', filteredProducts.length);
        }

        // Apply price range filter if provided
        if (priceRange && (priceRange.min > 0 || priceRange.max < 1000)) {
          filteredProducts = filteredProducts.filter(product => {
            const price = product.sale_price || 0;
            return price >= priceRange.min && price <= priceRange.max;
          });
          console.log('After price filter:', filteredProducts.length);
        }

        console.log('Available brands:', availableBrands);
        console.log('Final filtered products:', filteredProducts.length);

        return { products: filteredProducts, availableBrands };

      } catch (fallbackError) {
        console.error("Error in products query:", fallbackError);
        return { products: [], availableBrands: [] };
      }
    }
  });
};
