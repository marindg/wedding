import { Request, Response } from "express";
import { errorHandler, sendResponse } from "utils";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import userModel from "models/userModel";
import guestModel from "models/guestModel";
import { IGuest, IUser } from "typings/user";

dotenv.config();

export const createGuest = errorHandler(async (req: Request, res: Response) => {
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const mail = req.body.mail;
  const phone = req.body.phone;
  //   const address: addressSchema,
  const diet = req.body.diet;
  const present = req.body.present;
  const comment = req.body.comment;
  const birthDate = req.body.birthDate;

  if (!firstName || !lastName || !mail || !phone || !diet || !present || !comment || !birthDate) {
    return sendResponse(res, 400, "error", `data missing`);
  } else {
    const newGuest = new guestModel({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      mail: req.body.mail,
      phone: req.body.phone,
      //    address: addressSchema,
      diet: req.body.diet,
      present: req.body.present,
      comment: req.body.comment,
      birthDate: req.body.birthDate,
    });
    const savedGuest = await newGuest.save();

    return sendResponse(res, 201, "success", `Guest saved : ${newGuest._id}`);
  }
});
