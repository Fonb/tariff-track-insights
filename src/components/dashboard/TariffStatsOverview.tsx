
import { BarChart3, PieChart, TrendingUp } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const TariffStatsOverview = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">Global Average Tariff</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div className="flex items-baseline space-x-2">
              <span className="text-3xl font-bold">5.2%</span>
              <span className="text-green-500 text-sm font-medium">-0.3%</span>
            </div>
            <BarChart3 className="text-muted-foreground" />
          </div>
          <p className="text-xs text-muted-foreground mt-2">
            Based on data from 194 countries
          </p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">Total Economic Impact</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div className="flex items-baseline">
              <span className="text-3xl font-bold">$2.7T</span>
            </div>
            <TrendingUp className="text-red-500" />
          </div>
          <p className="text-xs text-muted-foreground mt-2">
            Estimated global economic loss from tariffs
          </p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">Most Tariffed Products</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div className="flex flex-col">
              <span className="text-xl font-bold">Agricultural</span>
              <span className="text-muted-foreground text-sm">Dairy, Sugar, Meat</span>
            </div>
            <PieChart className="text-muted-foreground" />
          </div>
          <p className="text-xs text-muted-foreground mt-2">
            Average 15.8% tariff rate across countries
          </p>
        </CardContent>
      </Card>
    </div>
  );
};
