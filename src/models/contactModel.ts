import { Schema, model } from "mongoose";
import { IContact } from "typings/commun";

export const contactSchema = new Schema<IContact>({
  name: { type: String, required: true },
  phone: { type: String, required: true, default: null },
  availability: { type: String, required: true, default: null },
  mail: { type: String, required: true, default: null },
  comment: { type: String, required: false },
});

export default model<IContact>("Contact", contactSchema);
