
import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Download, Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Layout } from "@/components/layout/Layout";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// Mock product data
const mockProductData = {
  electronics: {
    id: "electronics",
    name: "Electronics",
    category: "Consumer Goods",
    description: "Consumer and commercial electronic products including computers, smartphones, and audio equipment.",
    averageTariff: 5.8,
    economicImpact: 132400000000,
    tariffHistory: [
      { date: "2024 Q1", tariff: 5.2 },
      { date: "2024 Q2", tariff: 5.4 },
      { date: "2024 Q3", tariff: 5.7 },
      { date: "2024 Q4", tariff: 5.8 },
      { date: "2025 Q1", tariff: 5.8 },
    ],
    topCountries: [
      { name: "China", flag: "🇨🇳", tariffRate: 5.9, changePercent: 1.4, economicImpact: 52000000000 },
      { name: "United States", flag: "🇺🇸", tariffRate: 2.7, changePercent: -0.3, economicImpact: 18900000000 },
      { name: "South Korea", flag: "🇰🇷", tariffRate: 6.2, changePercent: 0.7, economicImpact: 15600000000 },
      { name: "Japan", flag: "🇯🇵", tariffRate: 3.1, changePercent: -0.2, economicImpact: 12700000000 },
      { name: "Germany", flag: "🇩🇪", tariffRate: 4.8, changePercent: 0.1, economicImpact: 9800000000 },
    ],
  },
};

const ProductDetail = () => {
  const { productId } = useParams<{ productId: string }>();
  const [product, setProduct] = useState(() => {
    // Default to electronics data if product ID not found or invalid
    return mockProductData[productId as keyof typeof mockProductData] || mockProductData.electronics;
  });

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 2,
    }).format(value);
  };

  return (
    <Layout>
      <div className="container py-6">
        <div className="mb-6">
          <div className="mb-2">
            <Link to="/" className="text-sm text-muted-foreground hover:text-accent flex items-center gap-1">
              <ArrowLeft size={14} />
              <span>Back to Dashboard</span>
            </Link>
          </div>
          
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold">{product.name}</h1>
              <p className="text-muted-foreground">
                {product.category} • Global Economic Impact: {formatCurrency(product.economicImpact)}
              </p>
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
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          <Card className="lg:col-span-2">
            <CardHeader className="pb-2">
              <CardTitle>Global Tariff Rate History</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart
                    data={product.tariffHistory}
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
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>About This Product</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm mb-4">
                {product.description}
              </p>
              
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-muted-foreground">Global Average Tariff</p>
                  <p className="text-2xl font-bold">{product.averageTariff}%</p>
                </div>
                
                <div>
                  <p className="text-sm text-muted-foreground">Total Economic Impact</p>
                  <p className="text-2xl font-bold">{formatCurrency(product.economicImpact)}</p>
                </div>
                
                <div>
                  <p className="text-sm text-muted-foreground">Data Source</p>
                  <p className="text-sm">Trade Data API v3.2</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle>Top Countries by Tariff Rate</CardTitle>
            <Button variant="outline" size="sm" className="h-8 gap-1">
              <Download size={16} />
              <span className="hidden sm:inline">Export CSV</span>
            </Button>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Country</th>
                    <th>Tariff Rate</th>
                    <th>Change</th>
                    <th>Economic Impact</th>
                  </tr>
                </thead>
                <tbody>
                  {product.topCountries.map((country) => (
                    <tr key={country.name}>
                      <td>
                        <div className="flex items-center gap-2">
                          <span>{country.flag}</span>
                          <span className="font-medium">{country.name}</span>
                        </div>
                      </td>
                      <td className="font-medium">{country.tariffRate}%</td>
                      <td>
                        <span
                          className={
                            country.changePercent > 0
                              ? "text-red-500"
                              : country.changePercent < 0
                              ? "text-green-500"
                              : ""
                          }
                        >
                          {country.changePercent > 0 ? "+" : ""}
                          {country.changePercent}%
                        </span>
                      </td>
                      <td>{formatCurrency(country.economicImpact)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default ProductDetail;
