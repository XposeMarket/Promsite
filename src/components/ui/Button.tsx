"use client";

import { type AnchorHTMLAttributes, type ButtonHTMLAttributes, forwardRef } from "react";
import Link from "next/link";

type Variant = "primary" | "secondary" | "ghost" | "outline";
type Size = "sm" | "md" | "lg";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  href?: string;
  className?: string;
  download?: AnchorHTMLAttributes<HTMLAnchorElement>["download"];
  rel?: AnchorHTMLAttributes<HTMLAnchorElement>["rel"];
  target?: AnchorHTMLAttributes<HTMLAnchorElement>["target"];
}

const base =
  "inline-flex items-center justify-center font-medium transition-all duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold disabled:opacity-50 disabled:pointer-events-none rounded-full tracking-wide";

const variants: Record<Variant, string> = {
  primary:
    "bg-gold text-[#050505] font-semibold border border-gold hover:bg-gold-light hover:border-gold-light active:bg-gold-dark",
  secondary:
    "bg-transparent text-foreground border border-gold/30 hover:bg-gold/[0.06] hover:border-gold/60",
  ghost: "text-muted hover:text-foreground",
  outline: "border border-gold/40 text-gold hover:bg-gold/10 hover:border-gold",
};

const sizes: Record<Size, string> = {
  sm: "px-4 py-2 text-sm",
  md: "px-6 py-3 text-base",
  lg: "px-8 py-4 text-lg",
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { variant = "primary", size = "md", href, className = "", children, download, rel, target, ...props },
    ref
  ) => {
    const classes = `${base} ${variants[variant]} ${sizes[size]} ${className}`;

    if (href) {
      if (href.startsWith("/api/") || download || target) {
        return (
          <a
            href={href}
            className={classes}
            download={download}
            rel={rel}
            target={target}
            onClick={props.onClick as AnchorHTMLAttributes<HTMLAnchorElement>["onClick"]}
          >
            {children}
          </a>
        );
      }

      return (
        <Link
          href={href}
          className={classes}
          onClick={props.onClick as AnchorHTMLAttributes<HTMLAnchorElement>["onClick"]}
        >
          {children}
        </Link>
      );
    }

    return (
      <button ref={ref} className={classes} {...props}>
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";
