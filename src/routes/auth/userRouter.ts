import express, { Router } from "express";
import * as userController from "controller/auth/userController";

const userRouter: Router = express.Router();

userRouter.get("/", userController.readUser);
userRouter.patch("/", userController.patchUser);

export default userRouter;
