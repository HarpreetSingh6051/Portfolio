import type { ReactNode } from "react";
import { cn } from "@/lib/utils/cn";

interface CardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
}

export function Card({ children, className, hover = false }: CardProps) {
  return (
    <div
      className={cn(
        "rounded-xl border border-zinc-800 bg-zinc-900/60 p-6 backdrop-blur-sm",
        hover &&
          "transition-all duration-300 hover:border-zinc-600 hover:bg-zinc-900/80 hover:shadow-lg hover:shadow-zinc-900/50",
        className
      )}
    >
      {children}
    </div>
  );
}
