import jwt from "jsonwebtoken";

export function verifyToken(token: string, key: string): any {
  const decoded = jwt.verify(token, key);
  return decoded;
}
