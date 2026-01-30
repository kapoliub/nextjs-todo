import { LoadingSkeleton } from "@/app/ui/common";

export default async function Loading() {
  return (
    <div className="h-full overflow-hidden">
      <LoadingSkeleton count={15} />
    </div>
  );
}
