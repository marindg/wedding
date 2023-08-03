import Joi, { ObjectSchema } from "joi";
import { accessLoginDTO, createLoginDTO } from "typings/dto";

export const accessLoginSchema: ObjectSchema<accessLoginDTO> = Joi.object({});

export const createLoginSchema: ObjectSchema<createLoginDTO> = Joi.object({
  login: Joi.string().required(),
});
