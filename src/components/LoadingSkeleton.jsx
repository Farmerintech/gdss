export default function LoadingSkeleton({ count = 6 }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: count }).map((_, index) => (
        <div key={index} className="soft-card h-72 animate-pulse overflow-hidden">
          <div className="h-48 bg-gray-200 dark:bg-white/10" />
          <div className="space-y-3 p-4">
            <div className="h-4 w-2/3 rounded-full bg-gray-200 dark:bg-white/10" />
            <div className="h-3 w-1/2 rounded-full bg-gray-200 dark:bg-white/10" />
          </div>
        </div>
      ))}
    </div>
  );
}
