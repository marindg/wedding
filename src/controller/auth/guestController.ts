import { Request, Response } from "express";
import { sendResponse } from "utils";
import { IService } from "typings/commun";
import * as guestService from "service/auth/guestService";
import { createGuestByLoginDTO, readGuestByLoginDTO, patchGuestByIdDTO } from "typings/dto";
import { IGuest } from "typings/user";

export const createGuestByLogin = async (req: Request<{}, {}, createGuestByLoginDTO>, res: Response) => {
  let login: string;
  if (req.user!.isAdmin) {
    login = req.body.login.toUpperCase();
  } else {
    login = req.user!.login.toString().toUpperCase();
  }
  const guest: IGuest = req.body.guest;
  const result: IService = await guestService.createGuestByLogin({ login, guest });
  return sendResponse(res, result.code, result.status, result.message);
};

export const readGuestByLogin = async (req: Request<{}, {}, readGuestByLoginDTO>, res: Response) => {
  let login: string;
  if (req.user!.isAdmin) {
    login = req.body.login.toUpperCase();
  } else {
    login = req.user!.login.toString().toUpperCase();
  }
  const result: IService = await guestService.readGuestByLogin({ login });
  return sendResponse(res, result.code, result.status, result.message);
};

export const patchGuestById = async (req: Request<{}, {}, patchGuestByIdDTO>, res: Response) => {
  const { guestId, updates } = req.body;
  const result: IService = await guestService.patchGuestById({ guestId, updates });
  return sendResponse(res, result.code, result.status, result.message);
};
