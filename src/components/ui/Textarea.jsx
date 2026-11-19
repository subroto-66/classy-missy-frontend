import React from "react";
import Label from "./Label";
import { cn } from "../../lib/utlis";

const Textarea = React.forwardRef(
  (
    {
      className,
      outline = true,
      border = true,
      label = "",
      disabled,
      required = false,
      rows = 3,
      error,
      ...props
    },
    ref
  ) => {
    return (
      <div className="w-full">
        {label && <Label required={required}>{label}</Label>}

        <div className="relative w-full">
          <textarea
            ref={ref}
            rows={rows}
            disabled={disabled}
            required={required}
            className={cn(
              "w-full resize-y rounded-md bg-input-background px-3 py-2.5 text-sm text-input-text",
              "placeholder:text-input-placeholder",
              "transition-all duration-200",
              border &&
                "border border-input-border focus:border-input-active-border",
              !border && "border-none",
              outline &&
                "focus:outline-none focus:ring-2 focus:ring-input-active-ring",
              !outline && "focus:outline-none focus:ring-0",
              disabled &&
                "cursor-not-allowed bg-input-disabled-background opacity-60",
              className
            )}
            {...props}
          />
        </div>

        {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
      </div>
    );
  }
);

Textarea.displayName = "Textarea";

export default Textarea;
