import express, { Router } from "express";
import * as connectionController from "controller/auth/connectionController";

const contactRouterAdmin: Router = express.Router();

contactRouterAdmin.get("/", connectionController.accessLogin);
contactRouterAdmin.patch("/", connectionController.accessLogin);
contactRouterAdmin.post("/", connectionController.accessLogin);
contactRouterAdmin.delete("/", connectionController.accessLogin);

export default contactRouterAdmin;
