import { IGuest } from "typings/user";
import guestModel from "models/guestModel";

export const addGuest = async (guestData: IGuest) => {
  const newGuest = new guestModel(guestData);
  const savedGuest = await newGuest.save();
  return savedGuest;
};
