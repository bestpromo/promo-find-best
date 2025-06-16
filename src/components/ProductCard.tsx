import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { ProductView } from "@/hooks/useProducts";
import { useNavigate } from "react-router-dom";
import { useRef, useState } from "react";
import { ShareModal } from "./ShareModal";
import { ProductImage } from "./ProductImage";
import { ProductPrice } from "./ProductPrice";
import { ProductBrandInfo } from "./ProductBrandInfo";
import { ProductActions } from "./ProductActions";
import { ProductPartnerInfo } from "./ProductPartnerInfo";

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

  return (
    <>
      <Card className={`overflow-hidden hover:shadow-lg transition-shadow duration-300 ${
        displayMode === 'list' ? 'flex' : ''
      }`}>
        <CardHeader className={`p-0 ${displayMode === 'list' ? 'w-48 shrink-0' : ''}`}>
          <ProductImage 
            imageUrl={imageUrl}
            name={name}
            displayMode={displayMode}
          />
        </CardHeader>
        <CardContent className={`p-4 ${displayMode === 'list' ? 'flex-1' : ''} flex flex-col`}>
          <h3 className="font-semibold mb-2 line-clamp-2 flex-grow" style={{ fontSize: '16px' }}>
            {name}
          </h3>
          
          <ProductPrice 
            originalPrice={originalPrice}
            promotionalPrice={promotionalPrice}
          />
          
          <ProductBrandInfo
            category={category}
            onBrandClick={handleBrandClick}
            onShareClick={handleShareClick}
          />
          
          <ProductActions
            onBuy={handleBuy}
            productUrl={productUrl}
          />
          
          <ProductPartnerInfo storeName={storeName} />
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
