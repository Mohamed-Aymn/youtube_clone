export default function Loading() {
  return (
    <div className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {Array.from({ length: 8 }).map((_, index) => (
        <div key={index} className="animate-pulse">
          <div className="aspect-video rounded-xl bg-[var(--yt-surface)]" />
          <div className="mt-3 flex gap-3">
            <div className="h-9 w-9 rounded-full bg-[var(--yt-surface)]" />
            <div className="flex-1 space-y-2">
              <div className="h-4 w-[80%] rounded bg-[var(--yt-surface)]" />
              <div className="h-3 w-[40%] rounded bg-[var(--yt-surface)]" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
