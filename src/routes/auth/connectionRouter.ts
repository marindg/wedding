import express, { Router } from "express";
import * as connectionController from "controller/auth/connectionController";
import { validate } from "middleware";
import { connectionValidator } from "schemas";
import { createAuthMiddleware } from "middleware";

const connectionRouter: Router = express.Router();

connectionRouter.get(
  "/",
  validate(connectionValidator.accessLoginSchema),
  connectionController.accessLogin
);
connectionRouter.post(
  "/",
  validate(connectionValidator.createLoginSchema),
  createAuthMiddleware(),
  connectionController.createLogin
);

export default connectionRouter;
