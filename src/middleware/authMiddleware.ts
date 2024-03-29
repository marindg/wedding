import { verifyToken } from "@utils/verifyToken";
import { Request, Response, NextFunction } from "express";
import User from "models/userModel";
import { IUser } from "typings/user";
import { sendResponse } from "utils";

declare global {
  namespace Express {
    interface Request {
      user?: IUser;
    }
  }
}

export const authMiddleware = (roleCheck: boolean) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const authHeader = req.headers.authorization;

      if (!authHeader) {
        return sendResponse(res, 401, "error", "No token provided");
      }

      const token = authHeader.split(" ")[1];

      const decoded = verifyToken(token, process.env.JWT_SECRET!);

      let login = "";

      if (typeof decoded !== "string" && decoded.user) {
        login = decoded.user.login;
      } else {
        return sendResponse(res, 400, "error", "Wrong token");
      }

      const user = await User.findOne({ login: login });

      if (!user) {
        return sendResponse(res, 404, "error", "User not found");
      }

      if (!user.activate || (roleCheck && !user.isAdmin)) {
        return sendResponse(res, 403, "error", "Unauthorized");
      }

      req.user = user;
      return next();
    } catch (error: any) {
      return sendResponse(res, 500, "error", error.message!);
    }
  };
};
