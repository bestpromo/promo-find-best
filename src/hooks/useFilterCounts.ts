
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

interface FilterCountsParams {
  searchQuery: string;
  selectedStores: string[];
  selectedBrands: string[];
  priceRange: { min: number; max: number };
}

export const useFilterCounts = ({
  searchQuery,
  selectedStores,
  selectedBrands,
  priceRange
}: FilterCountsParams) => {
  return useQuery({
    queryKey: ["filter-counts", searchQuery, selectedStores, selectedBrands, priceRange],
    queryFn: async () => {
      try {
        console.log('Getting filter counts for:', { searchQuery, selectedStores, selectedBrands });

        // Base query with search filter
        let baseQuery = supabase.from('offer_search').select('brand_name, store_name, sale_price');
        
        if (searchQuery && searchQuery.trim()) {
          baseQuery = baseQuery.ilike('title', `%${searchQuery.trim()}%`);
        }

        // Apply price range if set
        if (priceRange && (priceRange.min > 0 || priceRange.max < 1000)) {
          baseQuery = baseQuery.gte('sale_price', priceRange.min).lte('sale_price', priceRange.max);
        }

        const { data: baseData } = await baseQuery;

        if (!baseData) {
          return { brandCounts: {}, storeCounts: {} };
        }

        // Calculate brand counts (considering selected stores)
        const brandCounts: Record<string, number> = {};
        const storeFilteredData = selectedStores.length > 0 
          ? baseData.filter(item => selectedStores.includes(item.store_name))
          : baseData;

        storeFilteredData.forEach(item => {
          if (item.brand_name && item.brand_name !== 'Unknown Store') {
            brandCounts[item.brand_name] = (brandCounts[item.brand_name] || 0) + 1;
          }
        });

        // Calculate store counts (considering selected brands)
        const storeCounts: Record<string, number> = {};
        const brandFilteredData = selectedBrands.length > 0
          ? baseData.filter(item => selectedBrands.includes(item.brand_name))
          : baseData;

        brandFilteredData.forEach(item => {
          if (item.store_name && item.store_name.trim() !== '') {
            storeCounts[item.store_name] = (storeCounts[item.store_name] || 0) + 1;
          }
        });

        console.log('Filter counts calculated:', {
          brands: Object.keys(brandCounts).length,
          stores: Object.keys(storeCounts).length
        });

        return { brandCounts, storeCounts };

      } catch (error) {
        console.error('Error calculating filter counts:', error);
        return { brandCounts: {}, storeCounts: {} };
      }
    },
    staleTime: 2 * 60 * 1000,
    enabled: !!searchQuery
  });
};
