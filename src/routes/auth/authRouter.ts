import express, { Router } from "express";
import * as authController from "@controller/auth/login";

const authRouter: Router = express.Router();

authRouter.get("/", authController.getAccessLogin);
authRouter.post("/", authController.createLogin);

export default authRouter;
