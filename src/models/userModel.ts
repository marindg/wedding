import { Schema, model } from "mongoose";
import { IUser } from "typings/user";
// import { loginLogsSchema } from "models/loginLogsModel";
// import { guestSchema } from "models/guestModel";

const userSchema = new Schema<IUser>({
  login: { type: String, required: true, uppercase: true },
  loginLogs: [{ type: Schema.Types.ObjectId, ref: "loginLogs" }],
  isAdmin: { type: Boolean, required: true, default: false },
  guest: [{ type: Schema.Types.ObjectId, ref: "Guest" }],
  activate: { type: Boolean, required: true, default: true },
  creationDate: { type: Date, required: true, default: Date.now },
});

export default model<IUser>("User", userSchema);
