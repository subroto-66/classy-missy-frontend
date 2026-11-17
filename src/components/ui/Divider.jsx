

import { cn } from "../../lib/utlis";
import SectionSubTitle from "../typo/SectionSubTitle";

export default function Divider({ text, className }) {
  return (
    <div className={cn("flex w-full items-center gap-3", className)}>
      <div className="h-px flex-1 bg-border" />

      {text && (
        <>
          <SectionSubTitle>{text}</SectionSubTitle>

          <div className="h-px flex-1 bg-border" />
        </>
      )}
    </div>
  );
}
