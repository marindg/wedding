import express, { Router } from "express";
import * as authController from "@controller/auth/loginController";
import * as guestController from "controller/auth/guestController";

const authRouter: Router = express.Router();

// Manage User
authRouter.patch("/user/activate", authController.getUserActivated);
authRouter.patch("/user/desactivate", authController.getUserDesactivated);
authRouter.get("/user/activate", guestController.getUser);
authRouter.get("/user/desactivate", guestController.getUser);
authRouter.get("/user/:login", guestController.getUserByLogin);

// Manage Guest
authRouter.get("/guest/:activated", guestController.getAllGuest);

export default authRouter;
