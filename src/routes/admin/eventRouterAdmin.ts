import express, { Router } from "express";
import * as connectionController from "controller/auth/connectionController";

const eventRouterAdmin: Router = express.Router();

eventRouterAdmin.get("/", connectionController.accessLogin);
eventRouterAdmin.patch("/", connectionController.accessLogin);
eventRouterAdmin.post("/", connectionController.accessLogin);
eventRouterAdmin.delete("/", connectionController.accessLogin);

export default eventRouterAdmin;
