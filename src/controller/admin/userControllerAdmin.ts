import { Request, Response } from "express";
import { sendResponse, handleControllerError } from "utils";
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
