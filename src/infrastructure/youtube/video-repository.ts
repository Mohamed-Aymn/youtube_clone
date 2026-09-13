import type { Video } from "@/src/domain/entities/video";
import type { VideoRepository } from "@/src/domain/repositories/video-repository";
import {
  youtubeGet,
  type YoutubeListResponse,
  type YoutubeSearchResource,
  type YoutubeVideoResource,
} from "./client";
import { mapSearchResourceToPartialVideo, mapVideoResource } from "./mappers";

async function hydrateVideos(ids: string[]): Promise<Video[]> {
  if (ids.length === 0) return [];

  const data = await youtubeGet<YoutubeListResponse<YoutubeVideoResource>>(
    "videos",
    {
      part: "snippet,contentDetails,statistics",
      id: ids.join(","),
      maxResults: ids.length,
    },
  );

  return (data.items ?? []).map(mapVideoResource);
}

export function createYoutubeVideoRepository(): VideoRepository {
  return {
    async getPopular(regionCode = "US", maxResults = 24): Promise<Video[]> {
      const data = await youtubeGet<YoutubeListResponse<YoutubeVideoResource>>(
        "videos",
        {
          part: "snippet,contentDetails,statistics",
          chart: "mostPopular",
          regionCode,
          maxResults,
        },
      );
      return (data.items ?? []).map(mapVideoResource);
    },

    async getById(id: string): Promise<Video | null> {
      const videos = await this.getByIds([id]);
      return videos[0] ?? null;
    },

    async getByIds(ids: string[]): Promise<Video[]> {
      return hydrateVideos(ids);
    },

    async search(query: string, maxResults = 24): Promise<Video[]> {
      const data = await youtubeGet<YoutubeListResponse<YoutubeSearchResource>>(
        "search",
        {
          part: "snippet",
          type: "video",
          q: query,
          maxResults,
        },
      );

      const partials = (data.items ?? [])
        .map(mapSearchResourceToPartialVideo)
        .filter((v): v is NonNullable<typeof v> => v !== null);

      const hydrated = await hydrateVideos(partials.map((v) => v.id));
      const byId = new Map(hydrated.map((v) => [v.id, v]));

      return partials.map((partial) => byId.get(partial.id) ?? partial);
    },

    async searchRelated(
      title: string,
      excludeId: string,
      maxResults = 16,
    ): Promise<Video[]> {
      const keywords = title
        .replace(/[^\p{L}\p{N}\s]/gu, " ")
        .split(/\s+/)
        .filter(Boolean)
        .slice(0, 6)
        .join(" ");

      const results = await this.search(keywords || title, maxResults + 4);
      return results.filter((v) => v.id !== excludeId).slice(0, maxResults);
    },

    async getByChannelId(
      channelId: string,
      maxResults = 24,
    ): Promise<Video[]> {
      const data = await youtubeGet<YoutubeListResponse<YoutubeSearchResource>>(
        "search",
        {
          part: "snippet",
          type: "video",
          channelId,
          order: "date",
          maxResults,
        },
      );

      const ids = (data.items ?? [])
        .map((item) => item.id.videoId)
        .filter((id): id is string => Boolean(id));

      return hydrateVideos(ids);
    },
  };
}
