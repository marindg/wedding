import { IGuest, IUser } from "typings/user";
import guestModel from "models/guestModel";
import userModel from "models/userModel";
import { IService } from "typings/commun";
import { userValidator } from "utils";
import { createGuestByLoginDTO, patchGuestByIdDTO, readGuestByLoginDTO } from "typings/dto";

export async function readGuestByLogin(login: readGuestByLoginDTO): Promise<IService> {
  try {
    const { error } = userValidator.readGuestByLoginSchema.validate(login);
    if (error) {
      return { code: 400, status: "error", message: error.details[0].message };
    }

    const user: IUser | undefined | null = await userModel.findOne({ login: login }).populate("guest");

    if (!user) {
      return { code: 404, status: "error", message: "User not found" };
    }

    return { code: 200, status: "success", message: user };
  } catch (error: any) {
    if (error instanceof Error) {
      return { code: 500, status: "error", message: error.message };
    } else {
      return { code: 500, status: "error", message: "An unexpected error occurred." };
    }
  }
}

export async function createGuestByLogin({ login, guest }: createGuestByLoginDTO): Promise<IService> {
  try {
    const { error } = userValidator.createGuestByLoginSchema.validate({ login, guest });
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
    await userModel.updateOne({ login: login }, { $push: { guest: newGuest._id } });

    return { code: 201, status: "success", message: `${newGuest.firstName} ${newGuest.lastName} well saved` };
  } catch (error: any) {
    if (error instanceof Error) {
      return { code: 500, status: "error", message: error.message };
    } else {
      return { code: 500, status: "error", message: "An unexpected error occurred." };
    }
  }
}

export async function patchGuestById({ guestId, updates }: patchGuestByIdDTO): Promise<IService> {
  try {
    const { error } = userValidator.patchGuestByIdSchema.validate({ guestId, updates });
    if (error) {
      return { code: 400, status: "error", message: error.details[0].message };
    }

    const guest: IGuest | null = await guestModel.findOneAndUpdate({ _id: guestId }, updates, { new: true });
    if (!guest) {
      return { code: 404, status: "error", message: "Guest not found" };
    }

    return { code: 201, status: "success", message: guest };
  } catch (error: any) {
    if (error instanceof Error) {
      return { code: 500, status: "error", message: error.message };
    } else {
      return { code: 500, status: "error", message: "An unexpected error occurred." };
    }
  }
}
