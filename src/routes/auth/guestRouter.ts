import express, { Router } from "express";
import * as guestController from "controller/auth/guestController";
import { validate } from "middleware";
import { guestValidator } from "schemas";

const guestRouter: Router = express.Router();

guestRouter.post("/", validate(guestValidator.createGuestByLoginDTOSchema), guestController.createGuestByLogin);
guestRouter.get("/", validate(guestValidator.readGuestByLoginDTOSchema), guestController.readGuestByLogin);
guestRouter.patch("/", validate(guestValidator.patchGuestByIdDTOSchema), guestController.patchGuestById);

export default guestRouter;
