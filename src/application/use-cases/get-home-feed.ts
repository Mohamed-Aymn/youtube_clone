import type { Video } from "@/src/domain/entities/video";
import type { VideoRepository } from "@/src/domain/repositories/video-repository";

export function createGetHomeFeed(videoRepository: VideoRepository) {
  return async function getHomeFeed(regionCode = "US"): Promise<Video[]> {
    return videoRepository.getPopular(regionCode, 24);
  };
}
