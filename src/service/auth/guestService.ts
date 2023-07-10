import { IGuest, IUser } from "typings/user";
import guestModel from "models/guestModel";
import userModel from "models/userModel";
import { IService } from "typings/commun";
import { userValidator } from "utils";

export async function createGuest(guest: IGuest, id: string): Promise<IService> {
  try {
    const { error } = userValidator.guestSchema.validate(guest);
    if (error) {
      return { code: 400, status: "error", message: error.details[0].message };
    }

    const guestInDb = await guestModel.findOne({ mail: guest.mail });

    if (guestInDb) {
      return { code: 409, status: "error", message: `email ${guest.mail} already taken. Guest not saved.` };
    }

    const newGuest = new guestModel({
      firstName: guest.firstName,
      lastName: guest.lastName,
      mail: guest.mail,
      phone: guest.phone,
      address: guest.address,
      diet: guest.diet,
      comment: guest.comment || undefined,
      birthDate: guest.birthDate,
    });

    await newGuest.save();
    await userModel.updateOne({ _id: id }, { $push: { guest: newGuest._id } });

    return { code: 201, status: "success", message: `${newGuest.firstName} ${newGuest.lastName} well saved` };
  } catch (error: any) {
    if (error instanceof Error) {
      return { code: 500, status: "error", message: error.message };
    } else {
      return { code: 500, status: "error", message: "An unexpected error occurred." };
    }
  }
}

export async function getAllGuest(userActivate: boolean): Promise<IService> {
  try {
    const users = await userModel.find({ activate: userActivate }).populate("guest");

    const guests: IGuest[] = [];
    users.forEach((user: IUser) => {
      guests.push(...user.guest);
    });

    return { code: 201, status: "success", message: guests };
  } catch (error: any) {
    if (error instanceof Error) {
      return { code: 500, status: "error", message: error.message };
    } else {
      return { code: 500, status: "error", message: "An unexpected error occurred." };
    }
  }
}

export async function getUser(login: string): Promise<IService> {
  try {
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

export async function getUsersActivated(activated: boolean, logins: string | undefined): Promise<IService> {
  try {
    const users: IUser[] | null = await userModel.find({ login: logins ? logins : "", activate: activated }).populate("guest");

    if (!users) {
      return { code: 404, status: "error", message: "User not found" };
    }

    return { code: 201, status: "success", message: users };
  } catch (error: any) {
    if (error instanceof Error) {
      return { code: 500, status: "error", message: error.message };
    } else {
      return { code: 500, status: "error", message: "An unexpected error occurred." };
    }
  }
}
