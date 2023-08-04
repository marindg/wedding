import { Request, Response } from "express";
import { sendResponse, handleControllerError } from "utils";
import { IService } from "typings/commun";
import * as connectionService from "@service/auth/connectionService";
import { createLoginDTO, accessLoginDTO, resetTokenDTO } from "typings/dto";

export const accessLogin = async (req: Request, res: Response) => {
  try {
    if (typeof req.query.login === "string") {
      const login: accessLoginDTO = { login: req.query.login };
      const result: IService = await connectionService.accessLogin(login);
      return sendResponse(res, result.code, result.status, result.message);
    } else {
      return handleControllerError(new Error("params login is missing"), res);
    }
  } catch (error: unknown) {
    return handleControllerError(error, res);
  }
};

export const createLogin = async (req: Request, res: Response) => {
  try {
    const { login }: createLoginDTO = req.body;
    const result: IService = await connectionService.createLogin({
      login,
    });

    return sendResponse(res, result.code, result.status, result.message);
  } catch (error: unknown) {
    return handleControllerError(error, res);
  }
};

export const resetToken = async (req: Request, res: Response) => {
  try {
    if (typeof req.params.token === "string") {
      const token: resetTokenDTO = { token: req.params.token };
      console.log("token from controller:", token);

      const result: IService = await connectionService.resetToken(token);
      return sendResponse(res, result.code, result.status, result.message);
    } else {
      return handleControllerError(new Error("params token is missing"), res);
    }
  } catch (error: unknown) {
    return handleControllerError(error, res);
  }
};
