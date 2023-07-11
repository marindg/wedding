import mongoose from "mongoose";
import { IGuest, IUser } from "typings/user";

export interface createLoginDTO {
  login: string;
  password: string;
}

export interface accessLoginDTO {
  login: string;
}

export interface readUserDTO {
  login: string;
}

export interface patchUserDTO {
  login: string;
  updates: Partial<IUser>;
}

export interface createGuestByLoginDTO {
  login: string;
  guest: IGuest;
}

export interface readGuestByLoginDTO {
  login: string;
}

export interface patchGuestByIdDTO {
  guestId: mongoose.ObjectId;
  updates: Partial<IGuest>;
}
