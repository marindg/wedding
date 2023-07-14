import { Schema, model } from "mongoose";
import { IEventAddress } from "typings/wedding";

export const addressEventSchema = new Schema<IEventAddress>({
  country: { type: String, required: true },
  postalCode: { type: String, required: true },
  postalStreet: { type: String, required: true },
  postalNum: { type: String, required: true },
  postalPlus: { type: String, required: false },
  lat: { type: String, required: true },
  lon: { type: String, required: true },
});

export default model<IEventAddress>("AddressEvent", addressEventSchema);
