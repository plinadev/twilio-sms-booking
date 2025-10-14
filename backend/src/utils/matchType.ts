import { Request } from "express";

interface MatchTypeParams {
  userResponseContent: string;
  request: Request;
}

export function matchType({
  userResponseContent,
  request,
}: MatchTypeParams): string {
  if (userResponseContent.includes("gym")) {
    request.session.type = "gym";
  } else if (userResponseContent.includes("personal")) {
    request.session.type = "personal trainer";
  } else if (userResponseContent.includes("massage")) {
    request.session.type = "massage";
  }

  if (!request.session.type) {
    return `Sorry, I didn't understand your request`;
  }

  request.session.step = 2;
  return `What date would you like to book for your ${request.session.type} session?`;
}
