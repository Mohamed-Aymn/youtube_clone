import type { Channel } from "../entities/channel";

export type ChannelRepository = {
  getById(id: string): Promise<Channel | null>;
  getByIds(ids: string[]): Promise<Channel[]>;
};
