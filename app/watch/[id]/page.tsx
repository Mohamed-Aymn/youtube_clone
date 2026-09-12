import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { VideoCard } from "@/components/video/video-card";
import { VideoMeta } from "@/components/video/video-meta";
import { VideoPlayer } from "@/components/video/video-player";
import type { Channel } from "@/src/domain/entities/channel";
import type { Video } from "@/src/domain/entities/video";
import { AppError } from "@/src/domain/errors";
import { getContainer } from "@/src/infrastructure/di/container";

type WatchPageProps = PageProps<"/watch/[id]">;

export async function generateMetadata({
  params,
}: WatchPageProps): Promise<Metadata> {
  const { id } = await params;
  try {
    const { getVideo } = getContainer();
    const { video } = await getVideo(id);
    return { title: video.title };
  } catch {
    return { title: "Watch" };
  }
}

export default async function WatchPage({ params }: WatchPageProps) {
  const { id } = await params;
  const { getVideo, getRelatedVideos } = getContainer();

  let video: Video | null = null;
  let channel: Channel | null = null;
  let related: Video[] = [];

  try {
    const details = await getVideo(id);
    video = details.video;
    channel = details.channel;
    related = await getRelatedVideos(video.title, video.id);
  } catch (error) {
    if (error instanceof AppError && error.code === "NOT_FOUND") {
      notFound();
    }
    throw error;
  }

  if (!video) {
    notFound();
  }

  return (
    <div className="mx-auto flex max-w-[1400px] flex-col gap-6 lg:flex-row">
      <div className="min-w-0 flex-1">
        <VideoPlayer
          videoId={video.id}
          title={video.title}
          thumbnailUrl={video.thumbnail.url}
        />
        <VideoMeta video={video} channel={channel} />
      </div>
      <aside className="flex w-full shrink-0 flex-col gap-2 lg:w-[402px]">
        <h2 className="sr-only">Related videos</h2>
        {related.map((item) => (
          <VideoCard key={item.id} video={item} layout="list" />
        ))}
      </aside>
    </div>
  );
}
