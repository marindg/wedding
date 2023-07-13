import express, { Router } from "express";
import userRouterAdmin from "routes/admin/userRouterAdmin";
import guestRouterAdmin from "routes/admin/guestRouterAdmin";

const adminRouter: Router = express.Router();

adminRouter.use("/user", userRouterAdmin);
adminRouter.use("/guest", guestRouterAdmin);

export default adminRouter;
