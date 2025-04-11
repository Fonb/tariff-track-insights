
import { useQuery } from '@tanstack/react-query';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';
import { TariffHistoryData } from '@/types';

// Mock tariff history data
const mockTariffHistory: Record<string, TariffHistoryData[]> = {
  "us": [
    { countryCode: "us", date: "2024 Q1", tariff: 3.6 },
    { countryCode: "us", date: "2024 Q2", tariff: 3.5 },
    { countryCode: "us", date: "2024 Q3", tariff: 3.5 },
    { countryCode: "us", date: "2024 Q4", tariff: 3.4 },
    { countryCode: "us", date: "2025 Q1", tariff: 3.4 },
  ],
  "cn": [
    { countryCode: "cn", date: "2024 Q1", tariff: 6.2 },
    { countryCode: "cn", date: "2024 Q2", tariff: 6.5 },
    { countryCode: "cn", date: "2024 Q3", tariff: 6.9 },
    { countryCode: "cn", date: "2024 Q4", tariff: 7.3 },
    { countryCode: "cn", date: "2025 Q1", tariff: 7.5 },
  ],
  // Add more mock data for other countries if needed
};

export const useTariffHistory = (countryCode: string) => {
  const isConfigured = isSupabaseConfigured();
  
  return useQuery({
    queryKey: ['tariffHistory', countryCode],
    queryFn: async (): Promise<TariffHistoryData[]> => {
      if (!countryCode) return [];
      
      // If Supabase is not configured, return mock data
      if (!isConfigured) {
        console.log(`Using mock tariff history for ${countryCode} as Supabase is not configured`);
        return mockTariffHistory[countryCode] || [];
      }
      
      const { data, error } = await supabase
        .from('tariff_history')
        .select('*')
        .eq('countryCode', countryCode)
        .order('date', { ascending: true });
      
      if (error) {
        console.error(`Error fetching tariff history for ${countryCode}:`, error);
        throw new Error(`Failed to fetch tariff history for ${countryCode}`);
      }
      
      return data || [];
    },
    enabled: Boolean(countryCode)
  });
};
