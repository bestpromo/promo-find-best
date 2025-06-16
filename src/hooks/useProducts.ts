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
              `title.ilike.%${term}%,brand_name.ilike.%${term}%`
            );
            
            query = query.or(filters.join(','));
          }
        }

        console.log('Executing query with search:', searchQuery);

        const { data, error } = await query;

        if (error) {
          console.error("Error fetching from offer_search:", error);
          return { allProducts: [], availableBrands: [] };
        }

        console.log('Raw data count from offer_search:', data?.length || 0);

        // Transform the data to match our ProductView interface
        const allProducts: ProductView[] = (data || []).map((item: any) => ({
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

        // Extract ALL unique brands from the products
        const availableBrands = [...new Set(allProducts.map(product => product.brand_name))]
          .filter(brand => brand && brand !== 'Unknown Store')
          .sort();

        console.log('All available brands:', availableBrands);
        console.log('Total products fetched:', allProducts.length);

        // Return raw data, filtering will be done in the component
        return { allProducts, availableBrands };

      } catch (fallbackError) {
        console.error("Error in products query:", fallbackError);
        return { allProducts: [], availableBrands: [] };
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
  priceRange?: { min: number; max: number }
) => {
  let filteredProducts = allProducts;

  // Apply brand filter
  if (brandFilter && brandFilter.length > 0) {
    console.log('=== APPLYING BRAND FILTER ===');
    console.log('Selected brands:', brandFilter);
    
    filteredProducts = allProducts.filter(product => {
      const isIncluded = brandFilter.includes(product.brand_name);
      console.log(`Product: ${product.title}, Brand: ${product.brand_name}, Included: ${isIncluded}`);
      return isIncluded;
    });
    
    console.log(`Filtered from ${allProducts.length} to ${filteredProducts.length} products`);
    
    // Show count by brand for verification
    const brandCounts = filteredProducts.reduce((acc, p) => {
      acc[p.brand_name] = (acc[p.brand_name] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
    console.log('Products by selected brands:', brandCounts);
  }

  // Apply price range filter
  if (priceRange && (priceRange.min > 0 || priceRange.max < 1000)) {
    const beforePriceFilter = filteredProducts.length;
    filteredProducts = filteredProducts.filter(product => {
      const price = product.sale_price || 0;
      return price >= priceRange.min && price <= priceRange.max;
    });
    console.log(`Price filter: ${beforePriceFilter} -> ${filteredProducts.length} products`);
  }

  return filteredProducts;
};
