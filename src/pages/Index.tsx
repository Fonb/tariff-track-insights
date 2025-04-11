
import { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { CountryTariffCard } from "@/components/dashboard/CountryTariffCard";
import { DataLastUpdated } from "@/components/dashboard/DataLastUpdated";
import { SearchFilters } from "@/components/dashboard/SearchFilters";
import { TariffStatsOverview } from "@/components/dashboard/TariffStatsOverview";
import { useCountries } from "@/hooks/use-countries";
import { format } from "date-fns";

const Index = () => {
  const { data: countries = [], isLoading, error } = useCountries();
  const [lastUpdated] = useState(format(new Date(), "MMMM d, yyyy HH:mm 'GMT'"));
  
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
          
          {isLoading && (
            <div className="flex justify-center py-8">
              <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full"></div>
            </div>
          )}
          
          {error && (
            <div className="bg-destructive/10 text-destructive p-4 rounded-md">
              <p>Error loading country data. Please try again later.</p>
            </div>
          )}
          
          {!isLoading && !error && (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {countries.map((country) => (
                <CountryTariffCard key={country.id} country={country} />
              ))}
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Index;
