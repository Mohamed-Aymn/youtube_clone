import type { Channel } from "@/src/domain/entities/channel";
import type { ChannelRepository } from "@/src/domain/repositories/channel-repository";
import {
  youtubeGet,
  type YoutubeChannelResource,
  type YoutubeListResponse,
} from "./client";
import { mapChannelResource } from "./mappers";

export function createYoutubeChannelRepository(): ChannelRepository {
  return {
    async getById(id: string): Promise<Channel | null> {
      const channels = await this.getByIds([id]);
      return channels[0] ?? null;
    },

    async getByIds(ids: string[]): Promise<Channel[]> {
      if (ids.length === 0) return [];

      const data = await youtubeGet<YoutubeListResponse<YoutubeChannelResource>>(
        "channels",
        {
          part: "snippet,statistics,brandingSettings",
          id: ids.join(","),
          maxResults: ids.length,
        },
      );

      return (data.items ?? []).map(mapChannelResource);
    },
  };
}
