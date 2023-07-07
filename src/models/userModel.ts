import { Schema, model } from "mongoose";
import { IUser } from "typings/user";
import { loginLogsSchema } from "models/loginLogsModel";
import { guestSchema } from "models/guestModel";

const userSchema = new Schema<IUser>({
  login: { type: String, required: true, uppercase: true },
  loginLogs: { type: [loginLogsSchema], required: true },
  isAdmin: { type: Boolean, required: true, default: false },
  guest: { type: [guestSchema], required: false },
  activate: { type: Boolean, required: true, default: true },
});

export default model<IUser>("User", userSchema);
