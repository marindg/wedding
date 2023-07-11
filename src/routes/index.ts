import { Router, Request, Response } from "express";
import authRouter from "@routes/auth/authRouter";
import adminRouter from "@routes/admin/adminRouter";
import { sendResponse } from "utils";
import { limiter } from "middleware/limiter";
import { authMiddleware } from "@middleware/authMiddleware";

const router: Router = Router();

router.use("/auth", limiter, authRouter);
router.use("/admin", authMiddleware(true), limiter, adminRouter);

router.use("*", (_req: Request, res: Response) => {
  sendResponse(res, 404, "error", "The server cannot find the requested resource.");
});

export default router;
