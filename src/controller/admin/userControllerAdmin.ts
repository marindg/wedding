import { Request, Response } from "express";
import { sendResponse, handleControllerError, getLogin } from "utils";
import { IService } from "typings/commun";
import * as userServiceAdmin from "service/admin/userServiceAdmin";

export const readUsers = async (_req: Request, res: Response) => {
  try {
    const result: IService = await userServiceAdmin.readUsers();
    return sendResponse(res, result.code, result.status, result.message);
  } catch (error: unknown) {
    return handleControllerError(error, res);
  }
};

export const activateUserByLoginAdmin = async (req: Request, res: Response) => {
  try {
    const login = getLogin(req);
    const state: boolean = req.body.state;
    const result: IService = await userServiceAdmin.activateUser({ login, state });
    return sendResponse(res, result.code, result.status, result.message);
  } catch (error: unknown) {
    return handleControllerError(error, res);
  }
};
