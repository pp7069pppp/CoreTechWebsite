import { Moon, Sun, Palette } from "lucide-react";
import { useTheme } from "./ui/theme-provider";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Button } from "./ui/button";

const themeOptions = [
  { label: "Light", value: "light", icon: Sun },
  { label: "Dark", value: "dark", icon: Moon },
  { label: "Blue", value: "blue", icon: Palette },
  { label: "Purple", value: "purple", icon: Palette },
  { label: "Green", value: "green", icon: Palette },
  { label: "Amber", value: "amber", icon: Palette },
  { label: "Teal", value: "teal", icon: Palette },
  { label: "Rose", value: "rose", icon: Palette },
];

export function ThemeSelector() {
  const { theme, setTheme } = useTheme();

  const CurrentIcon = themeOptions.find((opt) => opt.value === theme)?.icon || Sun;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="h-9 w-9">
          <CurrentIcon className="h-4 w-4" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {themeOptions.map((option) => {
          const Icon = option.icon;
          return (
            <DropdownMenuItem
              key={option.value}
              onClick={() => setTheme(option.value as any)}
              className="flex items-center gap-2"
            >
              <Icon className="h-4 w-4" />
              <span>{option.label}</span>
              {theme === option.value && (
                <span className="ml-auto">✓</span>
              )}
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
} 