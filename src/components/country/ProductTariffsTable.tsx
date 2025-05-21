
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowUpDown, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

type Product = {
  id: string;
  name: string;
  category: string;
  tariffRate: number;
  changePercent: number;
  economicImpact: number;
};

type ProductTariffsTableProps = {
  products: Product[];
  countryCode: string;
};

type SortField = "name" | "tariffRate" | "changePercent" | "economicImpact";
type SortDirection = "asc" | "desc";

export const ProductTariffsTable = ({ products, countryCode }: ProductTariffsTableProps) => {
  const [sortField, setSortField] = useState<SortField>("name");
  const [sortDirection, setSortDirection] = useState<SortDirection>("asc");

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  const sortedProducts = [...products].sort((a, b) => {
    if (sortField === "name") {
      return sortDirection === "asc" 
        ? a.name.localeCompare(b.name) 
        : b.name.localeCompare(a.name);
    } else {
      const aValue = a[sortField];
      const bValue = b[sortField];
      
      if (sortDirection === "asc") {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    }
  });

  const getSortIcon = (field: SortField) => {
    if (sortField !== field) {
      return <ArrowUpDown size={14} className="opacity-50" />;
    }
    
    return <ArrowUpDown size={14} className="text-accent" />;
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      notation: 'compact',
      maximumFractionDigits: 1,
    }).format(value);
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle>Product Tariffs</CardTitle>
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
                <th className="dark:bg-accent/20 dark:text-white">
                  <div 
                    className="flex items-center gap-1 cursor-pointer" 
                    onClick={() => handleSort("name")}
                  >
                    <span>Product</span>
                    {getSortIcon("name")}
                  </div>
                </th>
                <th className="dark:bg-accent/20 dark:text-white">Category</th>
                <th className="dark:bg-accent/20 dark:text-white">
                  <div 
                    className="flex items-center gap-1 cursor-pointer" 
                    onClick={() => handleSort("tariffRate")}
                  >
                    <span>Tariff Rate</span>
                    {getSortIcon("tariffRate")}
                  </div>
                </th>
                <th className="dark:bg-accent/20 dark:text-white">
                  <div 
                    className="flex items-center gap-1 cursor-pointer" 
                    onClick={() => handleSort("changePercent")}
                  >
                    <span>Change</span>
                    {getSortIcon("changePercent")}
                  </div>
                </th>
                <th className="dark:bg-accent/20 dark:text-white">
                  <div 
                    className="flex items-center gap-1 cursor-pointer" 
                    onClick={() => handleSort("economicImpact")}
                  >
                    <span>Economic Impact</span>
                    {getSortIcon("economicImpact")}
                  </div>
                </th>
              </tr>
            </thead>
            <tbody>
              {sortedProducts.map((product) => (
                <tr key={product.id} className="dark:hover:bg-accent/10">
                  <td>
                    <Link to={`/product/${product.id}`} className="font-medium hover:text-accent dark:text-gray-100 dark:hover:text-white no-underline">
                      {product.name}
                    </Link>
                  </td>
                  <td className="dark:text-gray-200">{product.category}</td>
                  <td className="font-medium dark:text-white">{product.tariffRate}%</td>
                  <td>
                    <span
                      className={
                        product.changePercent > 0
                          ? "text-red-500 dark:text-red-400"
                          : product.changePercent < 0
                          ? "text-green-500 dark:text-green-400"
                          : "dark:text-gray-200"
                      }
                    >
                      {product.changePercent > 0 ? "+" : ""}
                      {product.changePercent}%
                    </span>
                  </td>
                  <td className="dark:text-gray-200">{formatCurrency(product.economicImpact)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
};
