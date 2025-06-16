
import { ReactNode } from "react";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";

interface FilterSectionProps {
  title: string;
  selectedCount?: number;
  children: ReactNode;
  className?: string;
}

export const FilterSection = ({ 
  title, 
  selectedCount, 
  children, 
  className = "h-80" 
}: FilterSectionProps) => {
  return (
    <div>
      <Label className="text-sm font-medium mb-3 block">
        {title} {selectedCount && selectedCount > 0 && `(${selectedCount} selecionadas)`}
      </Label>
      <ScrollArea className={`${className} w-full rounded-md border p-2`}>
        <div className="space-y-2">
          {children}
        </div>
      </ScrollArea>
    </div>
  );
};
