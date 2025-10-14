/// <reference path="./types/express-session.d.ts" />

import dotenv from "dotenv";
import express, { Request, Response } from "express";
import bodyParser from "body-parser";
import session from "express-session";
import MessagingResponse from "twilio/lib/twiml/MessagingResponse";
import { matchDay, matchTime, matchType } from "./utils";

dotenv.config();

const app = express();
const PORT = process.env.PORT || "3001";
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  session({
    secret: process.env.SESSION_SECRET!,
    resave: false,
    saveUninitialized: true,
  })
);

app.post("/receive-sms", (request: Request, response: Response) => {
  const { session, body } = request;
  const userResponseContent = body.Body.toLowerCase();

  let message: string;

  if (!session.step) {
    session.step = 1;
    message = `Hi there! Do you want to book an appointment to: \n
    gym \n
    personal trainer \n
    massage`;
  } else {
    switch (session.step) {
      case 1: {
        message = matchType({ userResponseContent, request });
        break;
      }
      case 2: {
        message = matchDay({ userResponseContent, request });
        break;
      }
      case 3: {
        message = matchTime({ userResponseContent, request });
        break;
      }
      case 4: {
        const { type, weekday, time } = request.session;
        message = `Your ${type} appointment is set to ${weekday} at ${time}`;
        break;
      }
      default:
        message = "error";
        console.log(`Could not find step for value: ${session.step}`);
    }
  }

  const twiml = new MessagingResponse();
  twiml.message(message);

  response.set("Content-Type", "text/xml");
  response.send(twiml.toString());
});

app.listen(PORT, () => {
  console.log(`Listening to http://localhost:${PORT}`);
});
