import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";

export type ButtonVariant =
  | "white"
  | "line"
  | "blue"
  | "ink"
  | "linedark"
  | "onbright";

const variantClass: Record<ButtonVariant, string> = {
  white: "btn-white",
  line: "btn-line",
  blue: "btn-blue",
  ink: "btn-ink",
  linedark: "btn-linedark",
  onbright: "btn-onbright",
};

interface SharedProps {
  variant?: ButtonVariant;
  size?: "default" | "sm";
  className?: string;
  children: ReactNode;
}

function classes({ variant = "white", size = "default", className = "" }: SharedProps) {
  return `btn ${variantClass[variant]} ${size === "sm" ? "btn-sm" : ""} ${className}`.trim();
}

type LinkProps = SharedProps &
  AnchorHTMLAttributes<HTMLAnchorElement> & { href: string };

/** The locked design's `.btn` primitive as a link — most CTAs navigate. */
export function ButtonLink({ variant, size, className, children, ...rest }: LinkProps) {
  return (
    <a className={classes({ variant, size, className, children })} {...rest}>
      {children}
    </a>
  );
}

type ButtonProps = SharedProps & ButtonHTMLAttributes<HTMLButtonElement>;

/** The locked design's `.btn` primitive as an actual button, for in-page actions. */
export function Button({ variant, size, className, children, type = "button", ...rest }: ButtonProps) {
  return (
    <button type={type} className={classes({ variant, size, className, children })} {...rest}>
      {children}
    </button>
  );
}
