import { Schema, model } from "mongoose";
import { IMenu } from "typings/wedding";

export const menuSchema = new Schema<IMenu>({
  diet: { type: String, required: true },
  name: { type: String, required: true },
  category: { type: String, required: true },
  order: { type: Number, required: true },
});

export default model<IMenu>("Menu", menuSchema);
