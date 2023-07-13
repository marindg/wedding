import userModel from "models/userModel";
import { IService } from "typings/commun";
import { IUser } from "typings/user";
import { ErrorHandler } from "middleware";
import { httpStatusCodes } from "constant";

export async function readUsers(): Promise<IService> {
  try {
    const users: IUser[] | undefined | null = await userModel.find().populate("guest");

    if (!users) {
      throw new ErrorHandler(httpStatusCodes.FORBIDDEN, "No user founded");
    }

    return { code: httpStatusCodes.OK, status: "success", message: users };
  } catch (error: unknown) {
    throw error;
  }
}
