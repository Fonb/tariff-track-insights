
import { ArrowDownIcon, ArrowUpIcon, TrendingDown, TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";

type CountryTariffCardProps = {
  country: {
    id: string;
    name: string;
    code: string;
    flag: string;
    averageTariff: number;
    tariffChange: number;
    economicLoss: number;
  };
};

export const CountryTariffCard = ({ country }: CountryTariffCardProps) => {
  const { name, code, flag, averageTariff, tariffChange, economicLoss } = country;
  
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      notation: 'compact',
      maximumFractionDigits: 1,
    }).format(value);
  };

  return (
    <Link to={`/country/${code}`} className="no-underline">
      <Card className="h-full hover:shadow-md transition-all duration-200">
        <CardContent className="p-4">
          <div className="flex items-center gap-3 mb-3">
            <span className="text-2xl">{flag}</span>
            <h3 className="font-bold truncate">{name}</h3>
          </div>
          
          <div className="grid grid-cols-2 gap-2">
            <div>
              <p className="text-sm text-muted-foreground">Avg. Tariff</p>
              <div className="flex items-baseline gap-1">
                <p className="text-xl font-bold">{averageTariff}%</p>
                <div className={`flex items-center text-xs ${tariffChange > 0 ? 'text-red-500' : 'text-green-500'}`}>
                  {tariffChange > 0 ? (
                    <ArrowUpIcon size={12} />
                  ) : (
                    <ArrowDownIcon size={12} />
                  )}
                  <span>{Math.abs(tariffChange)}%</span>
                </div>
              </div>
            </div>
            
            <div>
              <p className="text-sm text-muted-foreground">Economic Loss</p>
              <div className="flex items-center gap-1">
                <p className="text-xl font-bold">{formatCurrency(economicLoss)}</p>
                {economicLoss > 1000000000 ? (
                  <TrendingUp size={16} className="text-red-500" />
                ) : (
                  <TrendingDown size={16} className="text-green-500" />
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};
