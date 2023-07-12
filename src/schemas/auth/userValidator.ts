import Joi, { ObjectSchema } from "joi";
import { IUser } from "typings/user";
import { patchUserDTO, readUserDTO } from "typings/dto";

export const userSchema: ObjectSchema<IUser> = Joi.object({
  login: Joi.string().when("$isAdmin", {
    is: true,
    then: Joi.required(),
    otherwise: Joi.optional(),
  }),
  isAdmin: Joi.forbidden(),
  guest: Joi.forbidden(),
  activate: Joi.boolean().optional(),
  creationDate: Joi.forbidden(),
});

export const patchUserSchema: ObjectSchema<patchUserDTO> = Joi.object({
  login: Joi.string().when("$isAdmin", {
    is: true,
    then: Joi.required(),
    otherwise: Joi.forbidden(),
  }),
  updates: userSchema.required(),
});

export const readUserSchema: ObjectSchema<readUserDTO> = Joi.object({
  login: Joi.string().when("$isAdmin", {
    is: true,
    then: Joi.required(),
    otherwise: Joi.forbidden(),
  }),
});
