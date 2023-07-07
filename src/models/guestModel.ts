import { Schema, model } from "mongoose";
import { IGuest } from "typings/user";
import { addressSchema } from "@models/addressModel";

export const guestSchema = new Schema<IGuest>({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  mail: { type: String, required: true },
  phone: { type: String, required: true },
  address: addressSchema,
  diet: { type: String, required: true },
  present: { type: Boolean, required: true, default: true },
  comment: { type: String, required: true },
  birthDate: { type: Date, required: true },
});

export default model<IGuest>("Guest", guestSchema);
