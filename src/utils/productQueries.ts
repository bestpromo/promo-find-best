
import { supabase } from "@/integrations/supabase/client";
import type { ProductFilters } from "@/types/product";

export const createBaseQuery = (filters: ProductFilters) => {
  const { searchQuery, brandFilter, storeFilter, priceRange } = filters;
  let query = supabase.from('offer_search').select('*');
  
  // Apply search filter - use more efficient search strategies
  if (searchQuery) {
    const searchTerm = searchQuery.trim().toLowerCase();
    if (searchTerm) {
      // Try exact match first, then prefix match for better performance
      // Avoid double wildcards which are very slow
      query = query.or(`title.ilike.${searchTerm}*,title.ilike.*${searchTerm},brand_name.ilike.${searchTerm}*`);
    }
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
  
  // Apply the same optimized search filters
  if (searchQuery) {
    const searchTerm = searchQuery.trim().toLowerCase();
    if (searchTerm) {
      countQuery = countQuery.or(`title.ilike.${searchTerm}*,title.ilike.*${searchTerm},brand_name.ilike.${searchTerm}*`);
    }
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
  
  // Apply optimized search filter for filters query
  if (searchQuery) {
    const searchTerm = searchQuery.trim().toLowerCase();
    if (searchTerm) {
      filtersQuery = filtersQuery.or(`title.ilike.${searchTerm}*,title.ilike.*${searchTerm},brand_name.ilike.${searchTerm}*`);
    }
  }

  return filtersQuery;
};
