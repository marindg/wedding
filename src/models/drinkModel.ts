import { Schema, model } from "mongoose";
import { IDrink } from "typings/wedding";

export const drinkSchema = new Schema<IDrink>({
  alcool: { type: Boolean, required: true },
  name: { type: String, required: true },
  order: { type: Number, required: true },
});

export default model<IDrink>("Drink", drinkSchema);
