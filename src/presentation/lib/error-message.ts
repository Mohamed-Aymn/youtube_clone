import { AppError } from "@/src/domain/errors";

export function getErrorMessage(error: unknown): {
  title: string;
  message: string;
  code?: AppError["code"];
} {
  if (error instanceof AppError) {
    if (error.code === "MISSING_API_KEY") {
      return {
        title: "API key required",
        message:
          "Add YOUTUBE_API_KEY to .env.local, then restart the dev server. Create a key in Google Cloud Console with the YouTube Data API v3 enabled.",
        code: error.code,
      };
    }
    if (error.code === "QUOTA_EXCEEDED") {
      return {
        title: "API quota exceeded",
        message:
          "The YouTube Data API daily quota has been reached. Try again tomorrow or use another API key.",
        code: error.code,
      };
    }
    if (error.code === "NOT_FOUND") {
      return {
        title: "Not found",
        message: error.message,
        code: error.code,
      };
    }
    return {
      title: "Something went wrong",
      message: error.message,
      code: error.code,
    };
  }

  if (error instanceof Error) {
    return { title: "Something went wrong", message: error.message };
  }

  return {
    title: "Something went wrong",
    message: "An unexpected error occurred.",
  };
}
