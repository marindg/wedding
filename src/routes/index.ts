import { Router, Request, Response } from "express";
import authRouter from "@routes/auth/authRouter";
import adminRouter from "@routes/admin/adminRouter";
import { limiter } from "middleware/limiter";
import { authMiddleware } from "@middleware/authMiddleware";
import { httpStatusCodes } from "@constant/index";
import { ErrorHandler } from "middleware";

const router: Router = Router();

router.use("/auth", limiter, authRouter);
router.use("/admin", authMiddleware(true), limiter, adminRouter);

router.use("*", (_req: Request, _res: Response) => {
  throw new ErrorHandler(httpStatusCodes.NOT_FOUND, "The server cannot find the requested resource.");
});

export default router;
