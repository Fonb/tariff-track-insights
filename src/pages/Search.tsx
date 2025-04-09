
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { SearchFilters } from "@/components/dashboard/SearchFilters";
import { SearchResultsTable } from "@/components/search/SearchResultsTable";
import { DataLastUpdated } from "@/components/dashboard/DataLastUpdated";

// Mock search results
const mockSearchResults = [
  {
    id: "us",
    type: "country" as const,
    name: "United States",
    code: "us",
    flag: "🇺🇸",
    tariffRate: 3.4,
    changePercent: -0.2,
    economicImpact: 82500000000,
  },
  {
    id: "cn",
    type: "country" as const,
    name: "China",
    code: "cn",
    flag: "🇨🇳",
    tariffRate: 7.5,
    changePercent: 1.2,
    economicImpact: 215000000000,
  },
  {
    id: "electronics",
    type: "product" as const,
    name: "Electronics",
    category: "Consumer Goods",
    tariffRate: 5.8,
    changePercent: 0.7,
    economicImpact: 132400000000,
  },
  {
    id: "agricultural",
    type: "product" as const,
    name: "Agricultural Products",
    category: "Food & Beverages",
    tariffRate: 12.3,
    changePercent: 2.1,
    economicImpact: 178900000000,
  },
  {
    id: "automotive",
    type: "product" as const,
    name: "Automotive",
    category: "Transportation",
    tariffRate: 8.4,
    changePercent: -0.5,
    economicImpact: 95300000000,
  },
];

const Search = () => {
  const location = useLocation();
  const [results, setResults] = useState(mockSearchResults);
  const [lastUpdated] = useState("April 9, 2025 09:30 GMT");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const query = params.get("q") || "";
    const country = params.get("country") || "";
    const product = params.get("product") || "";
    const sort = params.get("sort") || "";
    
    // Simulate search filtering based on URL parameters
    let filteredResults = [...mockSearchResults];
    
    if (query) {
      setSearchQuery(query);
      filteredResults = filteredResults.filter(
        result => result.name.toLowerCase().includes(query.toLowerCase())
      );
    }
    
    if (country) {
      filteredResults = filteredResults.filter(
        result => (
          result.type === "country" && 
          result.name.toLowerCase().includes(country.toLowerCase())
        )
      );
    }
    
    if (product) {
      filteredResults = filteredResults.filter(
        result => (
          result.type === "product" && 
          (result.name.toLowerCase().includes(product.toLowerCase()) || 
          (result as any).category?.toLowerCase().includes(product.toLowerCase()))
        )
      );
    }
    
    // Simulate sorting
    if (sort) {
      switch (sort) {
        case "tariff-high":
          filteredResults.sort((a, b) => b.tariffRate - a.tariffRate);
          break;
        case "tariff-low":
          filteredResults.sort((a, b) => a.tariffRate - b.tariffRate);
          break;
        case "loss-high":
          filteredResults.sort((a, b) => b.economicImpact - a.economicImpact);
          break;
        case "change-high":
          filteredResults.sort((a, b) => Math.abs(b.changePercent) - Math.abs(a.changePercent));
          break;
      }
    }
    
    setResults(filteredResults);
  }, [location.search]);

  return (
    <Layout>
      <div className="container py-6">
        <header className="mb-6">
          <h1 className="text-3xl font-bold mb-2">
            {searchQuery ? `Search Results: ${searchQuery}` : "Search Tariff Data"}
          </h1>
          <div className="flex justify-between items-center">
            <DataLastUpdated timestamp={lastUpdated} />
          </div>
        </header>
        
        <div className="mb-6">
          <SearchFilters />
        </div>
        
        {results.length > 0 ? (
          <SearchResultsTable results={results} />
        ) : (
          <div className="text-center py-12 border border-border rounded-lg bg-background">
            <h3 className="text-lg font-medium mb-2">No results found</h3>
            <p className="text-muted-foreground">
              Try adjusting your search or filters to find what you're looking for.
            </p>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Search;
