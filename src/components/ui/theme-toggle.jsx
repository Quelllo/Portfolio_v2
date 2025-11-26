import { Moon, Sun } from "lucide-react";
import { cn } from "@/lib/utils";
import { useTheme } from "@/contexts/ThemeContext";

export function ThemeToggle({ className }) {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  return (
    <button
      className={cn(
        "flex items-center justify-center w-10 h-10 border-2 transition-all duration-300 cursor-pointer hover:scale-110 active:scale-95",
        isDark 
          ? "bg-black-true border-cream hover:border-orange hover:bg-orange" 
          : "bg-cream border-black-true hover:border-orange hover:bg-orange",
        className
      )}
      onClick={toggleTheme}
      role="button"
      tabIndex={0}
      aria-label="Toggle theme"
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          toggleTheme();
        }
      }}
    >
      {isDark ? (
        <Moon 
          className="w-5 h-5 text-cream" 
          strokeWidth={2}
        />
      ) : (
        <Sun 
          className="w-5 h-5 text-black-true" 
          strokeWidth={2}
        />
      )}
    </button>
  );
}

