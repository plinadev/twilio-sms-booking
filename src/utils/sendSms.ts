import { Twilio } from "twilio";
import dotenv from "dotenv";
dotenv.config();

const twilio = new Twilio(
  process.env.TWILIO_TOKEN_SID,
  process.env.TWILIO_TOKEN_SECRET,
  {
    accountSid: process.env.TWILIO_ACCOUNT_SID!,
  }
);

const from = process.env.PHONE_NUMBER || "";
const to = process.env.MY_NUMBER || "";
export function sendSms() {
  twilio.messages
    .create({
      from,
      to,
      body: "Hello from Twilio",
    })
    .then((message) => console.log(`Message sent with sid ${message.sid}`))
    .catch((err) => console.log(err.message));
}
