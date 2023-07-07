import { ObjectId } from "mongoose";
import { IAddress, IContact } from "./commun";

export interface IWedding {
  _id: ObjectId;
  name: string;
  mainDate: string;
  mainPicture: string;
  descriptionSmall: string;
  descriptionBig: string;
  events: IEvents[];
  schedule: ISchedule[];
  tables: ITable[];
  menu: IMenu[];
  drink: IDrink[];
  contacts: IContact[];
  pictures: string[];
}

export interface IEvents {
  _id: ObjectId;
  name: string;
  startDate: Date;
  endDate: Date;
  address: IEventAddress;
  contact: IContact;
  pictures?: string[];
  icons?: string;
}

export interface IEventAddress extends IAddress {
  lat: string;
  lon: string;
}

export interface ISchedule {
  _id: ObjectId;
  startDate: string;
  endDate: string;
  name: string;
  desc: string;
  pictures?: string[];
  icons?: string;
}

export interface ITable {
  _id: ObjectId;
  emplacement: string;
  name: string;
  comment?: string;
  guests: string[];
}

export interface IMenu {
  _id: ObjectId;
  diet: string;
  name: string;
  category: string;
  order: number;
}

export interface IDrink {
  _id: ObjectId;
  alcool: boolean;
  name: string;
  order: number;
}
