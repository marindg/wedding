import { Request, Response } from "express";
import { sendResponse } from "utils";
import { IService } from "typings/commun";
import * as userService from "service/auth/userService";
import { IUser } from "typings/user";
import { readUserDTO, patchUserDTO } from "typings/dto";

export const readUser = async (req: Request<{}, {}, readUserDTO>, res: Response) => {
  let login: string;
  if (req.user!.isAdmin) {
    login = req.body.login.toUpperCase();
  } else {
    login = req.user!.login.toString().toUpperCase();
  }
  const result: IService = await userService.readUser(login);
  return sendResponse(res, result.code, result.status, result.message);
};

export const patchUser = async (req: Request<{}, {}, patchUserDTO>, res: Response) => {
  let login: string;
  if (req.user!.isAdmin) {
    login = req.body.login.toUpperCase();
  } else {
    login = req.user!.login.toString().toUpperCase();
  }
  const updates: Partial<IUser> = req.body.updates;
  const result: IService = await userService.patchUser(login, updates);
  return sendResponse(res, result.code, result.status, result.message);
};
