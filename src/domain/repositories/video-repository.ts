import type { Video } from "../entities/video";

export type VideoRepository = {
  getPopular(regionCode?: string, maxResults?: number): Promise<Video[]>;
  getById(id: string): Promise<Video | null>;
  getByIds(ids: string[]): Promise<Video[]>;
  search(query: string, maxResults?: number): Promise<Video[]>;
  searchRelated(title: string, excludeId: string, maxResults?: number): Promise<Video[]>;
  getByChannelId(channelId: string, maxResults?: number): Promise<Video[]>;
};
