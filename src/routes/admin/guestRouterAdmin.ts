import express, { Router } from "express";
import * as guestControllerAdmin from "controller/admin/guestControllerAdmin";
import { guestValidatorAdmin } from "schemas";
import { validate } from "middleware";

const guestRouterAdmin: Router = express.Router();

guestRouterAdmin.get("/", validate(guestValidatorAdmin.readGuestAdminSchema), guestControllerAdmin.readGuests);

export default guestRouterAdmin;
