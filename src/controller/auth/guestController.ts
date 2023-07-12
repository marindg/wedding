import { Request, Response } from "express";
import { sendResponse, getLogin, handleControllerError } from "utils";
import { IService } from "typings/commun";
import * as guestService from "service/auth/guestService";
import { createGuestByLoginDTO, readGuestByLoginDTO, patchGuestByIdDTO } from "typings/dto";
import { IGuest } from "typings/user";
import { ErrorHandler } from "middleware";
import { httpStatusCodes } from "constant";

export const createGuestByLogin = async (req: Request<{}, {}, createGuestByLoginDTO>, res: Response) => {
  try {
    const login: string = getLogin(req);
    const guest: IGuest = req.body.guest;
    const result: IService = await guestService.createGuestByLogin({ login, guest });
    return sendResponse(res, result.code, result.status, result.message);
  } catch (error: unknown) {
    return handleControllerError(error, res);
  }
};

export const readGuestByLogin = async (req: Request<{}, {}, readGuestByLoginDTO>, res: Response) => {
  try {
    const login: string = getLogin(req);
    const result: IService = await guestService.readGuestByLogin({ login });
    return sendResponse(res, result.code, result.status, result.message);
  } catch (error: unknown) {
    return handleControllerError(error, res);
  }
};

export const patchGuestById = async (req: Request<{}, {}, patchGuestByIdDTO>, res: Response) => {
  try {
    const { guestId, updates }: patchGuestByIdDTO = req.body;

    const control = req.user!.guest.find((el) => el.toString() === guestId.toString());

    if (!req.user!.isAdmin && !control) {
      throw new ErrorHandler(httpStatusCodes.UNAUTHORIZED, `Your login is not authorized to fix other guest than yours.`);
    }

    const result: IService = await guestService.patchGuestById({ guestId, updates });
    return sendResponse(res, result.code, result.status, result.message);
  } catch (error: unknown) {
    return handleControllerError(error, res);
  }
};
