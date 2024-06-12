import User from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const createUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    console.log(req.body);

    const checkEmailExists = await User.exists({ email: email });
    if (checkEmailExists) {
      console.log("이미 존재하는 이메일입니다.");
      throw new Error("이미 존재하는 이메일입니다.");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
    });

    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const login = async (req, res) => {
  try {
    console.log(req.body);
    const { email, password } = req.body;

    const user = await User.findOne({ email: email });
    if (!user) {
      console.log("이메일을 다시 확인하여 주십시오.");
      throw new Error("이메일을 다시 확인하여 주십시오.");
    }

    const correctPassword = user.password;
    const comparePassword = await bcrypt.compare(password, correctPassword);
    if (!comparePassword) {
      console.log("비밀번호를 다시 확인하여 주십시오.");
      throw new Error("비밀번호를 다시 확인하여 주십시오.");
    }

    const secretKey = process.env.JWT_SECRET_KEY;
    const accessToken = jwt.sign({ id: user._id }, secretKey, {
      expiresIn: "30m",
    });

    const refreshSecretKey = process.env.REFRESH_JWT_SECRET_KEY;
    const refreshToken = jwt.sign({ id: user._id }, refreshSecretKey, {
      expiresIn: "60m",
    });

    res.header({
      AccessToken: accessToken,
      RefreshToken: refreshToken,
      userId: user._id,
    });
    res.status(200).send({ success: true, message: "로그인 성공" });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};
