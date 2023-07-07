import rateLimit from "express-rate-limit";
import dotenv from "dotenv";

dotenv.config();

export const limiter = rateLimit({
  windowMs: +process.env.RL_TIME_MINUTES! * 60 * 1000,
  max: +process.env.RL_MAX_TRY!,
  message: process.env.RL_SEND_MESSAGE,
});
