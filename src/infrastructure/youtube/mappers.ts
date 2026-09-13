import type { Channel } from "@/src/domain/entities/channel";
import type { Video, VideoThumbnail } from "@/src/domain/entities/video";
import type {
  YoutubeChannelResource,
  YoutubeSearchResource,
  YoutubeThumbnailSet,
  YoutubeVideoResource,
} from "./client";

function pickThumbnail(thumbnails: YoutubeThumbnailSet): VideoThumbnail {
  const chosen =
    thumbnails.medium ??
    thumbnails.high ??
    thumbnails.standard ??
    thumbnails.default ??
    thumbnails.maxres;

  return {
    url: chosen?.url ?? "",
    width: chosen?.width ?? 320,
    height: chosen?.height ?? 180,
  };
}

function pickBestUrl(thumbnails: YoutubeThumbnailSet): string {
  return (
    thumbnails.high?.url ??
    thumbnails.medium?.url ??
    thumbnails.default?.url ??
    ""
  );
}

export function mapVideoResource(item: YoutubeVideoResource): Video {
  return {
    id: item.id,
    title: item.snippet.title,
    description: item.snippet.description,
    channelId: item.snippet.channelId,
    channelTitle: item.snippet.channelTitle,
    publishedAt: item.snippet.publishedAt,
    thumbnail: pickThumbnail(item.snippet.thumbnails),
    duration: item.contentDetails?.duration,
    viewCount: item.statistics?.viewCount
      ? Number(item.statistics.viewCount)
      : undefined,
    likeCount: item.statistics?.likeCount
      ? Number(item.statistics.likeCount)
      : undefined,
  };
}

export function mapSearchResourceToPartialVideo(
  item: YoutubeSearchResource,
): Pick<Video, "id" | "title" | "description" | "channelId" | "channelTitle" | "publishedAt" | "thumbnail"> | null {
  if (!item.id.videoId) return null;

  return {
    id: item.id.videoId,
    title: item.snippet.title,
    description: item.snippet.description,
    channelId: item.snippet.channelId,
    channelTitle: item.snippet.channelTitle,
    publishedAt: item.snippet.publishedAt,
    thumbnail: pickThumbnail(item.snippet.thumbnails),
  };
}

export function mapChannelResource(item: YoutubeChannelResource): Channel {
  return {
    id: item.id,
    title: item.snippet.title,
    description: item.snippet.description,
    customUrl: item.snippet.customUrl,
    thumbnailUrl: pickBestUrl(item.snippet.thumbnails),
    bannerUrl: item.brandingSettings?.image?.bannerExternalUrl,
    subscriberCount: item.statistics?.subscriberCount
      ? Number(item.statistics.subscriberCount)
      : undefined,
    videoCount: item.statistics?.videoCount
      ? Number(item.statistics.videoCount)
      : undefined,
  };
}
