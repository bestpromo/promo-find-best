
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Grid2X2, List } from "lucide-react";
import { Label } from "@/components/ui/label";

interface SearchControlsProps {
  onSortChange: (value: string) => void;
  onDisplayModeChange: (mode: 'grid' | 'list') => void;
  displayMode: 'grid' | 'list';
}

export const SearchControls = ({
  onSortChange,
  onDisplayModeChange,
  displayMode
}: SearchControlsProps) => {
  return (
    <div className="flex items-center gap-4 justify-end">
      <div className="flex items-center gap-2">
        <Label className="text-sm font-medium text-gray-700">Ordenar por:</Label>
        <Select onValueChange={onSortChange} defaultValue="name-asc">
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Ordenar por" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="price-desc">Maior Preço</SelectItem>
            <SelectItem value="price-asc">Menor Preço</SelectItem>
            <SelectItem value="name-asc">Nome A-Z</SelectItem>
            <SelectItem value="name-desc">Nome Z-A</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <Button
        variant="outline"
        size="icon"
        onClick={() => onDisplayModeChange(displayMode === 'grid' ? 'list' : 'grid')}
      >
        {displayMode === 'grid' ? <List className="h-4 w-4" /> : <Grid2X2 className="h-4 w-4" />}
      </Button>
    </div>
  );
};
