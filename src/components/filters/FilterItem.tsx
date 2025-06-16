
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

interface FilterItemProps {
  id: string;
  label: string;
  isSelected: boolean;
  productCount: number | string;
  onToggle: () => void;
  selectedIndex?: number;
  color?: 'blue' | 'green';
}

export const FilterItem = ({ 
  id, 
  label, 
  isSelected, 
  productCount, 
  onToggle, 
  selectedIndex,
  color = 'blue'
}: FilterItemProps) => {
  const colorClasses = {
    blue: {
      background: 'bg-blue-50 border border-blue-200',
      text: 'font-medium text-blue-700',
      badge: 'bg-blue-500'
    },
    green: {
      background: 'bg-green-50 border border-green-200', 
      text: 'font-medium text-green-700',
      badge: 'bg-green-500'
    }
  };

  return (
    <div 
      className={`flex items-center space-x-2 p-2 rounded-md transition-colors ${
        isSelected ? colorClasses[color].background : 'hover:bg-gray-50'
      }`}
    >
      <Checkbox
        id={id}
        checked={isSelected}
        onCheckedChange={onToggle}
      />
      <div className="flex items-center justify-between w-full">
        <Label 
          htmlFor={id} 
          className={`text-sm cursor-pointer ${
            isSelected ? colorClasses[color].text : ''
          }`}
        >
          {label}
        </Label>
        <div className="flex items-center gap-2">
          <span className="text-xs text-gray-500">
            ({productCount})
          </span>
          {isSelected && selectedIndex !== undefined && (
            <span className={`text-xs ${colorClasses[color].badge} text-white px-2 py-1 rounded-full`}>
              {selectedIndex + 1}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};
