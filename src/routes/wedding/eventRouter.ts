import express, { Router } from "express";
import * as connectionController from "controller/auth/connectionController";

const eventRouter: Router = express.Router();

eventRouter.get("/", connectionController.accessLogin);

export default eventRouter;
