import express, { Router } from "express";
import * as connectionController from "controller/auth/connectionController";
import { validate } from "middleware";
import { connectionValidator } from "schemas";
import { createAuthMiddleware } from "middleware";

const connectionRouter: Router = express.Router();

connectionRouter.post("/create", validate(connectionValidator.createLoginSchema), createAuthMiddleware(), connectionController.createLogin);
connectionRouter.post("/login", validate(connectionValidator.accessLoginSchema), connectionController.accessLogin);
connectionRouter.post("/token", validate(connectionValidator.resetToken), connectionController.resetToken);

export default connectionRouter;
