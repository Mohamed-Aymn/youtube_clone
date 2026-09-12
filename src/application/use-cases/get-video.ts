import type { Channel } from "@/src/domain/entities/channel";
import type { Video } from "@/src/domain/entities/video";
import { AppError } from "@/src/domain/errors";
import type { ChannelRepository } from "@/src/domain/repositories/channel-repository";
import type { VideoRepository } from "@/src/domain/repositories/video-repository";

export type VideoDetails = {
  video: Video;
  channel: Channel | null;
};

export function createGetVideo(
  videoRepository: VideoRepository,
  channelRepository: ChannelRepository,
) {
  return async function getVideo(id: string): Promise<VideoDetails> {
    const video = await videoRepository.getById(id);
    if (!video) {
      throw new AppError(`Video not found: ${id}`, "NOT_FOUND");
    }

    const channel = await channelRepository.getById(video.channelId);
    return { video, channel };
  };
}
