import express, { Router } from "express";
import * as authController from "@controller/auth/login";
import { adminOnly } from "middleware/adminOnly";

const authRouter: Router = express.Router();

authRouter.get("/", authController.getAccessLogin);
authRouter.post("/", authController.createLogin);
authRouter.patch("/activate", adminOnly, authController.getUserActivated);
authRouter.patch("/desactivate", adminOnly, authController.getUserDesactivated);

export default authRouter;
