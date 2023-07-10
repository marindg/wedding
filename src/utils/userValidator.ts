import Joi, { ObjectSchema } from "joi";
import { IUser, IGuest, ILoginLogs } from "typings/user";
import { IAddress } from "typings/commun";

export const addressSchema: ObjectSchema<IAddress> = Joi.object({
  country: Joi.string().required(),
  postalCode: Joi.string().required(),
  postalStreet: Joi.string().required(),
  postalNum: Joi.string().required(),
  postalPlus: Joi.string().optional(),
});

export const guestSchema: ObjectSchema<IGuest> = Joi.object({
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  mail: Joi.string().email().required(),
  phone: Joi.string().required(),
  address: addressSchema.required(),
  diet: Joi.string().required(),
  present: Joi.boolean().required(),
  comment: Joi.string().required(),
  birthDate: Joi.date().required(),
});

export const loginLogsSchema: ObjectSchema<ILoginLogs> = Joi.object({
  date: Joi.date().required(),
  country: Joi.string().required(),
  ip: Joi.string().required(),
  device: Joi.string().required(),
  browser: Joi.string().required(),
});

export const userSchema: ObjectSchema<IUser> = Joi.object({
  login: Joi.string().required(),
  loginLogs: loginLogsSchema.optional(),
  isAdmin: Joi.boolean().required(),
  guest: guestSchema.optional(),
  activate: Joi.boolean().required(),
  creationDate: Joi.date().required(),
});
