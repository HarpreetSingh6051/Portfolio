import { cn } from "@/lib/utils/cn";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "default" | "outline" | "cyan";
  className?: string;
}

export function Badge({ children, variant = "default", className }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium",
        variant === "default" && "bg-zinc-800 text-zinc-300",
        variant === "outline" && "border border-zinc-700 text-zinc-400",
        variant === "cyan" && "border border-cyan-500/30 bg-cyan-500/10 text-cyan-400",
        className
      )}
    >
      {children}
    </span>
  );
}
