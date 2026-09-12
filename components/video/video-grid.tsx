import type { Video } from "@/src/domain/entities/video";
import { VideoCard } from "./video-card";

type VideoGridProps = {
  videos: Video[];
};

export function VideoGrid({ videos }: VideoGridProps) {
  if (videos.length === 0) {
    return (
      <p className="py-16 text-center text-[var(--yt-muted)]">No videos found.</p>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {videos.map((video) => (
        <VideoCard key={video.id} video={video} />
      ))}
    </div>
  );
}
