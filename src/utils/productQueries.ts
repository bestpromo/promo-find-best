
import { supabase } from "@/integrations/supabase/client";
import type { ProductFilters } from "@/types/product";

export const createBaseQuery = (filters: ProductFilters) => {
  const { searchQuery, brandFilter, storeFilter, priceRange } = filters;
  let query = supabase.from('offer_search').select('*');
  
  console.log('Creating base query with filters:', filters);
  
  // Use ilike for case-insensitive pattern matching
  if (searchQuery && searchQuery.trim()) {
    const searchTerm = searchQuery.trim().toLowerCase();
    console.log('Adding search filter for term:', searchTerm);
    
    // Try a simpler approach first - just search in title
    query = query.ilike('title', `%${searchTerm}%`);
  }

  // Apply filters
  if (brandFilter && brandFilter.length > 0) {
    console.log('Adding brand filter:', brandFilter);
    query = query.in('brand_name', brandFilter);
  }

  if (storeFilter && storeFilter.length > 0) {
    console.log('Adding store filter:', storeFilter);
    query = query.in('store_name', storeFilter);
  }

  if (priceRange && (priceRange.min > 0 || priceRange.max < 1000)) {
    console.log('Adding price range filter:', priceRange);
    query = query.gte('sale_price', priceRange.min).lte('sale_price', priceRange.max);
  }

  return query;
};

export const createDataQuery = (filters: ProductFilters) => {
  const { sortBy, page, pageSize } = filters;
  let dataQuery = createBaseQuery(filters);
  
  console.log('Creating data query with sort:', sortBy, 'page:', page, 'pageSize:', pageSize);
  
  // Apply sorting with correct Supabase syntax
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
  console.log('Adding pagination from:', from, 'to:', to);
  dataQuery = dataQuery.range(from, to);

  return dataQuery;
};

// Query to get the real total count
export const createCountQuery = (filters: ProductFilters) => {
  console.log('Creating count query for accurate total');
  const { searchQuery, brandFilter, storeFilter, priceRange } = filters;
  let countQuery = supabase.from('offer_search').select('*', { count: 'exact', head: true });
  
  // Apply the same filters as the base query
  if (searchQuery && searchQuery.trim()) {
    const searchTerm = searchQuery.trim().toLowerCase();
    countQuery = countQuery.ilike('title', `%${searchTerm}%`);
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

// Test query to check if we can get any data at all
export const createTestQuery = () => {
  console.log('Creating test query to check database connectivity');
  return supabase
    .from('offer_search')
    .select('offer_id, title, brand_name, store_name, sale_price')
    .limit(5);
};

// New: Simple query to check table structure and get sample data
export const createDebugQuery = () => {
  console.log('Creating debug query to check table structure');
  return supabase
    .from('offer_search')
    .select('*')
    .limit(3);
};

// Query for getting ALL available filters (not limited)
export const createFiltersQuery = (filters: ProductFilters) => {
  const { searchQuery } = filters;
  
  console.log('Creating filters query for search:', searchQuery);
  
  let baseQuery = supabase.from('offer_search').select('brand_name, store_name');
  
  // Apply search filter if exists AFTER select
  if (searchQuery && searchQuery.trim()) {
    const searchTerm = searchQuery.trim().toLowerCase();
    baseQuery = baseQuery.ilike('title', `%${searchTerm}%`);
  }
  
  return baseQuery;
};
