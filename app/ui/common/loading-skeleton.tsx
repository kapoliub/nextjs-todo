import { Skeleton } from "@heroui/skeleton";

interface LoadingSkeletonProps {
  count?: number;
  gap?: number;
}

export default function LoadingSkeleton({
  count = 1,
  gap = 2,
}: LoadingSkeletonProps) {
  const skeletons = new Array(count).fill("");

  return (
    <div className={`w-full overflow-hidden flex flex-col pt-2 gap-${gap}`}>
      {skeletons.map((_, idx) => (
        <Skeleton
          key={idx}
          className={`mx-4 rounded-2xl shadow-sm bg-primary-100`}
        >
          <div className="h-14.5" />
        </Skeleton>
      ))}
    </div>
  );
}
