import { useEffect, useRef, useState } from "react";
import { FiCheck, FiChevronDown } from "react-icons/fi";
import Button from "../ui/Button";

const defaultOptions = [
  { value: "featured", label: "Featured" },
  { value: "price-asc", label: "Price: low to high" },
  { value: "price-desc", label: "Price: high to low" },
  { value: "rating", label: "Top rated" },
  { value: "name", label: "Name: A to Z" },
];

export default function SortDropdown({
  value,
  onChange,
  options = defaultOptions,
  ariaLabel = "Sort products",
  optionsId = "product-sort-options",
}) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const selectedOption =
    options.find((option) => option.value === value) || options[0];

  useEffect(() => {
    if (!isOpen) return undefined;

    const handlePointerDown = (event) => {
      if (!dropdownRef.current?.contains(event.target)) setIsOpen(false);
    };
    const handleKeyDown = (event) => {
      if (event.key === "Escape") setIsOpen(false);
    };

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  return (
    <div ref={dropdownRef} className="relative">
      <button
        type="button"
        variant="outline"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-controls={optionsId}
        onClick={() => setIsOpen((open) => !open)}
        className="h-10 min-w-40 flex items-center justify-between gap-3 rounded-lg border border-border bg-background cursor-pointer  px-3 text-sm font-normal text-foreground"
      >
        <span className="truncate">{selectedOption.label}</span>
        <FiChevronDown
          size={16}
          aria-hidden="true"
          className={`shrink-0 text-foreground-secondary transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {isOpen && (
        <div
          id={optionsId}
          role="listbox"
          aria-label={ariaLabel}
          className="absolute right-0 top-full z-30 mt-2 w-52 overflow-hidden rounded-xl border border-border bg-dropdown-background p-1.5 shadow-custom"
        >
          {options.map((option) => {
            const isSelected = option.value === selectedOption.value;
            return (
              <Button
                key={option.value}
                type="button"
                variant="ghost"
                role="option"
                aria-selected={isSelected}
                onClick={() => {
                  onChange(option.value);
                  setIsOpen(false);
                }}
                className={`h-10 w-full justify-between rounded-lg px-3 text-left text-sm ${
                  isSelected
                    ? "bg-background-secondary font-semibold text-foreground"
                    : "font-normal text-foreground-secondary hover:bg-background-secondary hover:text-foreground"
                }`}
              >
                {option.label}
                {isSelected && <FiCheck size={16} aria-hidden="true" />}
              </Button>
            );
          })}
        </div>
      )}
    </div>
  );
}
