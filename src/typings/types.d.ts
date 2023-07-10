import { IUser } from "./user";
import { Request } from "express";

declare module "express-serve-static-core" {
  export interface Request extends Request {
    user?: IUser;
  }
}
