import express, { Router } from "express";
import guestRouter from "routes/auth/guestRouter";
import userRouter from "routes/auth/userRouter";

const adminRouter: Router = express.Router();

adminRouter.use("/user", userRouter);
adminRouter.use("/guest", guestRouter);

export default adminRouter;
