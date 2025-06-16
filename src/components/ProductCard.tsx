
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";
import { ProductView } from "@/hooks/useProducts";

// Update the Product type to include the url property
interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
  url: string;
}

interface ProductCardProps {
  product: Product | ProductView;
  displayMode: 'grid' | 'list';
}

export const ProductCard = ({ product, displayMode }: ProductCardProps) => {
  const handleBuy = () => {
    const url = 'deep_link_url' in product ? product.deep_link_url : product.url;
    if (url) {
      window.open(url, '_blank', 'noopener,noreferrer');
    }
  };

  // Determine if we're dealing with a mock product or a Supabase product
  const isSupabaseProduct = 'offer_id' in product;
  
  // Extract the correct properties based on product type
  const name = isSupabaseProduct ? product.title || 'Unnamed Product' : product.name;
  const price = isSupabaseProduct ? 
    (product.sale_price || product.promotional_price || 0).toFixed(2) : 
    product.price.toFixed(2);
  const description = isSupabaseProduct ? 
    `Product from ${product.brand_name || 'Unknown'}` : 
    product.description;
  const category = isSupabaseProduct ? 
    product.brand_name || 'Uncategorized' : 
    product.category;
  const imageUrl = isSupabaseProduct ? 
    product.image_url || '/placeholder.svg' : 
    product.image;
  const productUrl = isSupabaseProduct ? 
    product.deep_link_url : 
    product.url;

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
        <h3 className="font-semibold text-lg mb-2 line-clamp-2">{name}</h3>
        <p className="text-orange-500 font-bold mb-2">R$ {price}</p>
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">{description}</p>
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-500">{category}</span>
          <Button 
            onClick={handleBuy} 
            className="bg-green-500 hover:bg-green-600"
            disabled={!productUrl}
          >
            <ExternalLink className="mr-2 h-4 w-4" />
            Comprar
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
