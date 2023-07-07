import { Schema, model } from "mongoose";
import { ILoginLogs } from "typings/user";

export const loginLogsSchema = new Schema<ILoginLogs>({
  date: { type: Date, required: true, default: Date.now },
  country: { type: String, required: true },
  ip: { type: String, required: true },
  device: { type: String, required: true },
  browser: { type: String, required: true },
});

export default model<ILoginLogs>("loginLogs", loginLogsSchema);
