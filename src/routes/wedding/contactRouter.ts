import express, { Router } from "express";
import * as connectionController from "controller/auth/connectionController";

const contactRouter: Router = express.Router();

contactRouter.get("/", connectionController.accessLogin);

export default contactRouter;
