
import { supabase } from "@/integrations/supabase/client";
import type { ProductFilters } from "@/types/product";

export const createBaseQuery = (filters: ProductFilters) => {
  const { searchQuery, brandFilter, storeFilter, priceRange } = filters;
  let query = supabase.from('offer_search').select('*');
  
  // Use simple exact match for search terms to avoid timeouts
  if (searchQuery && searchQuery.trim()) {
    const searchTerm = searchQuery.trim().toLowerCase();
    // Try exact match first, then simple contains without wildcards
    query = query.or(`title.ilike.%${searchTerm}%,brand_name.eq.${searchTerm}`);
  }

  // Apply filters
  if (brandFilter && brandFilter.length > 0) {
    query = query.in('brand_name', brandFilter);
  }

  if (storeFilter && storeFilter.length > 0) {
    query = query.in('store_name', storeFilter);
  }

  if (priceRange && (priceRange.min > 0 || priceRange.max < 1000)) {
    query = query.gte('sale_price', priceRange.min).lte('sale_price', priceRange.max);
  }

  return query;
};

export const createDataQuery = (filters: ProductFilters) => {
  const { sortBy, page, pageSize } = filters;
  let dataQuery = createBaseQuery(filters);
  
  // Apply sorting
  switch (sortBy) {
    case 'price-desc':
      dataQuery = dataQuery.order('sale_price', { ascending: false });
      break;
    case 'price-asc':
      dataQuery = dataQuery.order('sale_price', { ascending: true });
      break;
    case 'nome-desc':
      dataQuery = dataQuery.order('title', { ascending: false });
      break;
    case 'nome-asc':
    default:
      dataQuery = dataQuery.order('title', { ascending: true });
      break;
  }

  // Apply pagination
  const from = (page - 1) * pageSize;
  const to = from + pageSize - 1;
  dataQuery = dataQuery.range(from, to);

  return dataQuery;
};

// Simplified query for getting available filters
export const createFiltersQuery = (filters: ProductFilters) => {
  const { searchQuery } = filters;
  
  // If no search query, get all brands and stores (limited)
  if (!searchQuery || !searchQuery.trim()) {
    return supabase
      .from('offer_search')
      .select('brand_name, store_name')
      .limit(1000); // Limit to avoid timeout
  }
  
  const searchTerm = searchQuery.trim().toLowerCase();
  return supabase
    .from('offer_search')
    .select('brand_name, store_name')
    .or(`title.ilike.%${searchTerm}%,brand_name.eq.${searchTerm}`)
    .limit(500); // Smaller limit for search results
};
