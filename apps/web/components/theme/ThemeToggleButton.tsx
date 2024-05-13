import { useTheme } from "next-themes";
import { Sun, Moon } from "lucide-react";
import { Button } from "../ui/button";

export default function ThemeToggleButton() {
  const { theme, setTheme } = useTheme();
  const Icon = theme === "dark" ? Sun : Moon;
  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };
  return (
    <Button variant="ghost" size="icon" onClick={toggleTheme}>
      <Icon className="h-4 w-4" />
    </Button>
  );
}
