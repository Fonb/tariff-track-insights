
import { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { CountryTariffCard } from "@/components/dashboard/CountryTariffCard";
import { DataLastUpdated } from "@/components/dashboard/DataLastUpdated";
import { SearchFilters } from "@/components/dashboard/SearchFilters";
import { TariffStatsOverview } from "@/components/dashboard/TariffStatsOverview";

// Mock data for the dashboard
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
];

// Sort countries by economic loss (highest to lowest)
const sortedCountries = [...mockCountries].sort((a, b) => b.economicLoss - a.economicLoss);

const Index = () => {
  const [lastUpdated] = useState("April 9, 2025 09:30 GMT");
  
  return (
    <Layout>
      <div className="container py-6">
        <header className="mb-6">
          <h1 className="text-3xl font-bold mb-2">Global Tariff Dashboard</h1>
          <div className="flex justify-between items-center">
            <DataLastUpdated timestamp={lastUpdated} />
          </div>
        </header>
        
        <TariffStatsOverview />
        
        <div className="my-8">
          <h2 className="text-2xl font-bold mb-4">Explore Tariff Data</h2>
          <SearchFilters />
        </div>
        
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Country Tariff Overview</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {sortedCountries.map((country) => (
              <CountryTariffCard key={country.id} country={country} />
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Index;
