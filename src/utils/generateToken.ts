import jwt from "jsonwebtoken";
import { IUser } from "typings/user";
import dotenv from "dotenv";

dotenv.config();

export function generateToken(user: IUser) {
  return jwt.sign({ user }, process.env.JWT_SECRET!, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
}
