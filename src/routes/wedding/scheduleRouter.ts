import express, { Router } from "express";
import * as connectionController from "controller/auth/connectionController";

const scheduleRouter: Router = express.Router();

scheduleRouter.get("/", connectionController.accessLogin);

export default scheduleRouter;
