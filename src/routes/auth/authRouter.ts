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

// Manage User
authRouter.get("/users/:activated", authMiddleware(true), guestController.getUser);
authRouter.get("/user/:login", authMiddleware(true), guestController.getUserByLogin);
authRouter.get("/user", authMiddleware(false), guestController.getUser);

// Manage Guest
authRouter.get("/guests/:activated", authMiddleware(true), guestController.getAllGuest);
authRouter.post("/guest", authMiddleware(false), guestController.createGuest);
// authRouter.patch("/guest/:index", userOnly, guestController.createGuest);
// authRouter.patch("/guest/:index/present", userOnly, guestController.createGuest);
// authRouter.patch("/guest/:index/absent", userOnly, guestController.createGuest);
// authRouter.patch("/guest/:index/diet", userOnly, guestController.createGuest);
// authRouter.patch("/guest/:index/comment", userOnly, guestController.createGuest);

export default authRouter;
