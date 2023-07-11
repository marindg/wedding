import express, { Router } from "express";
import * as connectionController from "@controller/auth/connectionController";

const connexionRouter: Router = express.Router();

// Manage User
connexionRouter.get("/", connectionController.accessLogin);
connexionRouter.post("/", connectionController.createLogin);

export default connexionRouter;
