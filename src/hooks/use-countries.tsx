
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';
import { CountryData } from '@/types';

export const useCountries = () => {
  return useQuery({
    queryKey: ['countries'],
    queryFn: async (): Promise<CountryData[]> => {
      const { data, error } = await supabase
        .from('countries')
        .select('*')
        .order('economicLoss', { ascending: false });
      
      if (error) {
        console.error('Error fetching countries:', error);
        throw new Error('Failed to fetch countries');
      }
      
      return data || [];
    }
  });
};

export const useCountry = (countryCode: string) => {
  return useQuery({
    queryKey: ['country', countryCode],
    queryFn: async (): Promise<CountryData | null> => {
      if (!countryCode) return null;
      
      const { data, error } = await supabase
        .from('countries')
        .select('*')
        .eq('code', countryCode)
        .single();
      
      if (error) {
        console.error(`Error fetching country ${countryCode}:`, error);
        throw new Error(`Failed to fetch country ${countryCode}`);
      }
      
      return data;
    },
    enabled: Boolean(countryCode)
  });
};
