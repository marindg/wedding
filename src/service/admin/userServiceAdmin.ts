import userModel from "models/userModel";
import { IService } from "typings/commun";
import { IUser } from "typings/user";
import { ErrorHandler } from "middleware";
import { httpStatusCodes } from "constant";
import { activateUserByLoginAdminDTO } from "typings/dto";

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

export async function activateUser({ login, state }: activateUserByLoginAdminDTO): Promise<IService> {
  try {
    const user: IUser | undefined | null = await userModel.findOneAndUpdate({ login: login }, { activate: state }, { new: true });

    if (!user) {
      throw new ErrorHandler(httpStatusCodes.FORBIDDEN, "No user founded");
    }

    return { code: httpStatusCodes.OK, status: "success", message: user };
  } catch (error: unknown) {
    throw error;
  }
}
