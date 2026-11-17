import { formatProductPrice } from "../../lib/productUtils";

export default function PriceRangeSlider({
  min,
  max,
  minValue,
  maxValue,
  onChange,
}) {
  const range = max - min;
  const left = range ? ((minValue - min) / range) * 100 : 0;
  const right = range ? ((maxValue - min) / range) * 100 : 100;

  return (
    <div className="px-1">
      <div className="relative my-5 h-5">
        <div className="absolute top-2 h-1.5 w-full rounded-full bg-background-custom" />
        <div
          className="absolute top-2 h-1.5 rounded-full bg-primary"
          style={{ left: `${left}%`, right: `${100 - right}%` }}
        />
        <input
          type="range"
          min={min}
          max={max}
          step="50"
          value={minValue}
          aria-label="Minimum price"
          onChange={(event) =>
            onChange(
              Math.min(Number(event.target.value), maxValue - 50),
              maxValue,
            )
          }
          className="price-range-thumb absolute inset-0 z-20 h-5 w-full cursor-pointer appearance-none bg-transparent"
        />
        <input
          type="range"
          min={min}
          max={max}
          step="50"
          value={maxValue}
          aria-label="Maximum price"
          onChange={(event) =>
            onChange(minValue, Math.max(Number(event.target.value), minValue + 50))
          }
          className="price-range-thumb absolute inset-0 z-10 h-5 w-full cursor-pointer appearance-none bg-transparent"
        />
      </div>
      <div className="flex items-center justify-between text-xs font-medium text-foreground">
        <span>{formatProductPrice(minValue)}</span>
        <span>{formatProductPrice(maxValue)}</span>
      </div>
    </div>
  );
}
