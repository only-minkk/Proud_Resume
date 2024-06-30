import { Router } from "express";
import { authorizeUser } from "../../../middleware/authorizeUser.js";
import {
  createResume,
  getUsersResumes,
  getResumes,
  getResumeDetail,
  updateResume,
  deleteResume,
} from "../controllers/resumeController.js";

const resumeRouter = Router();

// 특정 사용자의 이력서 생성
resumeRouter.post("/:userId", authorizeUser, createResume);
// 특정 사용자의 모든 이력서 조회
resumeRouter.get("/:userId", authorizeUser, getUsersResumes);
// 모든 이력서 조회 (공개 체크한 이력서들)
resumeRouter.get("/", getResumes);
// 특정 이력서 조회
resumeRouter.get("/:userId/:resumeId", authorizeUser, getResumeDetail);
// 특정 사용자의 특정 이력서 업데이트
resumeRouter.put("/:userId/:resumeId", authorizeUser, updateResume);
// 특정 사용자의 특정 이력서 삭제
resumeRouter.delete("/:userId/:resumeId", authorizeUser, deleteResume);

export default resumeRouter;
