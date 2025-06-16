
import type { ProductView } from "@/types/product";

export const transformProductData = (item: any): ProductView => ({
  offer_id: item.offer_id || Math.random().toString(),
  title: item.title || 'Unnamed Product',
  url_slug: item.url_slug || '',
  deep_link_url: item.deep_link_url || '',
  brand_name: item.brand_name || 'Unknown Store',
  advertiser_name: item.advertiser_name || '',
  store_name: item.store_name || '',
  image_url: item.image_url || '/placeholder.svg',
  sale_price: parseFloat(item.sale_price) || null,
  promotional_price: parseFloat(item.promotional_price) || null,
  // Compatibility properties
  id: item.offer_id || Math.random().toString(),
  nome: item.title || 'Unnamed Product',
  description: `Product from ${item.brand_name || 'Unknown'}`,
  url: item.deep_link_url || '',
  photo: item.image_url || '/placeholder.svg',
  price: parseFloat(item.sale_price) || null,
  loja_nome: item.store_name || item.brand_name || 'Unknown Store',
  category: item.brand_name || 'Uncategorized'
});

export const extractUniqueFilters = (filtersData: any[] | null) => {
  if (!filtersData) {
    return { availableBrands: [], availableStores: [] };
  }

  const availableBrands = [...new Set(filtersData.map(product => product.brand_name))]
    .filter(brand => brand && brand !== 'Unknown Store')
    .sort();

  const availableStores = [...new Set(filtersData.map(product => product.store_name))]
    .filter(store => store && store.trim() !== '')
    .sort();

  return { availableBrands, availableStores };
};
