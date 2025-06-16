
// Define a type for our products view
export type ProductView = {
  offer_id: string;
  title: string;
  url_slug: string;
  deep_link_url: string;
  brand_name: string;
  advertiser_name: string;
  store_name: string;
  image_url: string;
  sale_price: number | null;
  promotional_price: number | null;
  // Adding missing properties for compatibility
  id: string;
  nome: string;
  description: string;
  url: string;
  photo: string;
  price: number | null;
  loja_nome: string;
  category: string;
};

export interface ProductsResponse {
  products: ProductView[];
  totalCount: number;
  hasMore: boolean;
  availableBrands: string[];
  availableStores: string[];
}

export interface ProductFilters {
  searchQuery: string;
  sortBy: string;
  page: number;
  pageSize: number;
  brandFilter?: string[];
  priceRange?: { min: number; max: number };
  storeFilter?: string[];
}
