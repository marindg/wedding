import { Schema, model } from "mongoose";
import { ISchedule } from "typings/wedding";

export const scheduleSchema = new Schema<ISchedule>({
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  name: { type: String, required: true },
  desc: { type: String, required: true },
  pictures: { type: [String], required: false },
  icons: { type: String, required: false },
});

export default model<ISchedule>("Schedule", scheduleSchema);
