import Joi, { ObjectSchema } from "joi";
import { IUser } from "typings/user";
import { patchUserDTO, readUserDTO } from "typings/dto";

export const userSchema: ObjectSchema<IUser> = Joi.object({
  login: Joi.string().optional(),
  isAdmin: Joi.forbidden(),
  guest: Joi.forbidden(),
  activate: Joi.boolean().optional(),
  creationDate: Joi.forbidden(),
});

export const patchUserSchema: ObjectSchema<patchUserDTO> = Joi.object({
  updates: userSchema.required(),
});

export const readUserSchema: ObjectSchema<readUserDTO> = Joi.object({
  login: Joi.string().optional(),
});
