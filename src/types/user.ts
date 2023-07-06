import { ObjectId } from "mongoose";
import { IAddress } from "./commun";

export interface IUser {
  _id: ObjectId;
  login: string;
  password?: string;
  passwordRequired: boolean;
  loginLogs: ILoginLogs[];
  isAdmin: boolean;
  guest: IGuest[];
}

export interface ILoginLogs {
  date: Date;
  country: string;
  IP: string;
  device: string;
  browser: string;
}

export interface IGuest {
  _id: ObjectId;
  firstName: string;
  lastName: string;
  mail: string;
  phone: string;
  address: IAddress;
  diet: string;
  present: boolean;
  comment: string;
  birthDate: Date;
}
