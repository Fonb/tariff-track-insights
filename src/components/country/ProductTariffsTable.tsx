
import { ArrowUpDown, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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

export const ProductTariffsTable = ({ products, countryCode }: ProductTariffsTableProps) => {
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
                <th>
                  <div className="flex items-center gap-1">
                    <span>Product</span>
                    <ArrowUpDown size={14} />
                  </div>
                </th>
                <th>
                  <div className="flex items-center gap-1">
                    <span>Category</span>
                    <ArrowUpDown size={14} />
                  </div>
                </th>
                <th>
                  <div className="flex items-center gap-1">
                    <span>Tariff Rate</span>
                    <ArrowUpDown size={14} />
                  </div>
                </th>
                <th>
                  <div className="flex items-center gap-1">
                    <span>Change</span>
                    <ArrowUpDown size={14} />
                  </div>
                </th>
                <th>
                  <div className="flex items-center gap-1">
                    <span>Economic Impact</span>
                    <ArrowUpDown size={14} />
                  </div>
                </th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.id}>
                  <td>
                    <Link 
                      to={`/country/${countryCode}/product/${product.id}`}
                      className="font-medium hover:text-accent"
                    >
                      {product.name}
                    </Link>
                  </td>
                  <td>{product.category}</td>
                  <td className="font-medium">{product.tariffRate}%</td>
                  <td>
                    <span 
                      className={
                        product.changePercent > 0 
                          ? "text-red-500" 
                          : product.changePercent < 0 
                            ? "text-green-500" 
                            : ""
                      }
                    >
                      {product.changePercent > 0 ? "+" : ""}
                      {product.changePercent}%
                    </span>
                  </td>
                  <td>{formatCurrency(product.economicImpact)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
};
