
import { Button } from "@/components/ui/button";
import { Share2 } from "lucide-react";

interface ProductBrandInfoProps {
  category: string;
  onBrandClick: () => void;
  onShareClick: (e: React.MouseEvent) => void;
}

export const ProductBrandInfo = ({ 
  category, 
  onBrandClick, 
  onShareClick 
}: ProductBrandInfoProps) => {
  return (
    <div className="flex items-center justify-between mb-4">
      <button 
        onClick={onBrandClick}
        className="text-sm text-gray-500 hover:text-blue-600 hover:underline cursor-pointer"
      >
        {category}
      </button>
      <Button
        onClick={onShareClick}
        variant="ghost"
        size="sm"
        className="h-8 w-8 p-0 hover:bg-gray-100"
      >
        <Share2 className="h-4 w-4 text-gray-500" />
      </Button>
    </div>
  );
};
