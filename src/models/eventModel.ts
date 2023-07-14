import { Schema, model } from "mongoose";
import { IEvent } from "typings/wedding";

export const eventkSchema = new Schema<IEvent>({
  name: { type: String, required: true, unique: true, uppercase: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  address: { type: Schema.Types.ObjectId, ref: "AddressEvent" },
  contact: [{ type: Schema.Types.ObjectId, ref: "Contact" }],
  pictures: { type: [String], required: true },
  icons: { type: String, required: false },
});

export default model<IEvent>("Event", eventkSchema);
