
import { Search, User } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

interface SearchBarProps {
  initialValue?: string;
  className?: string;
}

export const SearchBar = ({ initialValue = "", className = "" }: SearchBarProps) => {
  const [searchQuery, setSearchQuery] = useState(initialValue);
  const navigate = useNavigate();

  const handleSearch = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <form onSubmit={handleSearch} className={`max-w-2xl w-full flex items-center gap-4 ${className}`}>
      <div className="relative flex-grow">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Buscar as melhores promoções e produtos"
          className="w-full px-4 py-3 rounded-full border border-gray-300 focus:outline-none focus:border-orange-500 pl-12"
        />
        <button 
          type="button"
          onClick={() => handleSearch()}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-orange-500 transition-colors cursor-pointer"
        >
          <Search size={20} />
        </button>
      </div>
    </form>
  );
};
