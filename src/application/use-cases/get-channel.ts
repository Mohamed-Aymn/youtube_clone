import type { Channel } from "@/src/domain/entities/channel";
import { AppError } from "@/src/domain/errors";
import type { ChannelRepository } from "@/src/domain/repositories/channel-repository";

export function createGetChannel(channelRepository: ChannelRepository) {
  return async function getChannel(id: string): Promise<Channel> {
    const channel = await channelRepository.getById(id);
    if (!channel) {
      throw new AppError(`Channel not found: ${id}`, "NOT_FOUND");
    }
    return channel;
  };
}
