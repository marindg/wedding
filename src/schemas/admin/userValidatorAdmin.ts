import Joi, { ObjectSchema } from "joi";

export const readUsersAdminSchema: ObjectSchema = Joi.object({});

export const activateUserByLoginAdminSchema: ObjectSchema = Joi.object({
  login: Joi.string().required(),
  state: Joi.boolean().required(),
});
