import express, { Router } from "express";
import * as connectionController from "controller/auth/connectionController";

const menuRouter: Router = express.Router();

menuRouter.get("/", connectionController.accessLogin);

export default menuRouter;
