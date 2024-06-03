import express from "express";
import authRouter from "./api/routes/authRoutes.js";
import userRouter from "./api/routes/userRoutes.js";

const app = express();
app.use(express.json());
app.use(authRouter);
app.use(userRouter);

export default app;
