import { Request, Response } from "express";
import { sendResponse } from "utils";
import * as userService from "@service/auth/userService";
import { IService } from "typings/commun";

export const getAccessLogin = async (req: Request, res: Response) => {
  const { login } = req.body;
  const result: IService = await userService.getAccess(login);
  return sendResponse(res, result.code, result.status, result.message);
};

export const createLogin = async (req: Request, res: Response) => {
  const { login, password } = req.body;
  const result: IService = await userService.createLogin(login, password);
  return sendResponse(res, result.code, result.status, result.message);
};

export const getUserActivated = async (req: Request, res: Response) => {
  const { login } = req.body;
  const result: IService = await userService.setUserActivation(login, true);
  return sendResponse(res, result.code, result.status, result.message);
};

export const getUserDesactivated = async (req: Request, res: Response) => {
  const { login } = req.body;
  const result: IService = await userService.setUserActivation(login, false);
  return sendResponse(res, result.code, result.status, result.message);
};
