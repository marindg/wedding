import { Request, Response } from "express";
import { sendResponse, handleControllerError } from "utils";
import { IService } from "typings/commun";
import * as guestServiceAdmin from "service/admin/guestServiceAdmin";

export const readGuests = async (_req: Request, res: Response) => {
  try {
    const result: IService = await guestServiceAdmin.readGuests();
    return sendResponse(res, result.code, result.status, result.message);
  } catch (error: unknown) {
    return handleControllerError(error, res);
  }
};
