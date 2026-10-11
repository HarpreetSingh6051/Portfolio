"use client";

import { Monitor, Moon, Sun, Sparkles } from "lucide-react";
import { useThemeValue } from "@/components/providers/ThemeProvider";
import { MODE_ORDER, setEffects, setMode, type ThemeMode } from "@/lib/theme";
import { cn } from "@/lib/utils/cn";

const MODE_META: Record<ThemeMode, { label: string; icon: typeof Sun; hint: string }> = {
  light: { label: "Light", icon: Sun, hint: "Warm editorial light" },
  dark: { label: "Dark", icon: Moon, hint: "Immersive dark" },
  system: { label: "System", icon: Monitor, hint: "Follow device" },
};

interface ThemeToggleProps {
  className?: string;
  /** Compact variant for the navbar: icons only. */
  compact?: boolean;
}

export function ThemeToggle({ className, compact = false }: ThemeToggleProps) {
  const { mode, effects } = useThemeValue();
  const activeIndex = MODE_ORDER.indexOf(mode);

  function handleKeyDown(event: React.KeyboardEvent<HTMLDivElement>) {
    const keys: Record<string, number> = {
      ArrowRight: 1,
      ArrowDown: 1,
      ArrowLeft: -1,
      ArrowUp: -1,
    };
    const delta = keys[event.key];
    if (!delta) return;
    event.preventDefault();
    const next = MODE_ORDER[(activeIndex + delta + MODE_ORDER.length) % MODE_ORDER.length];
    setMode(next);
  }

  return (
    <div className={cn("flex items-center gap-2", className)}>
      <div
        role="radiogroup"
        aria-label="Appearance"
        onKeyDown={handleKeyDown}
        className={cn(
          "inline-flex items-center gap-0.5 rounded-lg border border-line bg-paper p-0.5",
          "shadow-[var(--shadow-panel)]"
        )}
      >
        {MODE_ORDER.map((option) => {
          const { label, icon: Icon } = MODE_META[option];
          const selected = option === mode;
          return (
            <button
              key={option}
              type="button"
              role="radio"
              aria-checked={selected}
              aria-label={label}
              title={`${label} — ${MODE_META[option].hint}`}
              tabIndex={selected ? 0 : -1}
              onClick={() => setMode(option)}
              className={cn(
                "relative flex items-center gap-1.5 rounded-md px-2 py-1.5 text-xs font-medium transition-colors",
                "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent",
                selected ? "text-canvas" : "text-muted hover:text-ink"
              )}
            >
              {selected && (
                <span
                  aria-hidden="true"
                  className="absolute inset-0 rounded-md bg-ink transition-colors"
                />
              )}
              <Icon className="relative z-10 h-3.5 w-3.5" aria-hidden="true" />
              {!compact && <span className="relative z-10 hidden sm:inline">{label}</span>}
            </button>
          );
        })}
      </div>

      <button
        type="button"
        role="switch"
        aria-checked={effects}
        aria-label="Ambient motion"
        title={effects ? "Ambient motion: on" : "Ambient motion: off"}
        onClick={() => setEffects(!effects)}
        className={cn(
          "inline-flex items-center gap-1.5 rounded-lg border border-line bg-paper px-2 py-1.5 text-xs font-medium shadow-[var(--shadow-panel)] transition-colors",
          "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent",
          effects ? "text-ink" : "text-muted"
        )}
      >
        <Sparkles className={cn("h-3.5 w-3.5", effects && "text-accent")} aria-hidden="true" />
        {!compact && <span className="hidden lg:inline">Motion</span>}
      </button>
    </div>
  );
}
