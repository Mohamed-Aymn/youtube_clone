import Image from "next/image";
import type { Channel } from "@/src/domain/entities/channel";
import {
  formatSubscriberCount,
} from "@/src/presentation/lib/format";

type ChannelHeaderProps = {
  channel: Channel;
};

export function ChannelHeader({ channel }: ChannelHeaderProps) {
  const subscribers = formatSubscriberCount(channel.subscriberCount);
  const videoCount =
    channel.videoCount !== undefined
      ? `${channel.videoCount.toLocaleString()} videos`
      : null;

  return (
    <div className="mb-6">
      {channel.bannerUrl ? (
        <div className="relative mb-4 h-28 w-full overflow-hidden rounded-xl sm:h-40">
          <Image
            src={channel.bannerUrl}
            alt=""
            fill
            className="object-cover"
            sizes="100vw"
            priority
          />
        </div>
      ) : null}

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
        <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-full bg-[var(--yt-surface)] sm:h-28 sm:w-28">
          {channel.thumbnailUrl ? (
            <Image
              src={channel.thumbnailUrl}
              alt=""
              fill
              className="object-cover"
              sizes="112px"
            />
          ) : null}
        </div>
        <div className="min-w-0">
          <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
            {channel.title}
          </h1>
          <p className="mt-1 text-sm text-[var(--yt-muted)]">
            {[channel.customUrl, subscribers, videoCount]
              .filter(Boolean)
              .join(" · ")}
          </p>
          {channel.description ? (
            <p className="mt-2 line-clamp-2 max-w-2xl text-sm text-[var(--yt-muted)]">
              {channel.description}
            </p>
          ) : null}
        </div>
      </div>
    </div>
  );
}
