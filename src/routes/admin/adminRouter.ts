import express, { Router } from "express";
// import guestRouter from "routes/auth/guestRouter";
// import userRouter from "routes/auth/userRouter";

const adminRouter: Router = express.Router();

// remove routes cause no need. Go direct to auth/user or auth/guest
// adminRouter.use("/user", userRouter);
// adminRouter.use("/guest", guestRouter);

export default adminRouter;
