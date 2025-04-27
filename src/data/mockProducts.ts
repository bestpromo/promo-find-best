
export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  category: string;
  image: string;
}

// Helper function to generate mock products
const generateMockProducts = (count: number): Product[] => {
  const products: Product[] = [];
  for (let i = 1; i <= count; i++) {
    products.push({
      id: `${i}`,
      name: `Product ${i}`,
      price: Math.round(Math.random() * 1000 * 100) / 100,
      description: `Description for product ${i}. This is a great product with amazing features.`,
      category: i % 2 === 0 ? "Electronics" : "Accessories",
      image: `https://images.unsplash.com/photo-${1505740420928 + i}-5e560c06d30e?w=500`
    });
  }
  return products;
};

export const mockProducts = generateMockProducts(50);
