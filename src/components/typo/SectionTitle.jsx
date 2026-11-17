import { cn } from "../../lib/utlis";


export default function SectionTitle({ children, className }) {
  return (
    <h2
      className={cn(
        "text-xl font-medium leading-tight md:text-2xl lg:text-3xl",
        className
      )}
    >
      {children}
    </h2>
  );
}