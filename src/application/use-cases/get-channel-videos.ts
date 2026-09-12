import type { Video } from "@/src/domain/entities/video";
import type { VideoRepository } from "@/src/domain/repositories/video-repository";

export function createGetChannelVideos(videoRepository: VideoRepository) {
  return async function getChannelVideos(channelId: string): Promise<Video[]> {
    return videoRepository.getByChannelId(channelId, 24);
  };
}
