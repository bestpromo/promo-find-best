import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ShoppingCart, ExternalLink } from "lucide-react";
import { ProductView } from "@/hooks/useProducts";

// Update the Product type to include the url property
interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
  url: string; // Add url property
}

interface ProductCardProps {
  product: Product | ProductView;
  displayMode: 'grid' | 'list';
}

export const ProductCard = ({ product, displayMode }: ProductCardProps) => {
  const handleBuy = () => {
    if (product.url) {
      window.open(product.url, '_blank', 'noopener,noreferrer');
    }
  };

  // Determine if we're dealing with a mock product or a Supabase product
  const isSupabaseProduct = 'nome' in product;
  
  // Extract the correct properties based on product type
  const name = isSupabaseProduct ? product.nome || 'Unnamed Product' : product.name;
  const price = isSupabaseProduct ? product.price?.toFixed(2) || '0.00' : product.price.toFixed(2);
  const description = isSupabaseProduct ? `Product from ${product.loja_nome || 'Unknown'}` : product.description;
  const category = isSupabaseProduct ? product.loja_nome || 'Uncategorized' : product.category;
  const imageUrl = isSupabaseProduct ? product.photo || '/placeholder.svg' : product.image;

  return (
    <Card className={`overflow-hidden hover:shadow-lg transition-shadow duration-300 ${
      displayMode === 'list' ? 'flex' : ''
    }`}>
      <CardHeader className={`p-0 ${displayMode === 'list' ? 'w-48 shrink-0' : ''}`}>
        <img
          src={imageUrl}
          alt={name}
          className="w-full h-48 object-cover"
          onError={(e) => {
            e.currentTarget.src = '/placeholder.svg';
          }}
        />
      </CardHeader>
      <CardContent className={`p-4 ${displayMode === 'list' ? 'flex-1' : ''}`}>
        <h3 className="font-semibold text-lg mb-2">{name}</h3>
        <p className="text-orange-500 font-bold mb-2">${price}</p>
        <p className="text-gray-600 text-sm mb-4">{description}</p>
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-500">{category}</span>
          <Button 
            onClick={handleBuy} 
            className="bg-green-500 hover:bg-green-600"
            disabled={!product.url}
          >
            <ExternalLink className="mr-2 h-4 w-4" />
            Buy
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
