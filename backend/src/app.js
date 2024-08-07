import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import authRouter from "./api/routes/authRoutes.js";
import loginRequired from "../middleware/loginRequired.js";
import userRouter from "./api/routes/userRoutes.js";
import resumeRouter from "./api/routes/resumeRoutes.js";
import feedbackRouter from "./api/routes/feedbackRoutes.js";
import { getResumeDetail } from "./api/controllers/resumeController.js";

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.json()); // JSON 본문 파싱
app.use(express.urlencoded({ extended: true })); // URL-encoded 본문 파싱

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "../public")));
app.use("/components", express.static("src/components"));

app.get("/", (req, res) => {
  return res.render("index");
});

app.get("/login", (req, res) => {
  res.render("login"); // 'login.ejs' 를 렌더링
});

app.get("/register", (req, res) => {
  res.render("register"); // 'register.ejs' 를 렌더링
});

app.get("/users", (req, res) => {
  res.render("profile"); // 'profile.ejs'를 렌더링
});

app.get("/resumes/:userId/:resumeId", getResumeDetail); // 'resumeDetail.ejs'를 렌더링

app.use("/token", loginRequired, (req, res) => {
  if (req.userId) {
    res.status(200).json({ success: true, message: "토큰 정상" });
  }
});
app.use("/auth", authRouter);
app.use("/users", loginRequired, userRouter);
app.use("/resumes", loginRequired, resumeRouter);
app.use("/feedbacks", loginRequired, feedbackRouter);

export default app;
