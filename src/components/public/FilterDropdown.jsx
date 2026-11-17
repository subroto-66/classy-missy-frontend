import { useState } from "react";
import { FiChevronDown } from "react-icons/fi";
import Button from "../ui/Button";

export default function FilterDropdown({
  title,
  options,
  selectedValues,
  onToggle,
}) {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="border-b border-border py-3 last:border-0">
      <Button
        type="button"
        variant="ghost"
        aria-expanded={isOpen}
        onClick={() => setIsOpen((open) => !open)}
        className="flex w-full justify-between px-0 py-2 text-sm font-semibold text-foreground hover:bg-transparent"
      >
        {title}
        <FiChevronDown
          size={16}
          aria-hidden="true"
          className={`text-foreground-secondary transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </Button>
      {isOpen && (
        <div className="space-y-3 pb-2 pt-2">
          {options.map(({ value, count, label = value }) => (
            <label
              key={value}
              className="flex cursor-pointer items-center justify-between gap-3 text-sm text-foreground-secondary"
            >
              <span className="flex min-w-0 items-center gap-2">
                <input
                  type="checkbox"
                  checked={selectedValues.includes(value)}
                  onChange={() => onToggle(value)}
                  className="h-4 w-4 shrink-0 cursor-pointer accent-primary"
                />
                <span>{label}</span>
              </span>
              <span className="text-xs tabular-nums">{count}</span>
            </label>
          ))}
        </div>
      )}
    </div>
  );
}
