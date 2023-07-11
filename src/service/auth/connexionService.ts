import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import userModel from "@models/userModel";
import { IUser } from "typings/user";
import { IService } from "typings/commun";
import { communValidator } from "utils";
import { createLoginDTO } from "typings/dto";

dotenv.config();

const flyerPassword: string = process.env.FLYER_PASSWORD!.toUpperCase();

export async function accessLogin(login: string): Promise<IService> {
  try {
    const { error } = communValidator.accessLoginSchema.validate({ login });
    if (error) {
      return { code: 400, status: "error", message: error.details[0].message };
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

export async function createLogin({ login, password }: createLoginDTO): Promise<IService> {
  try {
    const { error } = communValidator.createLoginSchema.validate({ login, password });
    if (error) {
      return { code: 400, status: "error", message: error.details[0].message };
    }

    login = login.toUpperCase();
    password = password.toUpperCase();

    if (password !== flyerPassword) {
      return { code: 403, status: "error", message: "wrong password" };
    }

    const newUser = new userModel({
      login: login,
    });

    const savedUser = await newUser.save();

    const token = jwt.sign({ user: savedUser }, process.env.JWT_SECRET!, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    });

    return { code: 201, status: "success", message: token };
  } catch (error: any) {
    if (error.code === 11000) {
      return { code: 409, status: "error", message: `login ${login} already taken` };
    }
    if (error instanceof Error) {
      return { code: 500, status: "error", message: error.message };
    } else {
      return { code: 500, status: "error", message: "An unexpected error occurred." };
    }
  }
}
