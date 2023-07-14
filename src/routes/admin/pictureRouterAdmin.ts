import express, { Router } from "express";
import * as connectionController from "controller/auth/connectionController";

const pictureRouterAdmin: Router = express.Router();

pictureRouterAdmin.get("/", connectionController.accessLogin);
pictureRouterAdmin.patch("/", connectionController.accessLogin);
pictureRouterAdmin.post("/", connectionController.accessLogin);
pictureRouterAdmin.delete("/", connectionController.accessLogin);

export default pictureRouterAdmin;
