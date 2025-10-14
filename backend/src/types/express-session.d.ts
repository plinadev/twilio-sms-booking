import "express-session";

declare module "express-session" {
  interface SessionData {
    step?: number;
    type?: string;
    weekday?: string;
    time?: string;
  }
}
