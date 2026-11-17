
import { cn } from "../../lib/utlis";
import logo from "../../assets/default/logo.svg"
import { Link } from "react-router";


export default function Logo({
  size = "h-10 w-auto",
  className,
}) {
  return (
    <Link to="/" className={cn("inline-flex items-center", className)}>
      <img
        src={logo}
        alt="Logo"
        className={cn("object-contain", size)}
      />
    </Link>
  );
}