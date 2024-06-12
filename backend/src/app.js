import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import authRouter from "./api/routes/authRoutes.js";
import loginRequired from "../middleware/loginRequired.js";
import userRouter from "./api/routes/userRoutes.js";
import resumeRouter from "./api/routes/resumeRoutes.js";
import feedbackRouter from "./api/routes/feedbackRoutes.js";

const app = express();

app.use(express.json());

app.use("/auth", authRouter);
app.use("/users", loginRequired, userRouter);
app.use("/resumes", loginRequired, resumeRouter);
app.use("/feedbacks", loginRequired, feedbackRouter);

export default app;
