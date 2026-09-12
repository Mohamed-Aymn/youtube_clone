import type { Video } from "@/src/domain/entities/video";
import type { VideoRepository } from "@/src/domain/repositories/video-repository";

export function createGetRelatedVideos(videoRepository: VideoRepository) {
  return async function getRelatedVideos(
    title: string,
    excludeId: string,
  ): Promise<Video[]> {
    return videoRepository.searchRelated(title, excludeId, 16);
  };
}
