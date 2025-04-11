
export type CountryData = {
  id: string;
  name: string;
  code: string;
  flag: string;
  averageTariff: number;
  tariffChange: number;
  economicLoss: number;
  created_at?: string;
};

export type TariffHistoryData = {
  id?: number;
  countryCode: string;
  date: string;
  tariff: number;
  created_at?: string;
};

export type ProductTariffData = {
  id?: number;
  productId: string;
  productName: string;
  category: string;
  countryCode: string;
  tariffRate: number;
  previousRate: number;
  changeDate: string;
  created_at?: string;
};
