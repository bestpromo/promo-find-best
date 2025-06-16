import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink, Share2 } from "lucide-react";
import { Check } from "lucide-react";
import { ProductView } from "@/hooks/useProducts";
import { useNavigate } from "react-router-dom";
import { useRef, useState } from "react";
import { ShareModal } from "./ShareModal";

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
  const navigate = useNavigate();
  const clickedRef = useRef<boolean>(false);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);

  const handleBuy = () => {
    // Prevenir múltiplos cliques
    if (clickedRef.current) {
      console.log('Clique já processado para este produto');
      return;
    }

    clickedRef.current = true;

    // Determine if we're dealing with a mock product or a Supabase product
    const isSupabaseProduct = 'offer_id' in product;
    
    if (isSupabaseProduct) {
      console.log('Processando clique para produto Supabase:', product.offer_id);
      
      // Abrir a página de redirecionamento em uma nova aba
      const params = new URLSearchParams({
        offer_id: product.offer_id,
        deep_link_url: product.deep_link_url || '',
        title: product.title || '',
        store_name: product.store_name || '',
        price: (product.sale_price || product.promotional_price || 0).toString()
      });
      
      const redirectUrl = `/redirecting?${params.toString()}`;
      window.open(redirectUrl, '_blank', 'noopener,noreferrer');
    } else {
      // Para produtos mock, manter comportamento original
      const url = product.url;
      if (url) {
        window.open(url, '_blank', 'noopener,noreferrer');
      }
    }

    // Reset após um tempo para permitir novos cliques se necessário
    setTimeout(() => {
      clickedRef.current = false;
    }, 2000);
  };

  const handleBrandClick = () => {
    const brandName = isSupabaseProduct ? product.brand_name : product.category;
    if (brandName && brandName !== 'Unknown Store' && brandName !== 'Uncategorized') {
      navigate(`/search?q=${encodeURIComponent(brandName)}`);
    }
  };

  const handleShareClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsShareModalOpen(true);
  };

  // Determine if we're dealing with a mock product or a Supabase product
  const isSupabaseProduct = 'offer_id' in product;
  
  // Extract the correct properties based on product type
  const name = isSupabaseProduct ? product.title || 'Unnamed Product' : product.name;
  const originalPrice = isSupabaseProduct ? product.price : product.price;
  const promotionalPrice = isSupabaseProduct ? (product.sale_price || product.promotional_price) : null;
  const category = isSupabaseProduct ? 
    product.brand_name || 'Uncategorized' : 
    product.category;
  const imageUrl = isSupabaseProduct ? 
    product.image_url || '/placeholder.svg' : 
    product.image;
  const productUrl = isSupabaseProduct ? 
    product.deep_link_url : 
    product.url;

  // Get store name - for Supabase products, use store_name as the actual store name
  const storeName = isSupabaseProduct ? 
    (product.store_name || 'Loja Desconhecida') : 
    'Loja Online';

  // Create share URL - for now using the current page URL as fallback
  const shareUrl = productUrl || window.location.href;

  // Helper function to format price with different font sizes for cents
  const formatPriceWithCents = (price: number) => {
    const priceStr = price.toFixed(2);
    const [reais, centavos] = priceStr.split('.');
    
    return (
      <span>
        R$ {reais}
        <span style={{ fontSize: '16px' }}>,{centavos}</span>
      </span>
    );
  };

  // Price rendering logic based on business rules
  const renderPrice = () => {
    if (promotionalPrice && promotionalPrice !== originalPrice) {
      // Rule 1: When we have promotional_price, show both prices
      return (
        <div className="mb-2">
          <p className="text-gray-500 line-through" style={{ fontSize: '12px', fontWeight: 'normal' }}>
            R$ {originalPrice?.toFixed(2)}
          </p>
          <p className="text-orange-500 font-bold" style={{ fontSize: '28px' }}>
            {formatPriceWithCents(promotionalPrice)}
          </p>
        </div>
      );
    } else {
      // Rule 2: When we only have price, show it as promotional_price style
      const displayPrice = promotionalPrice || originalPrice || 0;
      return (
        <p className="text-orange-500 font-bold mb-2" style={{ fontSize: '28px' }}>
          {formatPriceWithCents(displayPrice)}
        </p>
      );
    }
  };

  return (
    <>
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
        <CardContent className={`p-4 ${displayMode === 'list' ? 'flex-1' : ''} flex flex-col`}>
          <h3 className="font-semibold mb-2 line-clamp-2 flex-grow" style={{ fontSize: '16px' }}>{name}</h3>
          {renderPrice()}
          
          <div className="flex items-center justify-between mb-4">
            <button 
              onClick={handleBrandClick}
              className="text-sm text-gray-500 hover:text-blue-600 hover:underline cursor-pointer"
            >
              {category}
            </button>
            <Button
              onClick={handleShareClick}
              variant="ghost"
              size="sm"
              className="h-8 w-8 p-0 hover:bg-gray-100"
            >
              <Share2 className="h-4 w-4 text-gray-500" />
            </Button>
          </div>
          
          <Button 
            onClick={handleBuy} 
            className="bg-green-500 hover:bg-green-600 w-full mb-2"
            disabled={!productUrl}
          >
            <ExternalLink className="mr-2 h-4 w-4" />
            Comprar
          </Button>
          <div className="flex items-center justify-center gap-1">
            <span className="text-xs font-bold text-gray-600">
              Parceiro: {storeName}
            </span>
            <Check className="h-3 w-3 text-green-500" />
          </div>
        </CardContent>
      </Card>

      <ShareModal
        isOpen={isShareModalOpen}
        onClose={() => setIsShareModalOpen(false)}
        productName={name}
        shareUrl={shareUrl}
        product={product}
      />
    </>
  );
};

export default ProductCard;
