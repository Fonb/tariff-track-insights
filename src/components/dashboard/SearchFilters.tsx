
import { BarChart3, Filter, MapPin, Package } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const SearchFilters = () => {
  const [country, setCountry] = useState("");
  const [product, setProduct] = useState("");
  const [sort, setSort] = useState("tariff-high");
  
  const navigate = useNavigate();
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    
    const params = new URLSearchParams();
    if (country) params.append("country", country);
    if (product) params.append("product", product);
    if (sort) params.append("sort", sort);
    
    navigate(`/search?${params.toString()}`);
  };
  
  return (
    <Card className="mb-6 bg-secondary border-border">
      <CardContent className="p-4 md:p-6">
        <form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-4 items-end">
          <div className="flex-1">
            <label htmlFor="country" className="block text-sm font-medium mb-1">Country</label>
            <div className="relative">
              <MapPin className="absolute left-2 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={16} />
              <Input
                id="country"
                className="pl-8"
                placeholder="Enter country name..."
                value={country}
                onChange={(e) => setCountry(e.target.value)}
              />
            </div>
          </div>
          
          <div className="flex-1">
            <label htmlFor="product" className="block text-sm font-medium mb-1">Product</label>
            <div className="relative">
              <Package className="absolute left-2 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={16} />
              <Input
                id="product"
                className="pl-8"
                placeholder="Enter product category..."
                value={product}
                onChange={(e) => setProduct(e.target.value)}
              />
            </div>
          </div>
          
          <div className="w-full md:w-auto">
            <label htmlFor="sort" className="block text-sm font-medium mb-1">Sort By</label>
            <div className="flex items-center gap-2">
              <div className="relative">
                <BarChart3 className="absolute left-2 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={16} />
                <Select value={sort} onValueChange={setSort}>
                  <SelectTrigger className="pl-8 w-[200px]">
                    <SelectValue placeholder="Sort by..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="tariff-high">Highest Tariff</SelectItem>
                    <SelectItem value="tariff-low">Lowest Tariff</SelectItem>
                    <SelectItem value="loss-high">Highest Economic Loss</SelectItem>
                    <SelectItem value="change-high">Biggest Recent Change</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <Button type="submit" className="whitespace-nowrap">
                <Filter size={16} className="mr-2" />
                Apply Filters
              </Button>
            </div>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};
