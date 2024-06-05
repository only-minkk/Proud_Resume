import { Router } from "express";
import { authorizeUser } from "../../../middleware/authorizeUser.js";
import { getUsers, updateUser } from "../controllers/userController.js";

const userRouter = Router();

userRouter.get("/users", getUsers);
userRouter.put("/users/:id", authorizeUser, updateUser);

export default userRouter;
