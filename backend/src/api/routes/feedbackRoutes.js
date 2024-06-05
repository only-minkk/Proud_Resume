import { Router } from "express";
import { authorizeUser } from "../../../middleware/authorizeUser.js";
import {
  createFeedback,
  getFeedbacks,
  usersFeedbacks,
  updateFeedback,
  deleteFeedback,
} from "../controllers/feedbackController.js";

const feedbackRouter = Router();

feedbackRouter.post(
  "/users/resumes/:resumeId/feedbacks/:id",
  authorizeUser,
  createFeedback
);
feedbackRouter.get(
  "/users/resumes/feedbacks/:id",
  authorizeUser,
  usersFeedbacks
);
feedbackRouter.get("/users/resumes/:resumeId/feedbacks", getFeedbacks);
feedbackRouter.put(
  "/users/resumes/:resumeId/:id/feedbacks/:feedbackId",
  authorizeUser,
  updateFeedback
);
feedbackRouter.delete(
  "/users/resumes/:resumeId/:id/feedbacks/:feedbackId",
  authorizeUser,
  deleteFeedback
);

export default feedbackRouter;
