
import { SearchBar } from "@/components/SearchBar";

const HomePage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4">
      <div className="text-center mb-8">
        <img 
          src="/lovable-uploads/5a8f2c7c-9460-4fbf-a4ab-7160fe6749d2.png" 
          alt="Bestpromo Logo" 
          className="w-64 mb-8 mx-auto"
        />
      </div>
      <SearchBar className="w-full max-w-2xl" />
    </div>
  );
};

export default HomePage;
