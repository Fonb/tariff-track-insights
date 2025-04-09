
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { SearchFilters } from "@/components/dashboard/SearchFilters";
import { SearchResultsTable } from "@/components/search/SearchResultsTable";
import { DataLastUpdated } from "@/components/dashboard/DataLastUpdated";

// Mock search results with EU countries added
const mockSearchResults = [
  // Original mock data
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
  // European Union Countries
  {
    id: "at",
    type: "country" as const,
    name: "Austria",
    code: "at",
    flag: "🇦🇹",
    tariffRate: 2.8,
    changePercent: -0.3,
    economicImpact: 45600000000,
  },
  {
    id: "be",
    type: "country" as const,
    name: "Belgium",
    code: "be",
    flag: "🇧🇪",
    tariffRate: 2.5,
    changePercent: -0.1,
    economicImpact: 52400000000,
  },
  {
    id: "bg",
    type: "country" as const,
    name: "Bulgaria",
    code: "bg",
    flag: "🇧🇬",
    tariffRate: 3.2,
    changePercent: 0.4,
    economicImpact: 9800000000,
  },
  {
    id: "hr",
    type: "country" as const,
    name: "Croatia",
    code: "hr",
    flag: "🇭🇷",
    tariffRate: 3.0,
    changePercent: 0.2,
    economicImpact: 8700000000,
  },
  {
    id: "cy",
    type: "country" as const,
    name: "Cyprus",
    code: "cy",
    flag: "🇨🇾",
    tariffRate: 2.3,
    changePercent: -0.5,
    economicImpact: 2900000000,
  },
  {
    id: "cz",
    type: "country" as const,
    name: "Czech Republic",
    code: "cz",
    flag: "🇨🇿",
    tariffRate: 2.7,
    changePercent: -0.2,
    economicImpact: 24800000000,
  },
  {
    id: "dk",
    type: "country" as const,
    name: "Denmark",
    code: "dk",
    flag: "🇩🇰",
    tariffRate: 1.9,
    changePercent: -0.4,
    economicImpact: 38500000000,
  },
  {
    id: "ee",
    type: "country" as const,
    name: "Estonia",
    code: "ee",
    flag: "🇪🇪",
    tariffRate: 2.1,
    changePercent: -0.3,
    economicImpact: 3800000000,
  },
  {
    id: "fi",
    type: "country" as const,
    name: "Finland",
    code: "fi",
    flag: "🇫🇮",
    tariffRate: 2.2,
    changePercent: -0.1,
    economicImpact: 29700000000,
  },
  {
    id: "fr",
    type: "country" as const,
    name: "France",
    code: "fr",
    flag: "🇫🇷",
    tariffRate: 2.6,
    changePercent: 0.1,
    economicImpact: 298000000000,
  },
  {
    id: "de",
    type: "country" as const,
    name: "Germany",
    code: "de",
    flag: "🇩🇪",
    tariffRate: 2.4,
    changePercent: -0.2,
    economicImpact: 425000000000,
  },
  {
    id: "gr",
    type: "country" as const,
    name: "Greece",
    code: "gr",
    flag: "🇬🇷",
    tariffRate: 3.1,
    changePercent: 0.3,
    economicImpact: 23500000000,
  },
  {
    id: "hu",
    type: "country" as const,
    name: "Hungary",
    code: "hu",
    flag: "🇭🇺",
    tariffRate: 3.0,
    changePercent: 0.2,
    economicImpact: 16800000000,
  },
  {
    id: "ie",
    type: "country" as const,
    name: "Ireland",
    code: "ie",
    flag: "🇮🇪",
    tariffRate: 2.0,
    changePercent: -0.3,
    economicImpact: 42300000000,
  },
  {
    id: "it",
    type: "country" as const,
    name: "Italy",
    code: "it",
    flag: "🇮🇹",
    tariffRate: 2.8,
    changePercent: 0.1,
    economicImpact: 215000000000,
  },
  {
    id: "lv",
    type: "country" as const,
    name: "Latvia",
    code: "lv",
    flag: "🇱🇻",
    tariffRate: 2.3,
    changePercent: -0.2,
    economicImpact: 4200000000,
  },
  {
    id: "lt",
    type: "country" as const,
    name: "Lithuania",
    code: "lt",
    flag: "🇱🇹",
    tariffRate: 2.4,
    changePercent: -0.1,
    economicImpact: 5600000000,
  },
  {
    id: "lu",
    type: "country" as const,
    name: "Luxembourg",
    code: "lu",
    flag: "🇱🇺",
    tariffRate: 1.8,
    changePercent: -0.4,
    economicImpact: 7200000000,
  },
  {
    id: "mt",
    type: "country" as const,
    name: "Malta",
    code: "mt",
    flag: "🇲🇹",
    tariffRate: 2.0,
    changePercent: -0.3,
    economicImpact: 1500000000,
  },
  {
    id: "nl",
    type: "country" as const,
    name: "Netherlands",
    code: "nl",
    flag: "🇳🇱",
    tariffRate: 2.1,
    changePercent: -0.2,
    economicImpact: 96700000000,
  },
  {
    id: "pl",
    type: "country" as const,
    name: "Poland",
    code: "pl",
    flag: "🇵🇱",
    tariffRate: 2.9,
    changePercent: 0.1,
    economicImpact: 65800000000,
  },
  {
    id: "pt",
    type: "country" as const,
    name: "Portugal",
    code: "pt",
    flag: "🇵🇹",
    tariffRate: 2.7,
    changePercent: 0.0,
    economicImpact: 24500000000,
  },
  {
    id: "ro",
    type: "country" as const,
    name: "Romania",
    code: "ro",
    flag: "🇷🇴",
    tariffRate: 3.3,
    changePercent: 0.5,
    economicImpact: 26300000000,
  },
  {
    id: "sk",
    type: "country" as const,
    name: "Slovakia",
    code: "sk",
    flag: "🇸🇰",
    tariffRate: 2.8,
    changePercent: 0.1,
    economicImpact: 12900000000,
  },
  {
    id: "si",
    type: "country" as const,
    name: "Slovenia",
    code: "si",
    flag: "🇸🇮",
    tariffRate: 2.5,
    changePercent: -0.1,
    economicImpact: 5800000000,
  },
  {
    id: "es",
    type: "country" as const,
    name: "Spain",
    code: "es",
    flag: "🇪🇸",
    tariffRate: 2.6,
    changePercent: 0.0,
    economicImpact: 149000000000,
  },
  {
    id: "se",
    type: "country" as const,
    name: "Sweden",
    code: "se",
    flag: "🇸🇪",
    tariffRate: 2.0,
    changePercent: -0.3,
    economicImpact: 58700000000,
  },
  // Original product entries
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
  // Additional specific products
  {
    id: "smartphones",
    type: "product" as const,
    name: "Smartphones",
    category: "Electronics",
    tariffRate: 4.2,
    changePercent: 0.3,
    economicImpact: 87500000000,
  },
  {
    id: "laptops",
    type: "product" as const,
    name: "Laptops",
    category: "Electronics",
    tariffRate: 3.8,
    changePercent: 0.2,
    economicImpact: 65400000000,
  },
  {
    id: "wheat",
    type: "product" as const,
    name: "Wheat",
    category: "Agricultural Products",
    tariffRate: 10.5,
    changePercent: 1.8,
    economicImpact: 42600000000,
  },
  {
    id: "dairy",
    type: "product" as const,
    name: "Dairy Products",
    category: "Agricultural Products",
    tariffRate: 15.2,
    changePercent: 2.5,
    economicImpact: 58300000000,
  },
  {
    id: "cars",
    type: "product" as const,
    name: "Passenger Cars",
    category: "Automotive",
    tariffRate: 9.7,
    changePercent: -0.2,
    economicImpact: 72100000000,
  },
  {
    id: "auto-parts",
    type: "product" as const,
    name: "Auto Parts",
    category: "Automotive",
    tariffRate: 6.8,
    changePercent: -0.8,
    economicImpact: 23200000000,
  },
  {
    id: "textiles",
    type: "product" as const,
    name: "Textiles",
    category: "Manufacturing",
    tariffRate: 7.9,
    changePercent: 1.3,
    economicImpact: 87600000000,
  },
  {
    id: "pharmaceuticals",
    type: "product" as const,
    name: "Pharmaceuticals",
    category: "Healthcare",
    tariffRate: 2.1,
    changePercent: -1.2,
    economicImpact: 146800000000,
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
        result => result.name.toLowerCase().includes(query.toLowerCase()) || 
                 (result.type === "product" && result.category?.toLowerCase().includes(query.toLowerCase()))
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
           result.category?.toLowerCase().includes(product.toLowerCase()))
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
