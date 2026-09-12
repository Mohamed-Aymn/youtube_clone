import type { Video } from "@/src/domain/entities/video";
import type { VideoRepository } from "@/src/domain/repositories/video-repository";

export function createSearchVideos(videoRepository: VideoRepository) {
  return async function searchVideos(query: string): Promise<Video[]> {
    const trimmed = query.trim();
    if (!trimmed) return [];
    return videoRepository.search(trimmed, 24);
  };
}
