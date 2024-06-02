import { Router } from "express";
import { getUsers, createUser } from "../controllers/userController.js";

const userAuthRouter = Router();

userAuthRouter.get("/users", getUsers);
userAuthRouter.post("/users", createUser);

export default userAuthRouter;
