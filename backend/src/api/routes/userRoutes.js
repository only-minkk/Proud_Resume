import { Router } from "express";
import loginRequired from "../../../middleware/loginRequired.js";
import { getUsers, updateUser } from "../controllers/userController.js";

const userRouter = Router();

userRouter.use(loginRequired);
userRouter.get("/users", getUsers);
userRouter.put("/users/:id", updateUser);

export default userRouter;
