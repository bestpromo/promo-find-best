
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export const useProducts = (searchQuery: string, sortBy: string) => {
  return useQuery({
    queryKey: ["products", searchQuery, sortBy],
    queryFn: async () => {
      let query = supabase
        .from("products")
        .select("*");

      if (searchQuery) {
        // Split search query into individual terms
        const searchTerms = searchQuery.trim().split(/\s+/);
        
        // Create conditions for each term to match either nome or loja_nome
        if (searchTerms.length > 0) {
          const filters = searchTerms.map(term => 
            `nome.ilike.%${term}%,loja_nome.ilike.%${term}%`
          );
          
          // Apply filters using Supabase's Filter API syntax
          query = query.or(filters.join(','));
        }
      }

      const { data, error } = await query;

      if (error) {
        console.error("Error fetching products:", error);
        throw error;
      }

      return data || [];
    }
  });
};
