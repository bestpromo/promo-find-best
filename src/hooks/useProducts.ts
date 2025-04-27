
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
        const conditions = searchTerms.map(term => `
          (nome ILIKE '%${term}%' OR loja_nome ILIKE '%${term}%')
        `).join(' AND ');
        
        query = query.or(conditions);
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
