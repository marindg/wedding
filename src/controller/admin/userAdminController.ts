// import { Request, Response } from "express";
// import { sendResponse } from "utils";
// import dotenv from "dotenv";
// import { IGuest } from "typings/user";
// import { IService } from "typings/commun";
// import * as guestService from "service/auth/guestService";

// dotenv.config();

// export const getAllGuest = async (req: Request, res: Response) => {
//   const activated: boolean = req.params.activated.toLowerCase() === "true";
//   const result: IService = await guestService.getAllGuest(activated);
//   return sendResponse(res, result.code, result.status, result.message);
// };

// export const getUserByLogin = async (req: Request, res: Response) => {
//   const login: string = req.params.login;
//   const result: IService = await guestService.getUser(login);
//   return sendResponse(res, result.code, result.status, result.message);
// };

// export const getAllUser = async (req: Request, res: Response) => {
//   const activated: boolean = req.params.activated.toLowerCase() === "true";
//   const result: IService = await guestService.getAllGuest(activated);
//   return sendResponse(res, result.code, result.status, result.message);
// };
