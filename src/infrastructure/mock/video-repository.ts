import type { Video } from "@/src/domain/entities/video";
import type { VideoRepository } from "@/src/domain/repositories/video-repository";
import { mockVideos } from "./data";

function matchesQuery(video: Video, query: string): boolean {
  const q = query.toLowerCase();
  return (
    video.title.toLowerCase().includes(q) ||
    video.description.toLowerCase().includes(q) ||
    video.channelTitle.toLowerCase().includes(q)
  );
}

export function createMockVideoRepository(): VideoRepository {
  return {
    async getPopular(regionCode = "US", maxResults = 24): Promise<Video[]> {
      void regionCode;
      return [...mockVideos]
        .sort((a, b) => (b.viewCount ?? 0) - (a.viewCount ?? 0))
        .slice(0, maxResults);
    },

    async getById(id: string): Promise<Video | null> {
      return mockVideos.find((video) => video.id === id) ?? null;
    },

    async getByIds(ids: string[]): Promise<Video[]> {
      const idSet = new Set(ids);
      return mockVideos.filter((video) => idSet.has(video.id));
    },

    async search(query: string, maxResults = 24): Promise<Video[]> {
      return mockVideos
        .filter((video) => matchesQuery(video, query))
        .slice(0, maxResults);
    },

    async searchRelated(
      title: string,
      excludeId: string,
      maxResults = 16,
    ): Promise<Video[]> {
      const keywords = title
        .toLowerCase()
        .replace(/[^\p{L}\p{N}\s]/gu, " ")
        .split(/\s+/)
        .filter((word) => word.length > 3);

      const scored = mockVideos
        .filter((video) => video.id !== excludeId)
        .map((video) => {
          const haystack =
            `${video.title} ${video.description} ${video.channelTitle}`.toLowerCase();
          const score = keywords.reduce(
            (sum, word) => sum + (haystack.includes(word) ? 1 : 0),
            0,
          );
          return { video, score };
        })
        .sort((a, b) => b.score - a.score || (b.video.viewCount ?? 0) - (a.video.viewCount ?? 0));

      return scored.slice(0, maxResults).map((entry) => entry.video);
    },

    async getByChannelId(
      channelId: string,
      maxResults = 24,
    ): Promise<Video[]> {
      return mockVideos
        .filter((video) => video.channelId === channelId)
        .sort(
          (a, b) =>
            new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
        )
        .slice(0, maxResults);
    },
  };
}
