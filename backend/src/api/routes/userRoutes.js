import { Router } from "express";
import { authorizeUser } from "../../../middleware/authorizeUser.js";
import { getUsers, updateUser } from "../controllers/userController.js";

const userRouter = Router();

userRouter.get("/:userId", authorizeUser, getUsers);
userRouter.put("/:userId", authorizeUser, updateUser);
//todo delete 추가

export default userRouter;
