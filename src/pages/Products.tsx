
import { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { DataLastUpdated } from "@/components/dashboard/DataLastUpdated";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Search, ArrowUpDown } from "lucide-react";
import { Input } from "@/components/ui/input";

// Mock products data
const mockProducts = [
  {
    id: "electronics",
    name: "Electronics",
    category: "Consumer Goods",
    averageTariff: 5.8,
    tariffChange: 0.7,
    economicLoss: 132400000000,
  },
  {
    id: "agricultural",
    name: "Agricultural Products",
    category: "Food & Beverages",
    averageTariff: 12.3,
    tariffChange: 2.1,
    economicLoss: 178900000000,
  },
  {
    id: "automotive",
    name: "Automotive",
    category: "Transportation",
    averageTariff: 8.4,
    tariffChange: -0.5,
    economicLoss: 95300000000,
  },
  {
    id: "textiles",
    name: "Textiles",
    category: "Clothing",
    averageTariff: 7.9,
    tariffChange: -0.4,
    economicLoss: 85100000000,
  },
  {
    id: "chemicals",
    name: "Chemicals",
    category: "Industrial",
    averageTariff: 4.7,
    tariffChange: 0.2,
    economicLoss: 112500000000,
  },
  {
    id: "pharmaceuticals",
    name: "Pharmaceuticals",
    category: "Healthcare",
    averageTariff: 3.2,
    tariffChange: -0.8,
    economicLoss: 76800000000,
  },
  {
    id: "metals",
    name: "Metals",
    category: "Raw Materials",
    averageTariff: 5.6,
    tariffChange: 1.3,
    economicLoss: 98200000000,
  },
  {
    id: "machinery",
    name: "Machinery",
    category: "Industrial",
    averageTariff: 6.8,
    tariffChange: 0.4,
    economicLoss: 145700000000,
  },
];

const Products = () => {
  const [lastUpdated] = useState("April 9, 2025 09:30 GMT");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOrder, setSortOrder] = useState("name");
  
  const filteredProducts = mockProducts.filter(product => 
    product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.category.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch(sortOrder) {
      case "name":
        return a.name.localeCompare(b.name);
      case "category":
        return a.category.localeCompare(b.category);
      case "tariff-high":
        return b.averageTariff - a.averageTariff;
      case "tariff-low":
        return a.averageTariff - b.averageTariff;
      case "loss-high":
        return b.economicLoss - a.economicLoss;
      default:
        return 0;
    }
  });
  
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      notation: 'compact',
      maximumFractionDigits: 1,
    }).format(value);
  };

  return (
    <Layout>
      <div className="container py-6">
        <header className="mb-6">
          <h1 className="text-3xl font-bold mb-2">Products</h1>
          <div className="flex justify-between items-center">
            <DataLastUpdated timestamp={lastUpdated} />
          </div>
        </header>
        
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6">
          <div className="relative w-full md:w-64">
            <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={16} />
            <Input
              placeholder="Search products or categories..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <div className="w-full md:w-auto">
            <select
              className="w-full md:w-auto bg-background border border-border rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-accent"
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
            >
              <option value="name">Sort by Name</option>
              <option value="category">Sort by Category</option>
              <option value="tariff-high">Highest Tariff</option>
              <option value="tariff-low">Lowest Tariff</option>
              <option value="loss-high">Highest Economic Loss</option>
            </select>
          </div>
        </div>
        
        <div className="overflow-x-auto border rounded-lg">
          <table className="w-full">
            <thead>
              <tr className="bg-secondary">
                <th className="px-4 py-3 text-left text-sm font-medium">
                  <div className="flex items-center gap-1 cursor-pointer" onClick={() => setSortOrder("name")}>
                    <span>Product</span>
                    <ArrowUpDown size={14} />
                  </div>
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium">
                  <div className="flex items-center gap-1 cursor-pointer" onClick={() => setSortOrder("category")}>
                    <span>Category</span>
                    <ArrowUpDown size={14} />
                  </div>
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium">
                  <div className="flex items-center gap-1 cursor-pointer" onClick={() => setSortOrder("tariff-high")}>
                    <span>Avg. Tariff</span>
                    <ArrowUpDown size={14} />
                  </div>
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium">Change</th>
                <th className="px-4 py-3 text-left text-sm font-medium">
                  <div className="flex items-center gap-1 cursor-pointer" onClick={() => setSortOrder("loss-high")}>
                    <span>Economic Impact</span>
                    <ArrowUpDown size={14} />
                  </div>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {sortedProducts.map((product) => (
                <tr key={product.id} className="hover:bg-muted/20">
                  <td className="px-4 py-3">
                    <Link to={`/product/${product.id}`} className="font-medium hover:text-accent">
                      {product.name}
                    </Link>
                  </td>
                  <td className="px-4 py-3">{product.category}</td>
                  <td className="px-4 py-3 font-medium">{product.averageTariff}%</td>
                  <td className="px-4 py-3">
                    <span 
                      className={
                        product.tariffChange > 0 
                          ? "text-red-500" 
                          : product.tariffChange < 0 
                            ? "text-green-500" 
                            : ""
                      }
                    >
                      {product.tariffChange > 0 ? "+" : ""}
                      {product.tariffChange}%
                    </span>
                  </td>
                  <td className="px-4 py-3">{formatCurrency(product.economicLoss)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Layout>
  );
};

export default Products;
