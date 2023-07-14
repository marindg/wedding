import express, { Router } from "express";
import connectionRouter from "routes/auth/connectionRouter";
import userRouter from "routes/auth/userRouter";
import guestRouter from "routes/auth/guestRouter";

const weddingRouter: Router = express.Router();

weddingRouter.use("/event", connectionRouter);
weddingRouter.use("/schedule", connectionRouter);
weddingRouter.use("/table", connectionRouter);
weddingRouter.use("/menu", connectionRouter);
weddingRouter.use("/contact", userRouter);
weddingRouter.use("/pictureRouter", guestRouter);

export default weddingRouter;
