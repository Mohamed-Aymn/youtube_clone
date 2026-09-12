export class AppError extends Error {
  constructor(
    message: string,
    readonly code: "NOT_FOUND",
  ) {
    super(message);
    this.name = "AppError";
  }
}
