import User from "../models/userModel.js";
import bcrypt from "bcrypt";
import redisClient from "../../../config/redis.js";

// 개인정보 조회
export const getUsers = async (req, res) => {
  try {
    // 유저 정보 조회
    const user = await User.find({ _id: req.userId });

    // 유저가 존재하지 않다면 throw 에러
    if (!user) {
      console.log("존재하지 않는 유저입니다.");
      throw new Error("존재하지 않는 유저입니다.");
    }

    // 유저 정보 반환.
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 개인정보 수정
export const updateUser = async (req, res) => {
  try {
    // 유저 조회
    const user = await User.findOne({ _id: req.userId });
    if (!user) {
      console.log("존재하지 않는 유저입니다.");
      throw new Error("존재하지 않는 유저입니다.");
    }

    // 유저의 해시된 비밀번호와 입력된 현재 비밀번호 비교
    const comparePassword = await bcrypt.compare(
      req.body.currentPassword,
      user.password
    );

    // 현재 비밀번호가 기존 비밀번호와 다르다면 에러
    if (!comparePassword) {
      console.log("기존 비밀번호를 다시 확인하여 주세요.");
      return res.status(400).json({
        error: "Invalid input value",
        message: "기존 비밀번호를 다시 확인하여 주세요.",
      });
    }

    // 새 비밀번호 해쉬화
    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    // 개인정보 업데이트
    const updatedUser = await User.findOneAndUpdate(
      { _id: user._id },
      {
        name: req.body.name,
        password: hashedPassword,
      }
    );

    // 수정 완료 응답 반환
    console.log("수정완료", updatedUser);
    res.status(200).json({ success: true, message: "업데이트 성공" });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// 로그아웃
export const logoutUser = async (req, res) => {
  try {
    // 레디스 클라이언트에 userId를 키 값으로 하여 token 필드에 토큰값 저장.
    await redisClient.hSet(`${req.userId}`, "token", req.userToken);
    await redisClient.hGetAll(`${req.userId}`, (err, obj) => {
      console.log(obj);
    });

    // 로그아웃 완료 응답 반환
    res.status(200).json({ success: true, message: "로그아웃 성공" });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};
