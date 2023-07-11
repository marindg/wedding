import { userValidator } from "@utils/index";
import userModel from "models/userModel";
import { IService } from "typings/commun";
import { IUser } from "typings/user";

export async function readUser(login: string): Promise<IService> {
  try {
    const { error } = userValidator.readUserSchema.validate({ login });
    if (error) {
      return { code: 400, status: "error", message: error.details[0].message };
    }

    const user: IUser | undefined | null = await userModel.findOne({ login: login }).populate("guest");

    if (!user) {
      return { code: 404, status: "error", message: "User not found" };
    }

    return { code: 201, status: "success", message: user };
  } catch (error: any) {
    if (error instanceof Error) {
      return { code: 500, status: "error", message: error.message };
    } else {
      return { code: 500, status: "error", message: "An unexpected error occurred." };
    }
  }
}

export async function patchUser(login: string, updates: Partial<IUser>): Promise<IService> {
  try {
    const { error } = userValidator.patchUserSchema.validate(updates);
    if (error) {
      return { code: 400, status: "error", message: error.details[0].message };
    }

    const user: IUser | null = await userModel.findOneAndUpdate({ login: login }, updates, { new: true }).populate("guest");
    if (!user) {
      return { code: 404, status: "error", message: "User not found" };
    }

    return { code: 201, status: "success", message: user };
  } catch (error: any) {
    if (error instanceof Error) {
      return { code: 500, status: "error", message: error.message };
    } else {
      return { code: 500, status: "error", message: "An unexpected error occurred." };
    }
  }
}
