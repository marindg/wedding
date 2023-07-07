import { Schema, model } from "mongoose";
import { IAddress } from "typings/commun";

export const addressSchema = new Schema<IAddress>({
  country: { type: String, required: true },
  postalCode: { type: String, required: true },
  postalStreet: { type: String, required: true },
  postalNum: { type: String, required: true },
  postalPlus: { type: String, required: false },
});

export default model<IAddress>("Address", addressSchema);
