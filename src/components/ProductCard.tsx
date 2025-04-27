
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import type { Product } from "@/data/mockProducts";

interface ProductCardProps {
  product: Product;
}

export const ProductCard = ({ product }: ProductCardProps) => {
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <CardHeader className="p-0">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-48 object-cover"
        />
      </CardHeader>
      <CardContent className="p-4">
        <h3 className="font-semibold text-lg mb-2">{product.name}</h3>
        <p className="text-orange-500 font-bold mb-2">${product.price.toFixed(2)}</p>
        <p className="text-gray-600 text-sm mb-2">{product.description}</p>
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-500">{product.category}</span>
          <span className="text-sm text-gray-500">★ {product.rating}</span>
        </div>
      </CardContent>
    </Card>
  );
};
