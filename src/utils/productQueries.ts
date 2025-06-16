
import { supabase } from "@/integrations/supabase/client";
import type { ProductFilters } from "@/types/product";

export const createBaseQuery = (filters: ProductFilters) => {
  const { searchQuery, brandFilter, storeFilter, priceRange } = filters;
  let query = supabase.from('offer_search').select('*');
  
  // Apply search filter
  if (searchQuery) {
    const searchTerms = searchQuery.trim().split(/\s+/);
    if (searchTerms.length > 0) {
      // Use individual ilike conditions combined with or
      const searchConditions = searchTerms.map(term => `title.ilike.%${term}%`).join(',');
      query = query.or(searchConditions);
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
  
  // Apply the same filters to count query
  if (searchQuery) {
    const searchTerms = searchQuery.trim().split(/\s+/);
    if (searchTerms.length > 0) {
      const searchConditions = searchTerms.map(term => `title.ilike.%${term}%`).join(',');
      countQuery = countQuery.or(searchConditions);
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
  
  // Only apply search filter to filters query, not brand/store/price filters
  // This ensures we show all available options for the current search
  if (searchQuery) {
    const searchTerms = searchQuery.trim().split(/\s+/);
    if (searchTerms.length > 0) {
      const searchConditions = searchTerms.map(term => `title.ilike.%${term}%`).join(',');
      filtersQuery = filtersQuery.or(searchConditions);
    }
  }

  return filtersQuery;
};
