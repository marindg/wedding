import { Request } from "express";

export const getLogin = (req: Request): string => {
  return req.user!.isAdmin ? req.body.login.toUpperCase() : req.user!.login.toString().toUpperCase();
};
