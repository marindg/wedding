import { Request, Response } from "express";
import { sendResponse, handleControllerError } from "utils";
import { IService } from "typings/commun";
import * as connectionService from "@service/auth/connectionService";
import { createLoginDTO, accessLoginDTO } from "typings/dto";

export const accessLogin = async (req: Request, res: Response) => {
  try {
    const { login }: accessLoginDTO = req.body;
    const result: IService = await connectionService.accessLogin({ login });
    return sendResponse(res, result.code, result.status, result.message);
  } catch (error: unknown) {
    return handleControllerError(error, res);
  }
};

export const createLogin = async (req: Request, res: Response) => {
  try {
    const { login, password }: createLoginDTO = req.body;
    const result: IService = await connectionService.createLogin({ login, password });
    return sendResponse(res, result.code, result.status, result.message);
  } catch (error: unknown) {
    return handleControllerError(error, res);
  }
};
