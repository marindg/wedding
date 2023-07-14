import { Schema, model } from "mongoose";
import { IWedding } from "typings/wedding";

const weddingSchema = new Schema<IWedding>({
  name: { type: String, required: true },
  mainDate: { type: String, required: true },
  mainPicture: { type: String, required: true },
  descriptionSmall: { type: String, required: true },
  descriptionBig: { type: String, required: true },
  event: [{ type: Schema.Types.ObjectId, ref: "Event" }],
  schedule: [{ type: Schema.Types.ObjectId, ref: "Schedule" }],
  tables: [{ type: Schema.Types.ObjectId, ref: "Table" }],
  menu: [{ type: Schema.Types.ObjectId, ref: "Menu" }],
  drink: [{ type: Schema.Types.ObjectId, ref: "Drink" }],
  contacts: [{ type: Schema.Types.ObjectId, ref: "Contact" }],
  pictures: { type: [String], required: true },
});

export default model<IWedding>("Wedding", weddingSchema);
