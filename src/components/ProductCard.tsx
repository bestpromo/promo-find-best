
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";
import type { Product } from "@/data/mockProducts";

interface ProductCardProps {
  product: Product;
  displayMode: 'grid' | 'list';
}

export const ProductCard = ({ product, displayMode }: ProductCardProps) => {
  const handleBuy = () => {
    console.log('Buy clicked for product:', product.id);
  };

  return (
    <Card className={`overflow-hidden hover:shadow-lg transition-shadow duration-300 ${
      displayMode === 'list' ? 'flex' : ''
    }`}>
      <CardHeader className={`p-0 ${displayMode === 'list' ? 'w-48 shrink-0' : ''}`}>
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-48 object-cover"
        />
      </CardHeader>
      <CardContent className={`p-4 ${displayMode === 'list' ? 'flex-1' : ''}`}>
        <h3 className="font-semibold text-lg mb-2">{product.name}</h3>
        <p className="text-orange-500 font-bold mb-2">${product.price.toFixed(2)}</p>
        <p className="text-gray-600 text-sm mb-4">{product.description}</p>
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-500">{product.category}</span>
          <Button onClick={handleBuy} className="bg-green-500 hover:bg-green-600">
            <ShoppingCart className="mr-2 h-4 w-4" />
            Buy
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
