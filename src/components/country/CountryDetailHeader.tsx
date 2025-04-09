
import { ArrowLeft, Download, Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

type CountryDetailHeaderProps = {
  country: {
    name: string;
    code: string;
    flag: string;
    averageTariff: number;
    economicLoss: number;
  };
};

export const CountryDetailHeader = ({ country }: CountryDetailHeaderProps) => {
  const { name, flag, economicLoss } = country;
  
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 2,
    }).format(value);
  };
  
  return (
    <div className="mb-6">
      <div className="mb-2">
        <Link to="/" className="text-sm text-muted-foreground hover:text-accent flex items-center gap-1">
          <ArrowLeft size={14} />
          <span>Back to Dashboard</span>
        </Link>
      </div>
      
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <span className="text-4xl">{flag}</span>
          <div>
            <h1 className="text-3xl font-bold">{name}</h1>
            <p className="text-muted-foreground">
              Total Economic Impact: {formatCurrency(economicLoss)}
            </p>
          </div>
        </div>
        
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="gap-1">
            <Download size={16} />
            <span>Download Data</span>
          </Button>
          <Button size="sm" className="gap-1">
            <Bell size={16} />
            <span>Set Alert</span>
          </Button>
        </div>
      </div>
    </div>
  );
};
