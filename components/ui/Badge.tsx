import { cn } from "@/lib/utils/cn";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "default" | "outline" | "accent";
  className?: string;
}

export function Badge({ children, variant = "default", className }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium",
        variant === "default" && "border border-line bg-paper text-body",
        variant === "outline" && "border border-line-strong text-muted",
        variant === "accent" && "border border-accent/25 bg-accent-soft text-accent",
        className
      )}
    >
      {children}
    </span>
  );
}