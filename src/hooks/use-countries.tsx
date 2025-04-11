import { useQuery } from '@tanstack/react-query';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';
import { CountryData } from '@/types';

// Mock data to use when Supabase is not configured
const mockCountries: CountryData[] = [
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

export const useCountries = () => {
  const isConfigured = isSupabaseConfigured();
  
  return useQuery({
    queryKey: ['countries'],
    queryFn: async (): Promise<CountryData[]> => {
      // If Supabase is not configured, return mock data
      if (!isConfigured) {
        console.log('Using mock country data as Supabase is not configured');
        return mockCountries;
      }
      
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
  const isConfigured = isSupabaseConfigured();
  
  return useQuery({
    queryKey: ['country', countryCode],
    queryFn: async (): Promise<CountryData | null> => {
      if (!countryCode) return null;
      
      // If Supabase is not configured, return mock data
      if (!isConfigured) {
        console.log(`Using mock data for country ${countryCode} as Supabase is not configured`);
        const mockCountry = mockCountries.find(c => c.code === countryCode);
        return mockCountry || null;
      }
      
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
