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

// 특정 이력서에 대한 피드백 생성
feedbackRouter.post("/:resumeId", authorizeUser, createFeedback);
// 특정 이력서의 모든 피드백 조회
feedbackRouter.get("/:resumeId", getFeedbacks);
// 특정 이력서의 특정 피드백 조회
feedbackRouter.get("/:resumeId/:feedbackId", authorizeUser, usersFeedbacks);
// 특정 이력서의 특정 피드백 업데이트
feedbackRouter.put("/:resumeId/:feedbackId", authorizeUser, updateFeedback);
// 특정 이력서의 특정 피드백 삭제
feedbackRouter.delete("/:resumeId/:feedbackId", authorizeUser, deleteFeedback);

export default feedbackRouter;
