
export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  category: string;
  rating: number;
  image: string;
}

export const mockProducts: Product[] = [
  {
    id: "1",
    name: "Wireless Headphones",
    price: 99.99,
    description: "Premium noise-canceling wireless headphones",
    category: "Electronics",
    rating: 4.5,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500"
  },
  {
    id: "2",
    name: "Smart Watch",
    price: 199.99,
    description: "Latest generation smartwatch with health tracking",
    category: "Electronics",
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500"
  },
  {
    id: "3",
    name: "Laptop Backpack",
    price: 49.99,
    description: "Water-resistant laptop backpack with USB charging port",
    category: "Accessories",
    rating: 4.2,
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500"
  },
];
