import express, { Router } from "express";
import * as connectionController from "controller/auth/connectionController";

const tableRouter: Router = express.Router();

tableRouter.get("/", connectionController.accessLogin);

export default tableRouter;
