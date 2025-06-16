
import { supabase } from "@/integrations/supabase/client";
import type { ProductFilters } from "@/types/product";

export const createBaseQuery = (filters: ProductFilters) => {
  const { searchQuery, brandFilter, storeFilter, priceRange } = filters;
  let query = supabase.from('offer_search').select('*');
  
  // Simplified search - only use exact matches to avoid timeouts
  if (searchQuery && searchQuery.trim()) {
    const searchTerm = searchQuery.trim().toLowerCase();
    // Use simple exact match first, then simple contains
    query = query.or(`title.ilike.*${searchTerm}*,brand_name.ilike.*${searchTerm}*`);
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

export const createCountQuery = (filters: ProductFilters) => {
  const { searchQuery, brandFilter, storeFilter, priceRange } = filters;
  let countQuery = supabase.from('offer_search').select('*', { count: 'exact', head: true });
  
  // Apply the same simplified search
  if (searchQuery && searchQuery.trim()) {
    const searchTerm = searchQuery.trim().toLowerCase();
    countQuery = countQuery.or(`title.ilike.*${searchTerm}*,brand_name.ilike.*${searchTerm}*`);
  }

  if (brandFilter && brandFilter.length > 0) {
    countQuery = countQuery.in('brand_name', brandFilter);
  }

  if (storeFilter && storeFilter.length > 0) {
    countQuery = countQuery.in('store_name', storeFilter);
  }

  if (priceRange && (priceRange.min > 0 || priceRange.max < 1000)) {
    countQuery = countQuery.gte('sale_price', priceRange.min).lte('sale_price', priceRange.max);
  }

  return countQuery;
};

export const createFiltersQuery = (filters: ProductFilters) => {
  const { searchQuery } = filters;
  let filtersQuery = supabase.from('offer_search').select('brand_name, store_name');
  
  // Apply simplified search for filters
  if (searchQuery && searchQuery.trim()) {
    const searchTerm = searchQuery.trim().toLowerCase();
    filtersQuery = filtersQuery.or(`title.ilike.*${searchTerm}*,brand_name.ilike.*${searchTerm}*`);
  }

  return filtersQuery;
};
