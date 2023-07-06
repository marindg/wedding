import { IAddress, IContact } from "./commun";

export interface IWedding {
  _id: string;
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
  _id: string;
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
  _id: string;
  startDate: string;
  endDate: string;
  name: string;
  desc: string;
  pictures?: string[];
  icons?: string;
}

export interface ITable {
  _id: string;
  emplacement: string;
  name: string;
  comment?: string;
  guests: string[];
}

export interface IMenu {
  _id: string;
  diet: string;
  name: string;
  category: string;
  order: number;
}

export interface IDrink {
  _id: string;
  alcool: boolean;
  name: string;
  order: number;
}
