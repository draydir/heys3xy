"use client";

import { Monitor, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const themes = [
  { value: "light", icon: Sun, label: "Light" },
  { value: "dark", icon: Moon, label: "Dark" },
  { value: "system", icon: Monitor, label: "System" },
] as const;

type ThemeValue = (typeof themes)[number]["value"];

export const ThemeToggle = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    queueMicrotask(() => setMounted(true));
  }, []);

  if (!mounted) {
    return (
      <div
        className="h-9 w-[6.75rem] rounded-full border border-border/40 bg-muted/20 sm:h-7 sm:w-[5.25rem]"
        aria-hidden
      />
    );
  }

  const active = (themes.some((t) => t.value === theme) ? theme : "system") as ThemeValue;

  return (
    <div
      className="inline-flex items-center gap-0.5 rounded-full border border-border/50 bg-muted/25 p-0.5 backdrop-blur-sm"
      role="group"
      aria-label="Color theme"
    >
      {themes.map(({ value, icon: Icon, label }) => {
        const isActive = active === value;
        return (
          <Button
            key={value}
            type="button"
            variant="ghost"
            size="icon-xs"
            className={cn(
              "size-8 rounded-full text-muted-foreground hover:text-foreground sm:size-6",
              isActive && "bg-background text-foreground shadow-sm",
            )}
            onClick={() => setTheme(value)}
            aria-label={label}
            aria-pressed={isActive}
          >
            <Icon className="size-3.5" />
          </Button>
        );
      })}
    </div>
  );
};
