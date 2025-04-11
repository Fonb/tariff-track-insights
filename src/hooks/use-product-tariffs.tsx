
import { useQuery } from '@tanstack/react-query';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';
import { ProductTariffData } from '@/types';

// Mock product tariff data
const mockProductTariffs: ProductTariffData[] = [
  {
    productId: "electronics-001",
    productName: "Smartphones",
    category: "Electronics",
    countryCode: "us",
    tariffRate: 2.7,
    previousRate: 3.0,
    changeDate: "2025-01-15",
  },
  {
    productId: "agriculture-001",
    productName: "Soybeans",
    category: "Agriculture",
    countryCode: "us",
    tariffRate: 9.8,
    previousRate: 8.6,
    changeDate: "2025-02-10",
  },
  // More mock products can be added here
];

export const useProductTariffs = (countryCode: string) => {
  const isConfigured = isSupabaseConfigured();
  
  return useQuery({
    queryKey: ['productTariffs', countryCode],
    queryFn: async (): Promise<ProductTariffData[]> => {
      if (!countryCode) return [];
      
      // If Supabase is not configured, return mock data
      if (!isConfigured) {
        console.log(`Using mock product tariffs for ${countryCode} as Supabase is not configured`);
        return mockProductTariffs.filter(product => product.countryCode === countryCode);
      }
      
      const { data, error } = await supabase
        .from('product_tariffs')
        .select('*')
        .eq('countryCode', countryCode);
      
      if (error) {
        console.error(`Error fetching product tariffs for ${countryCode}:`, error);
        throw new Error(`Failed to fetch product tariffs for ${countryCode}`);
      }
      
      return data || [];
    },
    enabled: Boolean(countryCode)
  });
};

export const useSearchProducts = (query: string) => {
  const isConfigured = isSupabaseConfigured();
  
  return useQuery({
    queryKey: ['searchProducts', query],
    queryFn: async (): Promise<ProductTariffData[]> => {
      if (!query || query.length < 2) return [];
      
      // If Supabase is not configured, return filtered mock data
      if (!isConfigured) {
        console.log(`Using mock data for search query "${query}" as Supabase is not configured`);
        return mockProductTariffs.filter(product => 
          product.productName.toLowerCase().includes(query.toLowerCase()) || 
          product.category.toLowerCase().includes(query.toLowerCase()) || 
          product.countryCode.toLowerCase().includes(query.toLowerCase())
        );
      }
      
      const { data, error } = await supabase
        .from('product_tariffs')
        .select('*')
        .or(`productName.ilike.%${query}%,category.ilike.%${query}%,countryCode.ilike.%${query}%`)
        .limit(50);
      
      if (error) {
        console.error(`Error searching products:`, error);
        throw new Error(`Failed to search products`);
      }
      
      return data || [];
    },
    enabled: Boolean(query && query.length >= 2)
  });
};
