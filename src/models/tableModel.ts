import { Schema, model } from "mongoose";
import { ITable } from "typings/wedding";

export const tableSchema = new Schema<ITable>({
  emplacement: { type: String, required: true },
  name: { type: String, required: true },
  comment: { type: String, required: false },
  guests: { type: [String], required: true },
});

export default model<ITable>("Table", tableSchema);
