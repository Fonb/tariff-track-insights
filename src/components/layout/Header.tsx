
import { Search } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ThemeToggle } from "@/components/theme/ThemeToggle";

export const Header = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <header className="border-b border-border sticky top-0 z-10 bg-background">
      <div className="container py-4 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center">
          <Link to="/" className="flex items-center">
            <span className="text-2xl font-bold">
              Tariff<span className="text-primary dark:text-white">Track</span>
            </span>
          </Link>
          <div className="hidden md:flex ml-8 space-x-4">
            <Link to="/" className="text-sm font-medium text-foreground hover:text-primary hover:underline transition-colors">
              Dashboard
            </Link>
            <Link to="/countries" className="text-sm font-medium text-foreground hover:text-primary hover:underline transition-colors">
              Countries
            </Link>
            <Link to="/products" className="text-sm font-medium text-foreground hover:text-primary hover:underline transition-colors">
              Products
            </Link>
          </div>
        </div>

        <div className="w-full md:w-auto flex items-center gap-2">
          <form onSubmit={handleSearch} className="flex-1 mr-2 relative">
            <Input
              type="text"
              placeholder="Search country or product..."
              className="pr-8 bg-background text-foreground border-input"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button 
              type="submit" 
              className="absolute right-2 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
            >
              <Search size={18} />
            </button>
          </form>
          <ThemeToggle />
          <Button variant="outline" size="sm" className="whitespace-nowrap">
            Sign In
          </Button>
        </div>
      </div>
    </header>
  );
};
