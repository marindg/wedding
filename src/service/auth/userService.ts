import userModel from "models/userModel";
import { IService } from "typings/commun";
import { IUser } from "typings/user";
import { patchUserDTO, readUserDTO } from "typings/dto";
import { ErrorHandler } from "middleware";
import { httpStatusCodes } from "constant";

export async function readUser({ login }: readUserDTO): Promise<IService> {
  try {
    const user: IUser | undefined | null = await userModel.findOne({ login: login }).populate("guest");

    if (!user) {
      throw new ErrorHandler(httpStatusCodes.FORBIDDEN, "User not found");
    }

    return { code: httpStatusCodes.OK, status: "success", message: user };
  } catch (error: unknown) {
    throw error;
  }
}

export async function patchUser({ login, updates }: patchUserDTO): Promise<IService> {
  try {
    const user: IUser | null | undefined = await userModel.findOneAndUpdate({ login: login }, updates, { new: true });
    if (!user) {
      throw new ErrorHandler(httpStatusCodes.FORBIDDEN, "User not found");
    }

    return { code: httpStatusCodes.CREATED, status: "success", message: user };
  } catch (error: unknown) {
    throw error;
  }
}
