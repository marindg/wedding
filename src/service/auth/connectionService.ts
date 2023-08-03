import userModel from "models/userModel";
import { httpStatusCodes } from "constant";
import { IUser } from "typings/user";
import { IService } from "typings/commun";
import { generateToken } from "utils";
import { createLoginDTO, accessLoginDTO } from "typings/dto";
import { ErrorHandler } from "middleware";
import { tokenType } from "typings/user";

const flyerPassword: string = process.env.FLYER_PASSWORD!.toUpperCase();

export async function accessLogin({ login }: accessLoginDTO): Promise<IService> {
  try {
    login = login.toUpperCase();
    const user: IUser | undefined | null = await userModel.findOne({ login });

    if (!user) {
      if (login === flyerPassword) {
        const token: string = generateToken({
          user: { createLogin: true },
          type: tokenType.loginCreate,
        });

        return {
          code: httpStatusCodes.OK,
          status: "create",
          message: token,
        };
      }
      return {
        code: httpStatusCodes.FORBIDDEN,
        status: "error",
        message: "wrong login",
      };
    } else {
      if (!user.activate) {
        return {
          code: httpStatusCodes.UNAUTHORIZED,
          status: "error",
          message: "User is desactivated",
        };
      } else {
        return {
          code: httpStatusCodes.OK,
          status: "success",
          message: { token: generateToken({ user: user, type: tokenType.user }), isAdmin: user.isAdmin, login: user.login },
        };
      }
    }
  } catch (error: unknown) {
    throw error;
  }
}

export async function createLogin({ login }: createLoginDTO): Promise<IService> {
  try {
    login = login.toUpperCase();

    const user: IUser | null | undefined = await userModel.findOne({
      login: login,
    });

    if (user) {
      throw new ErrorHandler(httpStatusCodes.CONFLICT, `Login ${login} already taken`);
    }

    const newUser = new userModel({
      login: login,
    });
    const savedUser = await newUser.save();
    return {
      code: httpStatusCodes.CREATED,
      status: "success",
      message: { token: generateToken({ user: savedUser, type: tokenType.user }), isAdmin: false, login: savedUser.login },
    };
  } catch (error: unknown) {
    throw error;
  }
}
