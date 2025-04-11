
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
import { useState, useEffect } from "react";

type TariffHistoryChartProps = {
  data: Array<{
    date: string;
    tariff: number;
  }>;
};

export const TariffHistoryChart = ({ data }: TariffHistoryChartProps) => {
  const [trend, setTrend] = useState<'up' | 'down' | 'neutral'>('neutral');
  
  useEffect(() => {
    if (data.length < 2) return;
    
    const firstValue = data[0].tariff;
    const lastValue = data[data.length - 1].tariff;
    
    if (lastValue > firstValue) {
      setTrend('up');
    } else if (lastValue < firstValue) {
      setTrend('down');
    } else {
      setTrend('neutral');
    }
  }, [data]);
  
  // Determine color based on trend (red for increasing tariffs, green for decreasing)
  const getChartColor = () => {
    if (trend === 'up') return "#ea384c"; // Red for increasing (negative)
    if (trend === 'down') return "#22c55e"; // Green for decreasing (positive)
    return "#FF6B00"; // Orange for neutral
  };
  
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
                stroke={getChartColor()} 
                fill={`${getChartColor()}1a`} 
                strokeWidth={2}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};
