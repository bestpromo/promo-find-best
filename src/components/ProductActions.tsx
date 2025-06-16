
import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";

interface ProductActionsProps {
  onBuy: () => void;
  productUrl?: string;
}

export const ProductActions = ({ onBuy, productUrl }: ProductActionsProps) => {
  return (
    <Button 
      onClick={onBuy} 
      className="bg-green-500 hover:bg-green-600 w-full mb-2"
      disabled={!productUrl}
    >
      <ExternalLink className="mr-2 h-4 w-4" />
      Comprar
    </Button>
  );
};
