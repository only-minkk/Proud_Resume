import { Router } from "express";
import { getUsers, updateUser } from "../controllers/userController.js";

const userRouter = Router();

userRouter.get("/users", getUsers);
userRouter.put("/users/:id", updateUser);

export default userRouter;
