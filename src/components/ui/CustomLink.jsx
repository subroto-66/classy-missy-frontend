import { Link } from "react-router";
import { cn } from "../../lib/utlis";



export default function CustomLink({ className, href, text }) {
  return (
    <Link to={href}>
      <span
        className={cn(
          "text-sm leading-tight underline text-primary font-medium",
          className
        )}
      >
        {text}
      </span>
    </Link>
  );
}
