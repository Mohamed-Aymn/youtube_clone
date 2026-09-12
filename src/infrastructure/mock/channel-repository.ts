import type { Channel } from "@/src/domain/entities/channel";
import type { ChannelRepository } from "@/src/domain/repositories/channel-repository";
import { mockChannels } from "./data";

export function createMockChannelRepository(): ChannelRepository {
  return {
    async getById(id: string): Promise<Channel | null> {
      return mockChannels.find((channel) => channel.id === id) ?? null;
    },

    async getByIds(ids: string[]): Promise<Channel[]> {
      const idSet = new Set(ids);
      return mockChannels.filter((channel) => idSet.has(channel.id));
    },
  };
}
