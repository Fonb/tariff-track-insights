
import { ArrowUpDown, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

type SearchResult = {
  id: string;
  type: "country" | "product";
  name: string;
  code?: string;
  flag?: string;
  category?: string;
  tariffRate: number;
  changePercent: number;
  economicImpact: number;
};

type SearchResultsTableProps = {
  results: SearchResult[];
};

export const SearchResultsTable = ({ results }: SearchResultsTableProps) => {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      notation: 'compact',
      maximumFractionDigits: 1,
    }).format(value);
  };

  return (
    <div className="overflow-hidden border border-border rounded-lg">
      <div className="bg-secondary p-4 flex justify-between items-center">
        <h2 className="font-semibold">Search Results ({results.length})</h2>
        <Button variant="outline" size="sm" className="h-8 gap-1">
          <Download size={16} />
          <span className="hidden sm:inline">Export Results</span>
        </Button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-muted/50">
              <th className="px-4 py-3 text-left text-sm font-medium">
                <div className="flex items-center gap-1">
                  <span>Name</span>
                  <ArrowUpDown size={14} />
                </div>
              </th>
              <th className="px-4 py-3 text-left text-sm font-medium">Type</th>
              <th className="px-4 py-3 text-left text-sm font-medium">
                <div className="flex items-center gap-1">
                  <span>Tariff Rate</span>
                  <ArrowUpDown size={14} />
                </div>
              </th>
              <th className="px-4 py-3 text-left text-sm font-medium">
                <div className="flex items-center gap-1">
                  <span>Change</span>
                  <ArrowUpDown size={14} />
                </div>
              </th>
              <th className="px-4 py-3 text-left text-sm font-medium">
                <div className="flex items-center gap-1">
                  <span>Economic Impact</span>
                  <ArrowUpDown size={14} />
                </div>
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {results.map((result) => (
              <tr key={result.id} className="hover:bg-muted/20">
                <td className="px-4 py-3">
                  <Link
                    to={`/${result.type}/${result.code || result.id}`}
                    className="font-medium hover:text-accent flex items-center gap-2"
                  >
                    {result.flag && <span>{result.flag}</span>}
                    {result.name}
                  </Link>
                </td>
                <td className="px-4 py-3 capitalize">
                  {result.type}
                  {result.category && ` - ${result.category}`}
                </td>
                <td className="px-4 py-3 font-medium">{result.tariffRate}%</td>
                <td className="px-4 py-3">
                  <span
                    className={
                      result.changePercent > 0
                        ? "text-red-500"
                        : result.changePercent < 0
                        ? "text-green-500"
                        : ""
                    }
                  >
                    {result.changePercent > 0 ? "+" : ""}
                    {result.changePercent}%
                  </span>
                </td>
                <td className="px-4 py-3">{formatCurrency(result.economicImpact)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
