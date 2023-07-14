import express, { Router } from "express";
import * as connectionController from "controller/auth/connectionController";

const pictureRouter: Router = express.Router();

pictureRouter.get("/", connectionController.accessLogin);

export default pictureRouter;
