import Image from "next/image";
import Link from "next/link";
import type { Channel } from "@/src/domain/entities/channel";
import type { Video } from "@/src/domain/entities/video";
import {
  formatRelativeTime,
  formatSubscriberCount,
  formatViewCount,
} from "@/src/presentation/lib/format";

type VideoMetaProps = {
  video: Video;
  channel: Channel | null;
};

export function VideoMeta({ video, channel }: VideoMetaProps) {
  const views = formatViewCount(video.viewCount);
  const published = formatRelativeTime(video.publishedAt);
  const subscribers = formatSubscriberCount(channel?.subscriberCount);

  return (
    <div className="mt-3 flex flex-col gap-3">
      <h1 className="text-xl font-semibold leading-snug">{video.title}</h1>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex min-w-0 items-center gap-3">
          <Link
            href={`/channel/${video.channelId}`}
            className="relative h-10 w-10 shrink-0 overflow-hidden rounded-full bg-[var(--yt-surface)]"
          >
            {channel?.thumbnailUrl ? (
              <Image
                src={channel.thumbnailUrl}
                alt=""
                fill
                className="object-cover"
                sizes="40px"
              />
            ) : (
              <span className="flex h-full w-full items-center justify-center text-sm font-semibold">
                {video.channelTitle.slice(0, 1)}
              </span>
            )}
          </Link>
          <div className="min-w-0">
            <Link
              href={`/channel/${video.channelId}`}
              className="block truncate text-sm font-medium hover:text-[var(--yt-fg)]"
            >
              {video.channelTitle}
            </Link>
            {subscribers ? (
              <p className="text-xs text-[var(--yt-muted)]">{subscribers}</p>
            ) : null}
          </div>
        </div>
        <p className="text-sm text-[var(--yt-muted)]">
          {[views, published].filter(Boolean).join(" · ")}
        </p>
      </div>
      {video.description ? (
        <div className="rounded-xl bg-[var(--yt-surface)] p-3 text-sm whitespace-pre-wrap">
          <p className="line-clamp-4 text-[var(--yt-fg)]">{video.description}</p>
        </div>
      ) : null}
    </div>
  );
}
