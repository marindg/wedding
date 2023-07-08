import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import userModel from "@models/userModel";
import { IUser } from "typings/user";
import { IService } from "typings/commun";

dotenv.config();

const flyerPassword: string = process.env.FLYER_PASSWORD!.toUpperCase();

export async function getAccess(login: string): Promise<IService> {
  try {
    if (!login) {
      return { code: 400, status: "error", message: "login missing" };
    }
    login = login.toUpperCase();

    const user: IUser | undefined | null = await userModel.findOne({ login });

    if (!user) {
      if (login === flyerPassword) {
        return { code: 201, status: "success", message: "create new user." };
      }
      return { code: 401, status: "error", message: "wrong login" };
    } else {
      if (!user.activate) {
        return { code: 403, status: "error", message: "User is desactivated" };
      } else {
        const token = jwt.sign({ user }, process.env.JWT_SECRET!, {
          expiresIn: process.env.JWT_EXPIRES_IN,
        });

        return { code: 200, status: "success", message: token };
      }
    }
  } catch (error: unknown) {
    if (error instanceof Error) {
      return { code: 500, status: "error", message: error.message };
    } else {
      return { code: 500, status: "error", message: "An unexpected error occurred." };
    }
  }
}

export async function createLogin(newLogin: string, keyAccess: string): Promise<IService> {
  try {
    if (!newLogin) {
      return { code: 400, status: "error", message: "login missing" };
    }
    newLogin = newLogin.toUpperCase();
    if (!keyAccess) {
      return { code: 400, status: "error", message: "password missing" };
    }
    keyAccess = keyAccess.toUpperCase();

    if (keyAccess !== flyerPassword) {
      return { code: 403, status: "error", message: "wrong password" };
    }

    const newUser = new userModel({
      login: newLogin,
    });

    const savedUser = await newUser.save();

    const token = jwt.sign({ user: savedUser }, process.env.JWT_SECRET!, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    });

    return { code: 201, status: "success", message: token };
  } catch (error: any) {
    if (error.code === 11000) {
      return { code: 409, status: "error", message: `login ${newLogin} already taken` };
    }
    if (error instanceof Error) {
      return { code: 500, status: "error", message: error.message };
    } else {
      return { code: 500, status: "error", message: "An unexpected error occurred." };
    }
  }
}

export async function setUserActivation(login: string, activation: boolean): Promise<IService> {
  try {
    login = login.toUpperCase();

    const user: IUser | undefined | null = await userModel.findOne({ login });

    if (!user) {
      return { code: 404, status: "error", message: "user not found" };
    } else {
      await userModel.updateOne({ login }, { activate: activation });
      return { code: 200, status: "success", message: `${login} is now ${activation ? "activated" : "desactivated"}` };
    }
  } catch (error: unknown) {
    if (error instanceof Error) {
      return { code: 500, status: "error", message: error.message };
    } else {
      return { code: 500, status: "error", message: "An unexpected error occurred." };
    }
  }
}
