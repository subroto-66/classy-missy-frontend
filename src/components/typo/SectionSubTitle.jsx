import { cn } from "../../lib/utlis";


export default function SectionSubTitle({ children, className }) {
  return (
    <p
      className={cn(
        "text-sm leading-tight text-foreground-secondary",
        className
      )}
    >
      {children}
    </p>
  );
}