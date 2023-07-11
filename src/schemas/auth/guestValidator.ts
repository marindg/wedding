import Joi, { ObjectSchema } from "joi";
import { IAddress } from "typings/commun";
import { createGuestByLoginDTO, patchGuestByIdDTO, readGuestByLoginDTO } from "typings/dto";
import { IGuest } from "typings/user";

export const IAddressSchema: ObjectSchema<IAddress> = Joi.object({
  country: Joi.string().required(),
  postalCode: Joi.string().required(),
  postalStreet: Joi.string().required(),
  postalNum: Joi.string().required(),
  postalPlus: Joi.string().optional(),
});

export const IGuestSchema: ObjectSchema<IGuest> = Joi.object({
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  mail: Joi.string().email().required(),
  phone: Joi.string().required(),
  address: IAddressSchema,
  diet: Joi.string().optional(),
  present: Joi.boolean().optional(),
  comment: Joi.string().optional(),
  birthDate: Joi.date().required(),
});

export const createGuestByLoginDTOSchema: ObjectSchema<createGuestByLoginDTO> = Joi.object({
  guest: IGuestSchema.required(),
});

export const readGuestByLoginDTOSchema: ObjectSchema<readGuestByLoginDTO> = Joi.object({
  login: Joi.string().optional(),
});

export const patchGuestByIdDTOSchema: ObjectSchema<patchGuestByIdDTO> = Joi.object({
  guestId: Joi.string().required(),
  updates: IGuestSchema.required(),
});
