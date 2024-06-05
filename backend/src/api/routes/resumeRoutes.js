import { Router } from "express";
import { authorizeUser } from "../../../middleware/authorizeUser.js";
import {
  createResume,
  getUsersResumes,
  getResumes,
  updateResume,
  deleteResume,
} from "../controllers/resumeController.js";

const resumeRouter = Router();

resumeRouter.post("/users/:id/resumes", authorizeUser, createResume);
resumeRouter.get("/users/:id/resumes", authorizeUser, getUsersResumes);
resumeRouter.get("/users/resumes", getResumes);
resumeRouter.put("/users/:id/resumes/:resumeId", authorizeUser, updateResume);
resumeRouter.delete(
  "/users/:id/resumes/:resumeId",
  authorizeUser,
  deleteResume
);

export default resumeRouter;
