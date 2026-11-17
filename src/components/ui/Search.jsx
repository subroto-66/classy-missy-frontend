
import React, { useEffect, useState } from "react";
import { IoSearchOutline } from "react-icons/io5";

import Label from "./Label";
import Button from "./Button";
import { cn } from "../../lib/utlis";

const Search = React.forwardRef(
  (
    { 
      className,
      inputClassName,
      wrapperClassName,
      outline = true,
      border = true,
      label = "",
      disabled = false,
      showButton = false,
      onSearch,
      value,
      onChange,
      buttonText = "Search",
      loading = false,
      placeholder = "Search...",
      ...props
    },
    ref
  ) => {
    const [searchValue, setSearchValue] = useState(value ?? "");

    useEffect(() => {
      if (value !== undefined) {
        setSearchValue(value);
      }
    }, [value]);

    const handleChange = (e) => {
      const newValue = e.target.value;

      setSearchValue(newValue);
      onChange?.(newValue);
    };

    const handleSearch = () => {
      onSearch?.(searchValue);
    };

    const handleKeyUp = (e) => {
      props.onKeyUp?.(e);

      if (!showButton) {
        onSearch?.(searchValue);
      }

      if (showButton && e.key === "Enter") {
        handleSearch();
      }
    };

    return (
      <div className={cn("max-w-md", wrapperClassName)}>
        {label && <Label>{label}</Label>}

        <div className="flex w-full items-center gap-2">
          {/* Search Input */}
          <div
            className={cn(
              "relative flex h-11 w-full items-center rounded-md",
              border &&
                "border border-input-border bg-input-background focus-within:border-input-active-border",
              !border && "border-none",
              outline &&
                "focus-within:outline-none focus-within:ring-2 focus-within:ring-input-active-ring",
              !outline && "focus-within:outline-none focus-within:ring-0",
              disabled &&
                "cursor-not-allowed bg-input-disabled-background opacity-60",
                className
            )}
          >
            <IoSearchOutline
              size={18}
              className="ml-3 shrink-0 text-input-icon"
            />

            <input
              ref={ref}
              type="text"
              value={searchValue}
              disabled={disabled}
              placeholder={placeholder}
              onChange={handleChange}
              onKeyUp={handleKeyUp}
              className={cn(
                "h-full w-full bg-transparent px-3 text-sm",
                "placeholder:text-input-placeholder",
                "outline-none",
                "disabled:cursor-not-allowed",
                inputClassName
              )}
              {...props}
            />
          </div>

          {/* Search Button */}
          {showButton && (
            <Button
              type="button"
              onClick={handleSearch}
              disabled={disabled || loading}
              loading={loading}
            >
              {buttonText}
            </Button>
          )}
        </div>
      </div>
    );
  }
);

Search.displayName = "SearchInput";

export default Search;
