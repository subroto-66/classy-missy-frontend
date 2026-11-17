

import { LuLoaderCircle } from "react-icons/lu";
import { cn } from "../../lib/utlis";

const variantClasses = {
  primary: "bg-primary text-primary-foreground hover:bg-primary/90",
  secondary: "bg-secondary text-background hover:bg-secondary/90",
  outline:
    "border border-primary bg-transparent text-primary hover:text-primary-foreground hover:bg-primary",
  ghost: "bg-transparent text-foreground hover:bg-background-custom",
  danger: "bg-red-700 text-white hover:bg-red-500",
};

const sizeClasses = {
  sm: "py-2 px-3 text-sm",
  md: "py-2.5 px-3 md:px-4 text-sm",
  lg: "py-3 px-6 text-base",
};

export default function Button({
  variant = "primary",
  size = "md",
  loading = false,
  loadingText,
  disabled = false,
  className = "",
  children,
  ...props
}) {
  return (
    <button
      disabled={disabled || loading}
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded  transition-colors cursor-pointer",
        "disabled:cursor-not-allowed disabled:opacity-50",
        variantClasses[variant],
        sizeClasses[size],
        className
      )}
      {...props}
    >
      {loading && <LuLoaderCircle className="animate-spin" />}
      {loading ? loadingText || children : children}
    </button>
  );
}
