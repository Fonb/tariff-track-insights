import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { CountryDetailHeader } from "@/components/country/CountryDetailHeader";
import { TariffHistoryChart } from "@/components/country/TariffHistoryChart";
import { ProductTariffsTable } from "@/components/country/ProductTariffsTable";

// Mock country data
const mockCountryData = {
  us: {
    name: "United States",
    code: "us",
    flag: "🇺🇸",
    averageTariff: 3.4,
    economicLoss: 82500000000,
    tariffHistory: [
      { date: "2024 Q1", tariff: 3.6 },
      { date: "2024 Q2", tariff: 3.5 },
      { date: "2024 Q3", tariff: 3.5 },
      { date: "2024 Q4", tariff: 3.4 },
      { date: "2025 Q1", tariff: 3.4 },
    ],
    products: [
      {
        id: "electronics",
        name: "Electronics",
        category: "Consumer Goods",
        tariffRate: 2.7,
        changePercent: -0.3,
        economicImpact: 18900000000,
      },
      {
        id: "agriculture",
        name: "Agricultural Products",
        category: "Food & Beverages",
        tariffRate: 9.8,
        changePercent: 1.2,
        economicImpact: 25400000000,
      },
      {
        id: "automotive",
        name: "Automotive",
        category: "Transportation",
        tariffRate: 2.5,
        changePercent: 0,
        economicImpact: 14700000000,
      },
      {
        id: "textiles",
        name: "Textiles",
        category: "Clothing",
        tariffRate: 7.9,
        changePercent: -0.4,
        economicImpact: 9800000000,
      },
      {
        id: "steel",
        name: "Steel",
        category: "Raw Materials",
        tariffRate: 2.2,
        changePercent: -0.5,
        economicImpact: 7500000000,
      },
    ],
  },
  cn: {
    name: "China",
    code: "cn",
    flag: "🇨🇳",
    averageTariff: 7.5,
    economicLoss: 215000000000,
    tariffHistory: [
      { date: "2024 Q1", tariff: 6.2 },
      { date: "2024 Q2", tariff: 6.5 },
      { date: "2024 Q3", tariff: 6.9 },
      { date: "2024 Q4", tariff: 7.3 },
      { date: "2025 Q1", tariff: 7.5 },
    ],
    products: [
      {
        id: "electronics",
        name: "Electronics",
        category: "Consumer Goods",
        tariffRate: 5.9,
        changePercent: 1.4,
        economicImpact: 52000000000,
      },
      {
        id: "agriculture",
        name: "Agricultural Products",
        category: "Food & Beverages",
        tariffRate: 15.2,
        changePercent: 2.3,
        economicImpact: 65700000000,
      },
      {
        id: "automotive",
        name: "Automotive",
        category: "Transportation",
        tariffRate: 12.8,
        changePercent: 1.5,
        economicImpact: 33900000000,
      },
      {
        id: "textiles",
        name: "Textiles",
        category: "Clothing",
        tariffRate: 9.7,
        changePercent: 0.8,
        economicImpact: 27500000000,
      },
      {
        id: "steel",
        name: "Steel",
        category: "Raw Materials",
        tariffRate: 4.8,
        changePercent: 0.4,
        economicImpact: 18300000000,
      },
    ],
  },
  at: {
    name: "Austria",
    code: "at",
    flag: "🇦🇹",
    averageTariff: 2.8,
    economicLoss: 45600000000,
    tariffHistory: [
      { date: "2024 Q1", tariff: 3.1 },
      { date: "2024 Q2", tariff: 3.0 },
      { date: "2024 Q3", tariff: 2.9 },
      { date: "2024 Q4", tariff: 2.8 },
      { date: "2025 Q1", tariff: 2.8 },
    ],
    products: [
      {
        id: "electronics",
        name: "Electronics",
        category: "Consumer Goods",
        tariffRate: 2.5,
        changePercent: -0.2,
        economicImpact: 12300000000,
      },
      {
        id: "agriculture",
        name: "Agricultural Products",
        category: "Food & Beverages",
        tariffRate: 5.2,
        changePercent: -0.3,
        economicImpact: 14800000000,
      },
    ],
  },
  de: {
    name: "Germany",
    code: "de",
    flag: "🇩🇪",
    averageTariff: 2.4,
    economicLoss: 425000000000,
    tariffHistory: [
      { date: "2024 Q1", tariff: 2.6 },
      { date: "2024 Q2", tariff: 2.5 },
      { date: "2024 Q3", tariff: 2.5 },
      { date: "2024 Q4", tariff: 2.4 },
      { date: "2025 Q1", tariff: 2.4 },
    ],
    products: [
      {
        id: "automotive",
        name: "Automotive",
        category: "Transportation",
        tariffRate: 2.2,
        changePercent: -0.1,
        economicImpact: 187000000000,
      },
      {
        id: "electronics",
        name: "Electronics",
        category: "Consumer Goods",
        tariffRate: 2.3,
        changePercent: -0.2,
        economicImpact: 98000000000,
      },
    ],
  },
  fr: {
    name: "France",
    code: "fr",
    flag: "🇫🇷",
    averageTariff: 2.6,
    economicLoss: 298000000000,
    tariffHistory: [
      { date: "2024 Q1", tariff: 2.8 },
      { date: "2024 Q2", tariff: 2.7 },
      { date: "2024 Q3", tariff: 2.6 },
      { date: "2024 Q4", tariff: 2.6 },
      { date: "2025 Q1", tariff: 2.6 },
    ],
    products: [
      {
        id: "agriculture",
        name: "Agricultural Products",
        category: "Food & Beverages",
        tariffRate: 4.2,
        changePercent: -0.1,
        economicImpact: 87000000000,
      },
      {
        id: "luxury",
        name: "Luxury Goods",
        category: "Consumer Goods",
        tariffRate: 3.1,
        changePercent: 0.2,
        economicImpact: 67000000000,
      },
    ],
  },
};

const CountryDetail = () => {
  const { countryCode } = useParams<{ countryCode: string }>();
  const [country, setCountry] = useState<any>(null);
  
  useEffect(() => {
    // Set country based on URL param, fallback to US only if code is invalid
    if (countryCode && mockCountryData[countryCode as keyof typeof mockCountryData]) {
      setCountry(mockCountryData[countryCode as keyof typeof mockCountryData]);
    } else {
      setCountry(mockCountryData.us);
    }
  }, [countryCode]);
  
  if (!country) return <div className="container py-6">Loading...</div>;

  return (
    <Layout>
      <div className="container py-6">
        <CountryDetailHeader country={country} />
        
        <TariffHistoryChart data={country.tariffHistory} />
        
        <ProductTariffsTable products={country.products} countryCode={country.code} />
      </div>
    </Layout>
  );
};

export default CountryDetail;
