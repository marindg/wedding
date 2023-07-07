import rateLimit from "express-rate-limit";
import dotenv from "dotenv";
import { sendResponse } from "utils";

dotenv.config();

export const limiter = rateLimit({
  windowMs: +process.env.RL_TIME_MINUTES! * 60 * 1000,
  max: +process.env.RL_MAX_TRY!,
  handler: (_req, res) => {
    sendResponse(res, 429, "error", process.env.RL_SEND_MESSAGE);
  },
});
