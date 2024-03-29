import express, { Router } from "express";
import * as userControllerAdmin from "controller/admin/userControllerAdmin";
import { userValidatorAdmin } from "schemas";
import { validate } from "middleware";

const userRouterAdmin: Router = express.Router();

userRouterAdmin.get("/", validate(userValidatorAdmin.readUsersAdminSchema), userControllerAdmin.readUsers);
userRouterAdmin.patch("/", validate(userValidatorAdmin.activateUserByLoginAdminSchema), userControllerAdmin.activateUserByLoginAdmin);

export default userRouterAdmin;
