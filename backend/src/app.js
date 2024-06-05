import express from "express";
import authRouter from "./api/routes/authRoutes.js";
import loginRequired from "../middleware/loginRequired.js";
import userRouter from "./api/routes/userRoutes.js";
import resumeRouter from "./api/routes/resumeRoutes.js";

const app = express();

app.use(express.json());

app.use(authRouter);
app.use(loginRequired);
app.use(userRouter);
app.use(resumeRouter);

export default app;
