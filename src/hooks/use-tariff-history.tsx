
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';
import { TariffHistoryData } from '@/types';

export const useTariffHistory = (countryCode: string) => {
  return useQuery({
    queryKey: ['tariffHistory', countryCode],
    queryFn: async (): Promise<TariffHistoryData[]> => {
      if (!countryCode) return [];
      
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
