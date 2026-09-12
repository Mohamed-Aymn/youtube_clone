import Image from "next/image";
import Link from "next/link";
import type { Video } from "@/src/domain/entities/video";
import {
  formatDuration,
  formatRelativeTime,
  formatViewCount,
} from "@/src/presentation/lib/format";

type VideoCardProps = {
  video: Video;
  layout?: "grid" | "list";
};

export function VideoCard({ video, layout = "grid" }: VideoCardProps) {
  const duration = formatDuration(video.duration);
  const views = formatViewCount(video.viewCount);
  const published = formatRelativeTime(video.publishedAt);

  if (layout === "list") {
    return (
      <Link
        href={`/watch/${video.id}`}
        className="group flex gap-3 rounded-lg p-1 hover:bg-[var(--yt-hover)]"
      >
        <div className="relative aspect-video w-40 shrink-0 overflow-hidden rounded-lg bg-[var(--yt-surface)] sm:w-48">
          {video.thumbnail.url ? (
            <Image
              src={video.thumbnail.url}
              alt=""
              fill
              className="object-cover"
              sizes="192px"
            />
          ) : null}
          {duration ? (
            <span className="absolute bottom-1 right-1 rounded bg-black/80 px-1 text-[11px] font-medium text-white">
              {duration}
            </span>
          ) : null}
        </div>
        <div className="min-w-0 flex-1 py-0.5">
          <h3 className="line-clamp-2 text-sm font-medium leading-snug group-hover:text-[var(--yt-fg)]">
            {video.title}
          </h3>
          <p className="mt-1 text-xs text-[var(--yt-muted)]">{video.channelTitle}</p>
          <p className="text-xs text-[var(--yt-muted)]">
            {[views, published].filter(Boolean).join(" · ")}
          </p>
        </div>
      </Link>
    );
  }

  return (
    <article className="flex flex-col gap-2">
      <Link href={`/watch/${video.id}`} className="group block">
        <div className="relative aspect-video overflow-hidden rounded-xl bg-[var(--yt-surface)]">
          {video.thumbnail.url ? (
            <Image
              src={video.thumbnail.url}
              alt=""
              fill
              className="object-cover transition-transform duration-200 group-hover:scale-[1.02]"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            />
          ) : null}
          {duration ? (
            <span className="absolute bottom-1.5 right-1.5 rounded bg-black/80 px-1 text-xs font-medium text-white">
              {duration}
            </span>
          ) : null}
        </div>
      </Link>
      <div className="flex gap-3 px-0.5">
        <Link
          href={`/channel/${video.channelId}`}
          className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[var(--yt-surface)] text-xs font-semibold uppercase"
          aria-label={video.channelTitle}
        >
          {video.channelTitle.slice(0, 1)}
        </Link>
        <div className="min-w-0">
          <Link href={`/watch/${video.id}`}>
            <h3 className="line-clamp-2 text-sm font-medium leading-snug">
              {video.title}
            </h3>
          </Link>
          <Link
            href={`/channel/${video.channelId}`}
            className="mt-1 block text-xs text-[var(--yt-muted)] hover:text-[var(--yt-fg)]"
          >
            {video.channelTitle}
          </Link>
          <p className="text-xs text-[var(--yt-muted)]">
            {[views, published].filter(Boolean).join(" · ")}
          </p>
        </div>
      </div>
    </article>
  );
}
