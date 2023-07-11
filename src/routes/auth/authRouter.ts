import express, { Router } from "express";
import connexionRouter from "routes/auth/connexionRouter";
import userRouter from "routes/auth/userRouter";
import guestRouter from "routes/auth/guestRouter";
import { authMiddleware } from "middleware/authMiddleware";

const authRouter: Router = express.Router();

authRouter.use("/connexion", connexionRouter);
authRouter.use("/user", authMiddleware(false), userRouter);
authRouter.use("/guest", authMiddleware(false), guestRouter);

export default authRouter;
