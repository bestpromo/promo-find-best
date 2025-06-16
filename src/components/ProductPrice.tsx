
interface ProductPriceProps {
  originalPrice?: number | null;
  promotionalPrice?: number | null;
}

export const ProductPrice = ({ originalPrice, promotionalPrice }: ProductPriceProps) => {
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
