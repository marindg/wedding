import express, { Router } from "express";
import * as connectionController from "controller/auth/connectionController";
import { validate } from "middleware";
import { connectionValidator } from "schemas";

const connectionRouter: Router = express.Router();

connectionRouter.get("/", validate(connectionValidator.accessLoginSchema), connectionController.accessLogin);
connectionRouter.post("/", validate(connectionValidator.createLoginSchema), connectionController.createLogin);

export default connectionRouter;
