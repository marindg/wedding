import { Request, Response } from "express";
import { sendResponse } from "utils";
import { IService } from "typings/commun";
import * as connectionService from "service/auth/connexionService";
import { createLoginDTO, accessLoginDTO } from "typings/dto";

export const accessLogin = async (req: Request, res: Response) => {
  const { login }: accessLoginDTO = req.body;
  const result: IService = await connectionService.accessLogin(login);
  return sendResponse(res, result.code, result.status, result.message);
};

export const createLogin = async (req: Request, res: Response) => {
  const { login, password }: createLoginDTO = req.body;
  const result: IService = await connectionService.createLogin({ login, password });
  return sendResponse(res, result.code, result.status, result.message);
};
