
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Grid2X2, List } from "lucide-react";

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
    <div className="flex items-center gap-4">
      <Select onValueChange={onSortChange} defaultValue="name-asc">
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Sort by" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="price-desc">Highest Price</SelectItem>
          <SelectItem value="price-asc">Lowest Price</SelectItem>
          <SelectItem value="name-asc">Name A-Z</SelectItem>
          <SelectItem value="name-desc">Name Z-A</SelectItem>
        </SelectContent>
      </Select>
      
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
