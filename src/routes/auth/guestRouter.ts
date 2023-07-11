import express, { Router } from "express";
import * as guestController from "controller/auth/guestController";

const guestRouter: Router = express.Router();

guestRouter.post("/", guestController.createGuestByLogin);
guestRouter.get("/", guestController.readGuestByLogin);
guestRouter.patch("/", guestController.patchGuestById);

export default guestRouter;
