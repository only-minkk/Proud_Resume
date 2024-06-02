import express from "express";
import userAuthRouter from "./api/routes/userRoutes.js";

const app = express();
app.use(express.json());
app.use(userAuthRouter);

export default app;
