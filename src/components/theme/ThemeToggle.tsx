
import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/providers/ThemeProvider";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      title={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
      className="border-input hover:bg-accent"
    >
      {theme === "light" ? (
        <Moon size={18} className="transition-all" />
      ) : (
        <Sun size={18} className="transition-all text-yellow-300" />
      )}
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
