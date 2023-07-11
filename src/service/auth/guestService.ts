import { IGuest, IUser } from "typings/user";
import guestModel from "models/guestModel";
import userModel from "models/userModel";
import { IService } from "typings/commun";
import { createGuestByLoginDTO, patchGuestByIdDTO, readGuestByLoginDTO } from "typings/dto";
import { httpStatusCodes } from "constant";
import { ErrorHandler } from "middleware";

export async function readGuestByLogin({ login }: readGuestByLoginDTO): Promise<IService> {
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

export async function createGuestByLogin({ login, guest }: createGuestByLoginDTO): Promise<IService> {
  try {
    const guestInDb = await guestModel.findOne({ mail: guest.mail });

    if (guestInDb) {
      throw new ErrorHandler(httpStatusCodes.CONFLICT, `email ${guest.mail} already taken. Guest not saved.`);
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

    return { code: httpStatusCodes.CREATED, status: "success", message: `${newGuest.firstName} ${newGuest.lastName} well saved` };
  } catch (error: unknown) {
    throw error;
  }
}

export async function patchGuestById({ guestId, updates }: patchGuestByIdDTO): Promise<IService> {
  try {
    const guest: IGuest | null = await guestModel.findOneAndUpdate({ _id: guestId }, updates, { new: true });
    if (!guest) {
      throw new ErrorHandler(httpStatusCodes.FORBIDDEN, "Guest not found");
    }

    return { code: httpStatusCodes.CREATED, status: "success", message: guest };
  } catch (error: unknown) {
    throw error;
  }
}
