
import { SearchBar } from "@/components/SearchBar";
import { Link } from "react-router-dom";

interface SearchPageHeaderProps {
  query: string;
  isMobile: boolean;
}

export const SearchPageHeader = ({ query, isMobile }: SearchPageHeaderProps) => {
  return (
    <header className={`border-b bg-white z-50 ${isMobile ? 'fixed top-0 left-0 right-0' : ''}`}>
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center gap-8">
          <Link to="/">
            <img 
              src="/lovable-uploads/5a8f2c7c-9460-4fbf-a4ab-7160fe6749d2.png" 
              alt="Bestpromo Logo" 
              className="h-8"
            />
          </Link>
          <SearchBar initialValue={query} className="flex-1" />
        </div>
      </div>
    </header>
  );
};
