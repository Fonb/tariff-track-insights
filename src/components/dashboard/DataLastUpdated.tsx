
import { Clock } from "lucide-react";

type DataLastUpdatedProps = {
  timestamp: string;
};

export const DataLastUpdated = ({ timestamp }: DataLastUpdatedProps) => {
  return (
    <div className="flex items-center text-sm text-muted-foreground">
      <Clock size={14} className="mr-1" />
      <span>Data last updated: {timestamp}</span>
      <span className="ml-2 h-2 w-2 rounded-full bg-green-500 animate-pulse-slow" title="Data sync active"></span>
    </div>
  );
};
