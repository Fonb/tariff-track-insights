
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';
import { ProductTariffData } from '@/types';

export const useProductTariffs = (countryCode: string) => {
  return useQuery({
    queryKey: ['productTariffs', countryCode],
    queryFn: async (): Promise<ProductTariffData[]> => {
      if (!countryCode) return [];
      
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
  return useQuery({
    queryKey: ['searchProducts', query],
    queryFn: async (): Promise<ProductTariffData[]> => {
      if (!query || query.length < 2) return [];
      
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
