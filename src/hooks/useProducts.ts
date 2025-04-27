
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
        query = query.textSearch('search_text', searchQuery.trim());
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
