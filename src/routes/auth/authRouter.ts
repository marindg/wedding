import express, { Router } from "express";
import * as authController from "@controller/auth/loginController";
import * as guestController from "controller/auth/guestController";
import { authMiddleware } from "@middleware/authMiddleware";

const authRouter: Router = express.Router();

// Manage User
authRouter.get("/", authController.getAccessLogin);
authRouter.post("/", authController.createLogin);
authRouter.patch("/activate", authMiddleware(true), authController.getUserActivated);
authRouter.patch("/desactivate", authMiddleware(true), authController.getUserDesactivated);

// Manage Guest
// authRouter.get("/guest", userOnly, guestController.createGuest);
authRouter.post("/guest", authMiddleware(false), guestController.createGuest);
// authRouter.patch("/guest/:index", userOnly, guestController.createGuest);
// authRouter.patch("/guest/:index/present", userOnly, guestController.createGuest);
// authRouter.patch("/guest/:index/absent", userOnly, guestController.createGuest);
// authRouter.patch("/guest/:index/diet", userOnly, guestController.createGuest);
// authRouter.patch("/guest/:index/comment", userOnly, guestController.createGuest);

export default authRouter;
