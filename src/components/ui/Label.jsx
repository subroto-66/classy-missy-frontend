import React from "react";
import { cn } from "../../lib/utlis";


const Label = React.forwardRef(
  ({ className, children, required = false, ...props }, ref) => {
    return (
      <label
        ref={ref}
        className={cn(
          "mb-1.5 block text-sm lg:text-base font-medium",
          className
        )}
        {...props}
      >
        {children}
        {required && <span className="ml-1 text-foreground">*</span>}
      </label>
    );
  }
);

Label.displayName = "Label";

export default Label;