import Link from "next/link";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils/cn";
import { Magnetic } from "@/components/ui/Magnetic";

interface ButtonProps {
  children: ReactNode;
  href?: string;
  variant?: "primary" | "secondary" | "ghost";
  external?: boolean;
  className?: string;
  onClick?: () => void;
  type?: "button" | "submit";
  /** Disable interaction (e.g. while a form request is in flight). */
  disabled?: boolean;
  /** Gently pull the button toward the pointer (mouse only). */
  magnetic?: boolean;
}

export function Button({
  children,
  href,
  variant = "primary",
  external = false,
  className,
  onClick,
  type = "button",
  disabled = false,
  magnetic = false,
}: ButtonProps) {
  const classes = cn(
    "group inline-flex items-center justify-center gap-2 rounded-lg px-5 py-2.5 text-sm font-medium transition-all duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-400 disabled:cursor-not-allowed disabled:opacity-60",
    variant === "primary" &&
      "bg-cyan-500 text-zinc-950 shadow-lg shadow-cyan-500/20 hover:bg-cyan-400 active:bg-cyan-600",
    variant === "secondary" &&
      "border border-zinc-700 bg-zinc-900/70 text-zinc-200 hover:border-zinc-500 hover:bg-zinc-800",
    variant === "ghost" && "text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/50",
    className
  );

  let element: ReactNode;
  if (href) {
    element = external ? (
      <a href={href} target="_blank" rel="noopener noreferrer" className={classes}>
        {children}
      </a>
    ) : (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  } else {
    element = (
      <button
        type={type}
        onClick={onClick}
        disabled={disabled}
        aria-busy={disabled || undefined}
        className={classes}
      >
        {children}
      </button>
    );
  }

  if (magnetic) {
    return <Magnetic>{element}</Magnetic>;
  }

  return element;
}
