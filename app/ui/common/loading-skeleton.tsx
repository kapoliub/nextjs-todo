import { Skeleton } from "@heroui/skeleton";

interface LoadingSkeletonProps {
  height?: number;
  count?: number;
  gap?: number;
}

export default function LoadingSkeleton({
  height = 14.5,
  count = 1,
  gap = 2,
}: LoadingSkeletonProps) {
  const skeletons = new Array(count).fill("");

  return (
    <div className={`w-full overflow-hidden flex flex-col gap-${gap}`}>
      {skeletons.map((_, idx) => (
        <Skeleton key={idx} className={`h-${height} rounded-lg`} />
      ))}
    </div>
  );
}
