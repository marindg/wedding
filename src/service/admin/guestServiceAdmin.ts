import { IService } from "typings/commun";
import { IGuest } from "typings/user";
import { ErrorHandler } from "middleware";
import { httpStatusCodes } from "constant";
import guestModel from "models/guestModel";

export async function readGuests(): Promise<IService> {
  try {
    const guests: IGuest[] | undefined | null = await guestModel.find();

    if (!guests) {
      throw new ErrorHandler(httpStatusCodes.FORBIDDEN, "No guest founded");
    }

    return { code: httpStatusCodes.OK, status: "success", message: guests };
  } catch (error: unknown) {
    throw error;
  }
}
