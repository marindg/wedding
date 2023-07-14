import express, { Router } from "express";
import * as connectionController from "controller/auth/connectionController";

const scheduleRouterAdmin: Router = express.Router();

scheduleRouterAdmin.get("/", connectionController.accessLogin);
scheduleRouterAdmin.patch("/", connectionController.accessLogin);
scheduleRouterAdmin.post("/", connectionController.accessLogin);
scheduleRouterAdmin.delete("/", connectionController.accessLogin);

export default scheduleRouterAdmin;
