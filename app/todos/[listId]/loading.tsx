import { LoadingSkeleton } from "@/app/ui/common";

export default async function Loading() {
  return (
    <div className="mx-4 pt-2 h-full overflow-hidden">
      <LoadingSkeleton count={15} />
    </div>
  );
}
