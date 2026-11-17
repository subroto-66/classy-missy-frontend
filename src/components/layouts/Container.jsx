import { cn } from "../../lib/utlis";


export default function Container({className,children}) {
  return (
    <div
      className={cn(
        "w-full max-w-full  mx-auto px-4",
        "md:max-w-3xl md:px-6",
        "lg:max-w-7xl lg:px-8",
        className
      )}
    >
      {children}
    </div>
  );
}