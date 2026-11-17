import { cn } from "../../lib/utlis";
import SectionSubTitle from "../typo/SectionSubTitle";
import SectionTitle from "../typo/SectionTitle";



export default function SectionHeading({ className, title, subTitle }) {
  return (
    <div className={cn("flex flex-col space-y-2", className)}>
      <SectionTitle>{title}</SectionTitle>
      <SectionSubTitle>{subTitle}</SectionSubTitle>
    </div>
  );
}
