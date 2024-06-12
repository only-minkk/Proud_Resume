import { Router } from "express";
import { createUser, login } from "../controllers/authController.js";

const authRouter = Router();

// 회원가입
authRouter.post("/register", createUser);

// 로그인
authRouter.post("/login", login);

export default authRouter;
