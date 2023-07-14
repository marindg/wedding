import jwt from "jsonwebtoken";
import { IGenerateToken } from "typings/user";
import dotenv from "dotenv";

dotenv.config();

export function generateToken({ user, type }: IGenerateToken) {
  const payload = type === "user" ? { user } : { createLogin: true };
  const expiresIn =
    type === "user"
      ? process.env.JWT_USER_EXPIRES_IN
      : process.env.JWT_CREATE_LOGIN_EXPIRES_IN;
  const secretKey =
    type === "user"
      ? process.env.JWT_SECRET!
      : process.env.JWT_SECRET_CREATE_LOGIN!;

  return jwt.sign(payload, secretKey, {
    expiresIn: expiresIn,
  });
}
