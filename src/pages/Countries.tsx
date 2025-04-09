
import { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { CountryTariffCard } from "@/components/dashboard/CountryTariffCard";
import { DataLastUpdated } from "@/components/dashboard/DataLastUpdated";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

// Reuse mock countries from Index.tsx
const mockCountries = [
  {
    id: "us",
    name: "United States",
    code: "us",
    flag: "🇺🇸",
    averageTariff: 3.4,
    tariffChange: -0.2,
    economicLoss: 82500000000,
  },
  {
    id: "cn",
    name: "China",
    code: "cn",
    flag: "🇨🇳",
    averageTariff: 7.5,
    tariffChange: 1.2,
    economicLoss: 215000000000,
  },
  {
    id: "eu",
    name: "European Union",
    code: "eu",
    flag: "🇪🇺",
    averageTariff: 5.1,
    tariffChange: -0.1,
    economicLoss: 134000000000,
  },
  {
    id: "jp",
    name: "Japan",
    code: "jp",
    flag: "🇯🇵",
    averageTariff: 4.2,
    tariffChange: -0.3,
    economicLoss: 48700000000,
  },
  {
    id: "ca",
    name: "Canada",
    code: "ca",
    flag: "🇨🇦",
    averageTariff: 2.1,
    tariffChange: -0.5,
    economicLoss: 29300000000,
  },
  {
    id: "br",
    name: "Brazil",
    code: "br",
    flag: "🇧🇷",
    averageTariff: 13.4,
    tariffChange: 0.8,
    economicLoss: 67200000000,
  },
  {
    id: "in",
    name: "India",
    code: "in",
    flag: "🇮🇳",
    averageTariff: 17.1,
    tariffChange: 2.3,
    economicLoss: 92500000000,
  },
  {
    id: "au",
    name: "Australia",
    code: "au",
    flag: "🇦🇺",
    averageTariff: 2.5,
    tariffChange: -0.1,
    economicLoss: 18700000000,
  },
  {
    id: "mx",
    name: "Mexico",
    code: "mx",
    flag: "🇲🇽",
    averageTariff: 6.7,
    tariffChange: -0.4,
    economicLoss: 32400000000,
  },
  {
    id: "kr",
    name: "South Korea",
    code: "kr",
    flag: "🇰🇷",
    averageTariff: 8.5,
    tariffChange: 0.6,
    economicLoss: 43100000000,
  },
  {
    id: "za",
    name: "South Africa",
    code: "za",
    flag: "🇿🇦",
    averageTariff: 7.7,
    tariffChange: -0.2,
    economicLoss: 19800000000,
  },
  {
    id: "ru",
    name: "Russia",
    code: "ru",
    flag: "🇷🇺",
    averageTariff: 8.9,
    tariffChange: 1.5,
    economicLoss: 54300000000,
  },
  {
    id: "de",
    name: "Germany",
    code: "de",
    flag: "🇩🇪",
    averageTariff: 5.3,
    tariffChange: -0.2,
    economicLoss: 57900000000,
  },
  {
    id: "fr",
    name: "France",
    code: "fr",
    flag: "🇫🇷",
    averageTariff: 5.4,
    tariffChange: -0.1,
    economicLoss: 43600000000,
  },
  {
    id: "uk",
    name: "United Kingdom",
    code: "uk",
    flag: "🇬🇧",
    averageTariff: 4.8,
    tariffChange: 0.3,
    economicLoss: 39700000000,
  },
  {
    id: "sg",
    name: "Singapore",
    code: "sg",
    flag: "🇸🇬",
    averageTariff: 0.1,
    tariffChange: 0,
    economicLoss: 450000000,
  },
];

const Countries = () => {
  const [lastUpdated] = useState("April 9, 2025 09:30 GMT");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOrder, setSortOrder] = useState("name");
  
  const filteredCountries = mockCountries.filter(country => 
    country.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  const sortedCountries = [...filteredCountries].sort((a, b) => {
    switch(sortOrder) {
      case "name":
        return a.name.localeCompare(b.name);
      case "tariff-high":
        return b.averageTariff - a.averageTariff;
      case "tariff-low":
        return a.averageTariff - b.averageTariff;
      case "loss-high":
        return b.economicLoss - a.economicLoss;
      case "loss-low":
        return a.economicLoss - b.economicLoss;
      default:
        return 0;
    }
  });
  
  return (
    <Layout>
      <div className="container py-6">
        <header className="mb-6">
          <h1 className="text-3xl font-bold mb-2">Countries</h1>
          <div className="flex justify-between items-center">
            <DataLastUpdated timestamp={lastUpdated} />
          </div>
        </header>
        
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6">
          <div className="relative w-full md:w-64">
            <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={16} />
            <Input
              placeholder="Search countries..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <div className="w-full md:w-auto">
            <select
              className="w-full md:w-auto bg-background border border-border rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-accent"
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
            >
              <option value="name">Sort by Name</option>
              <option value="tariff-high">Highest Tariff</option>
              <option value="tariff-low">Lowest Tariff</option>
              <option value="loss-high">Highest Economic Loss</option>
              <option value="loss-low">Lowest Economic Loss</option>
            </select>
          </div>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {sortedCountries.map((country) => (
            <CountryTariffCard key={country.id} country={country} />
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Countries;
