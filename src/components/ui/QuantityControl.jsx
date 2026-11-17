import { FiMinus, FiPlus } from "react-icons/fi";

export default function QuantityControl({ quantity, onChange, className = "" }) {
  return (
    <div
      className={`inline-flex h-9 items-center rounded-lg border border-border bg-background ${className}`}
      aria-label="Product quantity"
    >
      <button
        type="button"
        aria-label="Decrease quantity"
        onClick={() => onChange(quantity - 1)}
        className="inline-flex cursor-pointer h-full w-9 items-center justify-center text-foreground transition-colors hover:bg-background-secondary"
      >
        <FiMinus size={14} aria-hidden="true" />
      </button>
      <span
        aria-live="polite"
        className="min-w-8  text-center text-sm font-medium text-foreground"
      >
        {quantity}
      </span>
      <button
        type="button"
        aria-label="Increase quantity"
        onClick={() => onChange(quantity + 1)}
        className="inline-flex cursor-pointer h-full w-9 items-center justify-center text-foreground transition-colors hover:bg-background-secondary"
      >
        <FiPlus size={14} aria-hidden="true" />
      </button>
    </div>
  );
}
