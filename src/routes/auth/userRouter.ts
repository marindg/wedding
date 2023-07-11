import express, { Router } from "express";
import * as userController from "controller/auth/userController";
import { userValidator } from "schemas";
import { validate } from "middleware";

const userRouter: Router = express.Router();

userRouter.get("/", validate(userValidator.readUserSchema), userController.readUser);
userRouter.patch("/", validate(userValidator.patchUserSchema), userController.patchUser);

export default userRouter;
