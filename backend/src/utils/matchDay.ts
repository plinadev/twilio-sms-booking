import { Request } from "express";
import dotenv from "dotenv";
dotenv.config();

interface MatchDayParams {
  userResponseContent: string;
  request: Request;
}
const WEEKDAYS = process.env.WEEKDAYS!.split(",");

export function matchDay({
  userResponseContent,
  request,
}: MatchDayParams): string {
  const weekday = WEEKDAYS?.filter((day) => userResponseContent.includes(day));
  if (weekday?.length === 0) {
    return "I'm not sure which day you have chosen";
  } else if (weekday?.length > 1) {
    return `Please pic one day for the booking \n
            Which one do you prefer: \n
            ${weekday.join("\n")}`;
  } else {
    request.session.step = 3;
    request.session.weekday = weekday[0]!;
    return `Do you want to book it on  ${weekday[0]}:\n
              10am, 11am, 1pm, 4pm`;
  }
}
