
import { CircleCheck } from "lucide-react";

interface ProductPartnerInfoProps {
  storeName: string;
}

export const ProductPartnerInfo = ({ storeName }: ProductPartnerInfoProps) => {
  return (
    <div className="flex items-center justify-center gap-1 mt-2">
      <span className="text-xs font-bold text-gray-600">
        Parceiro: {storeName}
      </span>
      <CircleCheck className="h-3 w-3 text-green-500 fill-green-500" />
    </div>
  );
};
