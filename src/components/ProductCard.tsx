
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";
import type { Product } from "@/data/mockProducts";
import { Database } from "@/integrations/supabase/types";

// Define a type for Supabase products
export type SupabaseProduct = Database['public']['Tables']['products']['Row'];

interface ProductCardProps {
  product: Product | SupabaseProduct;
  displayMode: 'grid' | 'list';
}

export const ProductCard = ({ product, displayMode }: ProductCardProps) => {
  const handleBuy = () => {
    console.log('Buy clicked for product:', product.id);
  };

  // Determine if we're dealing with a mock product or a Supabase product
  const isSupabaseProduct = 'nome' in product;
  
  // Extract the correct properties based on product type
  const name = isSupabaseProduct ? product.nome || 'Unnamed Product' : product.name;
  const price = isSupabaseProduct ? product.price || '0.00' : product.price.toFixed(2);
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
        <p className="text-orange-500 font-bold mb-2">${typeof price === 'number' ? price.toFixed(2) : price}</p>
        <p className="text-gray-600 text-sm mb-4">{description}</p>
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-500">{category}</span>
          <Button onClick={handleBuy} className="bg-green-500 hover:bg-green-600">
            <ShoppingCart className="mr-2 h-4 w-4" />
            Buy
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
