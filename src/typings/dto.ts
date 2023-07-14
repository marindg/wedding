import mongoose from "mongoose";
import { IGuest, IUser } from "typings/user";
import { IEvent, IMenu, ISchedule, ITable } from "typings/wedding";
import { IContact } from "./commun";

export interface createLoginDTO {
  login: string;
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

export interface activateUserByLoginAdminDTO {
  login: string;
  state: boolean;
}

export interface getEventAllDTO {}
export interface getEventDTO {
  name: string;
}
export interface patchEventDTO {
  updates: IEvent;
}
export interface postEventDTO {
  event: IEvent;
}
export interface deleteEventDTO {
  name: string;
}

export interface getScheduleAllDTO {}
export interface getScheduleDTO {
  name: string;
}
export interface patchScheduleDTO {
  updates: ISchedule;
}
export interface postScheduleDTO {
  schedule: ISchedule;
}
export interface deleteScheduleDTO {
  name: string;
}

export interface getTableAllDTO {}
export interface getTableDTO {
  login: string;
}
export interface patchTableDTO {
  updates: ITable;
}
export interface postTableDTO {
  table: ITable;
}
export interface deleteTableDTO {
  name: string;
}

export interface getMenuAllDTO {}
export interface getMenuDTO {
  name: string;
}
export interface patchMenuDTO {
  updates: IMenu;
}
export interface postMenuDTO {
  menu: IMenu;
}
export interface deleteMenuDTO {
  name: string;
}

export interface getContactAllDTO {}
export interface getContactDTO {
  name: string;
}
export interface patchContactDTO {
  updates: IContact;
}
export interface postContactDTO {
  contact: IContact;
}
export interface deleteContactDTO {
  name: string;
}
