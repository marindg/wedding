import userModel from "models/userModel";
import { httpStatusCodes } from "constant";
import { IUser } from "typings/user";
import { IService } from "typings/commun";
import { generateToken } from "utils";
import { createLoginDTO, accessLoginDTO } from "typings/dto";
import { ErrorHandler } from "middleware";

const flyerPassword: string = process.env.FLYER_PASSWORD!.toUpperCase();

export async function accessLogin({ login }: accessLoginDTO): Promise<IService> {
  try {
    login = login.toUpperCase();
    const user: IUser | undefined | null = await userModel.findOne({ login });

    if (!user) {
      if (login === flyerPassword) {
        return { code: httpStatusCodes.OK, status: "success", message: "create new user." };
      }
      return { code: httpStatusCodes.FORBIDDEN, status: "error", message: "wrong login" };
    } else {
      if (!user.activate) {
        return { code: httpStatusCodes.UNAUTHORIZED, status: "error", message: "User is desactivated" };
      } else {
        return { code: httpStatusCodes.OK, status: "success", message: generateToken(user) };
      }
    }
  } catch (error: unknown) {
    throw error;
  }
}

export async function createLogin({ login, password }: createLoginDTO): Promise<IService> {
  try {
    login = login.toUpperCase();
    password = password.toUpperCase();

    if (password !== flyerPassword) {
      throw new ErrorHandler(httpStatusCodes.FORBIDDEN, "wrong password");
    }

    const user: IUser | null | undefined = await userModel.findOne({ login: login });

    if (user) {
      throw new ErrorHandler(httpStatusCodes.CONFLICT, `login ${login} already taken`);
    }

    const newUser = new userModel({
      login: login,
    });
    const savedUser = await newUser.save();
    return { code: httpStatusCodes.CREATED, status: "success", message: generateToken(savedUser) };
  } catch (error: unknown) {
    throw error;
  }
}
