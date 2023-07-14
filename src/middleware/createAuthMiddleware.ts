import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { sendResponse } from "utils";

export const createAuthMiddleware = () => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const authHeader = req.headers.authorization;

      if (!authHeader) {
        return sendResponse(res, 401, "error", "No token provided");
      }

      const token = authHeader.split(" ")[1];

      const decoded = jwt.verify(token, process.env.JWT_SECRET_CREATE_LOGIN!);

      let createLogin: boolean = false;

      console.log("decoded:", decoded);

      if (typeof decoded !== "string" && decoded.createLogin) {
        createLogin = decoded.createLogin;
      } else {
        return sendResponse(res, 400, "error", "Wrong token");
      }

      if (!createLogin) {
        return sendResponse(res, 403, "error", "Unauthorized");
      }

      return next();
    } catch (error: any) {
      return sendResponse(res, 500, "error", error.message!);
    }
  };
};
