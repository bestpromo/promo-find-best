
import { supabase } from "@/integrations/supabase/client";
import type { ProductFilters } from "@/types/product";

export const createBaseQuery = (filters: ProductFilters) => {
  const { searchQuery, brandFilter, storeFilter, priceRange } = filters;
  let query = supabase.from('offer_search').select('*');
  
  console.log('Creating base query with filters:', filters);
  
  // Use simple exact match for search terms to avoid timeouts
  if (searchQuery && searchQuery.trim()) {
    const searchTerm = searchQuery.trim().toLowerCase();
    console.log('Adding search filter for term:', searchTerm);
    
    // Simple like search on title only to avoid timeout
    query = query.like('title', `%${searchTerm}%`);
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
  let countQuery = createBaseQuery(filters);
  
  // Use count with proper syntax for accurate counting
  return countQuery.select('*', { count: 'exact' });
};

// Test query to check if we can get any data at all
export const createTestQuery = () => {
  console.log('Creating test query to check database connectivity');
  return supabase
    .from('offer_search')
    .select('offer_id, title, brand_name, store_name, sale_price')
    .limit(5);
};

// Query for getting ALL available filters (not limited)
export const createFiltersQuery = (filters: ProductFilters) => {
  const { searchQuery } = filters;
  
  console.log('Creating filters query for search:', searchQuery);
  
  let baseQuery = supabase.from('offer_search');
  
  // Apply search filter if exists
  if (searchQuery && searchQuery.trim()) {
    const searchTerm = searchQuery.trim().toLowerCase();
    baseQuery = baseQuery.like('title', `%${searchTerm}%`);
  }
  
  // Select only brand and store names without limit to get all available options
  return baseQuery.select('brand_name, store_name');
};
