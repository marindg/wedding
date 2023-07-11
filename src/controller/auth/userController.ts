import { Request, Response } from "express";
import { sendResponse, getLogin, handleControllerError } from "utils";
import { IService } from "typings/commun";
import * as userService from "service/auth/userService";
import { IUser } from "typings/user";
import { readUserDTO, patchUserDTO } from "typings/dto";

export const readUser = async (req: Request<{}, {}, readUserDTO>, res: Response) => {
  try {
    const login = getLogin(req);
    const result: IService = await userService.readUser({ login });
    return sendResponse(res, result.code, result.status, result.message);
  } catch (error: unknown) {
    return handleControllerError(error, res);
  }
};

export const patchUser = async (req: Request<{}, {}, patchUserDTO>, res: Response) => {
  try {
    const login = getLogin(req);
    const updates: Partial<IUser> = req.body.updates;
    const result: IService = await userService.patchUser({ login, updates });
    return sendResponse(res, result.code, result.status, result.message);
  } catch (error: unknown) {
    return handleControllerError(error, res);
  }
};
