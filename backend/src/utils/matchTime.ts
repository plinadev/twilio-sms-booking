import { Request } from "express";
import dotenv from "dotenv";
dotenv.config();

interface MatchTimeParams {
  userResponseContent: string;
  request: Request;
}
const HOUR_REGEX = /\b(\d?\d)\s?([aApP] [mM])/g;

export function matchTime({
  userResponseContent,
  request,
}: MatchTimeParams): string {
  const match = HOUR_REGEX.exec(userResponseContent);
  if (match && match.length === 3) {
    const { type, weekday } = request.session;
    request.session.step = 4;
    request.session.time = match[0];
    return `Your ${type} booking is set to ${weekday} at ${match[0]}. Please, let us know if changes are needed.`;
  } else {
    return "Sorry i could not understand what time slot you have chosen";
  }
}
