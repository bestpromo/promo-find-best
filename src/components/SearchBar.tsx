
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

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
  };

  return (
    <form onSubmit={handleSearch} className={`max-w-2xl w-full flex items-center gap-4 ${className}`}>
      <div className="relative flex-grow">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search for the best promotions..."
          className="w-full px-4 py-3 rounded-full border border-gray-300 focus:outline-none focus:border-orange-500 pl-12"
        />
        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
      </div>
      <button 
        type="button" 
        className="text-gray-600 hover:text-orange-500 transition-colors"
        onClick={() => console.log('Login functionality will be implemented later')}
      >
        <User size={24} />
      </button>
    </form>
  );
};

