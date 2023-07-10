import { IGuest } from "typings/user";
import guestModel from "models/guestModel";
import userModel from "models/userModel";
import { IService } from "typings/commun";
import { guestSchema } from "utils/userValidator";

export async function createGuest(guest: IGuest, id: string): Promise<IService> {
  try {
    const { error } = guestSchema.validate(guest);
    if (error) {
      return { code: 400, status: "error", message: error.details[0].message };
    }

    // if (!guest.firstName || !guest.lastName || !guest.mail || !guest.phone || !guest.birthDate) {
    //   return { code: 400, status: "error", message: "guest data missing" };
    // }
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
