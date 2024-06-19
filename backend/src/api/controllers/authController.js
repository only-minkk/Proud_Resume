import User from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// 회원가입
export const createUser = async (req, res) => {
  try {
    // 이메일 중복 검사
    const checkEmailExists = await User.exists({ email: req.body.email });
    if (checkEmailExists) {
      console.log("이미 존재하는 이메일입니다.");
      throw new Error("이미 존재하는 이메일입니다.");
    }

    // 비밀번호 해쉬화
    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    // 유저 객체 생성
    const newUser = new User({
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword,
    });

    // 유저 객체 저장
    const savedUser = await newUser.save();

    // 회원가입 성공 시 성공 메시지 반환
    res.status(201).json({ success: true, message: "회원가입 성공" });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// 로그인
export const login = async (req, res) => {
  try {
    // 이메일 검사
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      console.log("이메일을 다시 확인하여 주십시오.");
      throw new Error("이메일을 다시 확인하여 주십시오.");
    }

    // 저장된 비밀번호와 입력된 비밀번호 검증
    const comparePassword = await bcrypt.compare(
      req.body.password,
      user.password
    );

    // 비밀번호가 일치하지 않다면 에러 반환
    if (!comparePassword) {
      console.log("비밀번호를 다시 확인하여 주십시오.");
      throw new Error("비밀번호를 다시 확인하여 주십시오.");
    }

    // JWT access 토큰 생성
    const secretKey = process.env.JWT_SECRET_KEY;
    const accessToken = jwt.sign({ id: user._id }, secretKey, {
      expiresIn: "30m",
    });

    // JWT refresh 토큰 생성
    const refreshSecretKey = process.env.REFRESH_JWT_SECRET_KEY;
    const refreshToken = jwt.sign({ id: user._id }, refreshSecretKey, {
      expiresIn: "60m",
    });

    // HTTP 헤더에 토큰과 id를 포함시켜 응답
    res.header({
      AccessToken: accessToken,
      RefreshToken: refreshToken,
      userId: user._id,
    });

    // 로그인 성공 메시지 반환
    res.status(200).send({ success: true, message: "로그인 성공" });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};
