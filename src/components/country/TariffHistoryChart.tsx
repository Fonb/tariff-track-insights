
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type TariffHistoryChartProps = {
  data: Array<{
    date: string;
    tariff: number;
  }>;
};

export const TariffHistoryChart = ({ data }: TariffHistoryChartProps) => {
  return (
    <Card className="mb-6">
      <CardHeader className="pb-2">
        <CardTitle>Tariff Rate History</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={data}
              margin={{
                top: 10,
                right: 30,
                left: 0,
                bottom: 0,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis 
                dataKey="date" 
                tick={{ fontSize: 12 }}
                tickLine={false}
                axisLine={false}
              />
              <YAxis 
                tickFormatter={(value) => `${value}%`}
                tick={{ fontSize: 12 }}
                tickLine={false}
                axisLine={false}
                domain={['dataMin - 0.5', 'dataMax + 0.5']}
              />
              <Tooltip 
                formatter={(value) => [`${value}%`, 'Tariff Rate']}
                labelFormatter={(label) => `Date: ${label}`}
              />
              <Area 
                type="monotone" 
                dataKey="tariff" 
                stroke="#FF6B00" 
                fill="rgba(255, 107, 0, 0.1)" 
                strokeWidth={2}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};
