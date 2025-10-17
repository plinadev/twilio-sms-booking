# 📱 Twilio SMS Booking App

This project is an interactive **SMS-based booking system** built with **Twilio**, **Express**, and **TypeScript**.
Users can schedule appointments (like gym sessions, personal training, or massages) entirely through SMS messages, with each conversation step tracked using sessions.

---

## 🚀 Features

* 📩 Two-way SMS interaction using **Twilio Messaging API**
* 💬 Conversational booking flow (multi-step dialogue)
* 🧠 Session-based state management with **express-session**
* 🔐 Environment-based configuration with **dotenv**
* 🌐 Public webhook testing via **LocalTunnel**
* ⚙️ Built with **TypeScript** for maintainability

---

## 🧱 Tech Stack

| Layer              | Technology        |
| ------------------ | ----------------- |
| Server             | Node.js + Express |
| SMS Gateway        | Twilio            |
| Session Handling   | express-session   |
| Public URL         | LocalTunnel       |
| Environment Config | dotenv            |
| Language           | TypeScript        |

---

## 📂 Project Structure

```
twilio-sms-booking/
├── src/
│   ├── index.ts                 # Main Express server
│   ├── utils.ts                 # Utility functions (matchDay, matchTime, matchType)
│   └── types/
│       └── express-session.d.ts # Session type declarations
├── package.json
├── tsconfig.json
├── .env                         # Environment variables
└── README.md
```

---

## ⚙️ Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/plinadev/twilio-sms-booking.git
   cd twilio-sms-booking
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env` file in the root directory:

   ```bash
   TWILIO_ACCOUNT_SID=your_twilio_account_sid
   TWILIO_AUTH_TOKEN=your_twilio_auth_token
   TWILIO_PHONE_NUMBER=+1234567890
   SESSION_SECRET=your_secret_key
   PORT=3001
   ```

4. **Start the server**

   ```bash
   npm run dev
   ```

   This uses `nodemon` and `ts-node` for live TypeScript execution.

---

## 🌍 Expose Local Server (for Twilio Webhook)

Twilio requires a **publicly accessible URL** for incoming SMS webhooks.
You can use **LocalTunnel** (already included in dependencies):

```bash
npx localtunnel --port 3001
```

You’ll get a URL like:

```
https://your-random-subdomain.loca.lt
```

Use this URL to configure your **Twilio Messaging Webhook**:

* Go to your [Twilio Console → Phone Numbers → Active Number](https://www.twilio.com/console/phone-numbers/incoming)
* Under **Messaging**, set:

  ```
  A MESSAGE COMES IN → Webhook → https://your-random-subdomain.loca.lt/receive-sms
  ```

---

## 💬 How It Works

1. User sends an SMS to your Twilio number.
2. The app starts a booking conversation:

   ```
   Hi there! Do you want to book an appointment to:
   gym
   personal trainer
   massage
   ```
3. The user replies with one of the options.
4. The conversation continues:

   * Select day → select time → confirm booking
5. The final confirmation is sent via SMS:

   ```
   Your massage appointment is set to Monday at 10 AM
   ```

---

## 🧩 Example Conversation Flow

| Step | User Message  | App Reply                                                                         |
| ---- | ------------- | --------------------------------------------------------------------------------- |
| 1    | (initial SMS) | “Hi there! Do you want to book an appointment to: gym, personal trainer, massage” |
| 2    | “gym”         | “Great! Which day works best for you? (Monday–Sunday)”                            |
| 3    | “Monday”      | “Got it! What time would you like to book your gym session?”                      |
| 4    | “10 AM”       | “Your gym appointment is set to Monday at 10 AM”                                  |

---

## 🧠 Key Functions

| Function      | Description                                 |
| ------------- | ------------------------------------------- |
| `matchType()` | Validates user’s choice of appointment type |
| `matchDay()`  | Checks and saves the chosen day             |
| `matchTime()` | Validates and stores the selected time      |

---

## 🧪 Testing Locally

To simulate Twilio requests manually:

```bash
curl -X POST http://localhost:3001/receive-sms \
--data "Body=gym"
```

This mimics a user sending “gym” as an SMS.

---

## 🧰 Scripts

| Command         | Description                                 |
| --------------- | ------------------------------------------- |
| `npm run dev`   | Run in development mode (nodemon + ts-node) |
| `npm run build` | Compile TypeScript to JavaScript            |
| `npm start`     | Start production build                      |

---

## 🔒 Environment Variables

| Variable              | Description                       |
| --------------------- | --------------------------------- |
| `TWILIO_ACCOUNT_SID`  | Your Twilio account SID           |
| `TWILIO_AUTH_TOKEN`   | Your Twilio auth token            |
| `TWILIO_PHONE_NUMBER` | Your Twilio phone number          |
| `SESSION_SECRET`      | Secret key for session encryption |
| `PORT`                | Server port (default: 3001)       |

---
