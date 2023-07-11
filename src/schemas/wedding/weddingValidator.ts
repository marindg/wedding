import Joi, { ObjectSchema } from "joi";

import { IContact } from "typings/commun";
import { IWedding, IEvents, IEventAddress, ISchedule, ITable, IMenu, IDrink } from "typings/wedding";

export const eventAddressSchema: ObjectSchema<IEventAddress> = Joi.object({
  country: Joi.string().required(),
  postalCode: Joi.string().required(),
  postalStreet: Joi.string().required(),
  postalNum: Joi.string().required(),
  postalPlus: Joi.string().optional(),
  lat: Joi.string().required(),
  lon: Joi.string().required(),
});

export const contactSchema: ObjectSchema<IContact> = Joi.object({
  name: Joi.string().required(),
  phone: Joi.string().allow(null),
  availability: Joi.string().allow(null),
  mail: Joi.string().email().allow(null),
  icons: Joi.string().optional(),
});

export const eventsSchema: ObjectSchema<IEvents> = Joi.object({
  name: Joi.string().required(),
  startDate: Joi.date().required(),
  endDate: Joi.date().required(),
  address: eventAddressSchema.required(),
  contact: contactSchema.required(),
  pictures: Joi.array().items(Joi.string()),
  icons: Joi.string(),
});

export const scheduleSchema: ObjectSchema<ISchedule> = Joi.object({
  startDate: Joi.string().required(),
  endDate: Joi.string().required(),
  name: Joi.string().required(),
  desc: Joi.string().required(),
  pictures: Joi.array().items(Joi.string()),
  icons: Joi.string(),
});

export const tableSchema: ObjectSchema<ITable> = Joi.object({
  emplacement: Joi.string().required(),
  name: Joi.string().required(),
  comment: Joi.string(),
  guests: Joi.array().items(Joi.string()).required(),
});

export const menuSchema: ObjectSchema<IMenu> = Joi.object({
  diet: Joi.string().required(),
  name: Joi.string().required(),
  category: Joi.string().required(),
  order: Joi.number().required(),
});

export const drinkSchema: ObjectSchema<IDrink> = Joi.object({
  alcool: Joi.boolean().required(),
  name: Joi.string().required(),
  order: Joi.number().required(),
});

export const weddingSchema: ObjectSchema<IWedding> = Joi.object({
  name: Joi.string().required(),
  mainDate: Joi.date().required(),
  mainPicture: Joi.string().required(),
  descriptionSmall: Joi.string().required(),
  descriptionBig: Joi.string().required(),
  events: Joi.array().items(eventsSchema.required()).required(),
  schedule: Joi.array().items(scheduleSchema.required()).required(),
  tables: Joi.array().items(tableSchema.required()).required(),
  menu: Joi.array().items(menuSchema.required()).required(),
  drink: Joi.array().items(drinkSchema.required()).required(),
  contacts: Joi.array().items(contactSchema.required()).required(),
  pictures: Joi.array().items(Joi.string()).required(),
});
