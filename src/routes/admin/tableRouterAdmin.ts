import express, { Router } from "express";
import * as connectionController from "controller/auth/connectionController";

const tableRouterAdmin: Router = express.Router();

tableRouterAdmin.get("/", connectionController.accessLogin);
tableRouterAdmin.patch("/", connectionController.accessLogin);
tableRouterAdmin.post("/", connectionController.accessLogin);
tableRouterAdmin.delete("/", connectionController.accessLogin);

export default tableRouterAdmin;
