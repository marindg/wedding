import { Router, Request, Response } from "express";
import authRouter from "@routes/auth/authRouter";
import { sendResponse } from "@utils/responseHandler";
import { limiter } from "@middleware/rateLimite";

const router = Router();

router.use("/auth", limiter, authRouter);

router.use("*", (_req: Request, res: Response) => {
  sendResponse(res, 404, "error", "The server cannot find the requested resource.");
});

export default router;
