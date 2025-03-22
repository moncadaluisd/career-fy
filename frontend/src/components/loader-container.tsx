import CircularLoader from "./circular-loading";
import { cn } from "@/lib/utils";
export function LoaderContainer({ className }: { className?: string }) {
  return (
    <div className={cn("flex justify-center items-center", className)}>
      <CircularLoader />
    </div>
  );
}
