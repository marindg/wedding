import express, { Router } from "express";
import * as connectionController from "controller/auth/connectionController";

const menuRouterAdmin: Router = express.Router();

menuRouterAdmin.get("/", connectionController.accessLogin);
menuRouterAdmin.patch("/", connectionController.accessLogin);
menuRouterAdmin.post("/", connectionController.accessLogin);
menuRouterAdmin.delete("/", connectionController.accessLogin);

export default menuRouterAdmin;
