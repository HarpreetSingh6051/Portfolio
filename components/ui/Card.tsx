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
        "rounded-xl border border-line bg-paper p-6 shadow-[0_1px_2px_rgba(28,24,19,0.04)]",
        hover &&
          "transition-all duration-300 hover:-translate-y-0.5 hover:border-line-strong hover:shadow-[0_10px_28px_-14px_rgba(28,24,19,0.18)]",
        className
      )}
    >
      {children}
    </div>
  );
}