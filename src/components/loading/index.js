import { Skeleton } from "@/components/ui/skeleton";

export function Loading() {
  return (
    <div className="flex flex-col items-center justify-center space-y-6 p-8 bg-gray-50 min-h-full">
      <div className="flex items-center space-x-6 animate-pulse">
        <Skeleton className="h-16 w-16 rounded-full bg-gradient-to-r from-gray-300 to-gray-200" />

        <div className="space-y-3">
          <Skeleton className="h-5 w-[280px] rounded-md bg-gradient-to-r from-gray-300 to-gray-200" />
          <Skeleton className="h-4 w-[240px] rounded-md bg-gradient-to-r from-gray-300 to-gray-200" />
        </div>
      </div>

      <div className="text-gray-500 text-lg font-semibold animate-pulse">
        Loading...
      </div>
    </div>
  );
}
