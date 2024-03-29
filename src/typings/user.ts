import { ObjectId } from "mongoose";
import { IAddress } from "typings/commun";

export interface IUser {
  _id: ObjectId;
  login: string;
  loginLogs: ILoginLogs[];
  isAdmin: boolean;
  guest: IGuest[];
  activate: boolean;
  creationDate: Date;
}

export interface ILoginLogs {
  date: Date;
  country: string;
  ip: string;
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

export interface ICreateLogin {
  createLogin: boolean;
}

export enum tokenType {
  "user" = "user",
  "loginCreate" = "loginCreate",
}

export interface IGenerateToken {
  user: IUser | ICreateLogin;
  type: tokenType;
}
