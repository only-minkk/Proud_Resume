import jwt from "jsonwebtoken";
import redisClient from "../config/redis.js";

const loginRequired = async (req, res, next) => {
  try {
    // 헤더에서 토큰 추츨(Authorization : Bearer ${token})
    const userToken = req.headers["authorization"]?.split(" ")[1] ?? null;

    // 토큰이 없거나 null인경우 에러 반환
    if (!userToken || userToken === "null") {
      return res.status(500).json({
        error: "The token could not be verified.",
        message: "로그인이 필요합니다.",
      });
    }

    // 토큰 검증
    const secretKey = process.env.JWT_SECRET_KEY;
    const jwtDecoded = jwt.verify(userToken, secretKey);

    // 블랙리스트 가져오기
    const blackList = await redisClient.hGetAll(`${jwtDecoded.id}`);

    // 현재 요청 헤더에 담겨있는 토큰이 블랙리스트 토큰이라면 차단
    if (blackList.token === userToken) {
      console.log("블랙리스트 토큰으로부터 요청이 들어왔습니다.");
      return res.status(401).json({
        error: "Unauthorized",
        message: "접근이 허용되지 않은 계정입니다. 다시 로그인해 주세요.",
      });
    }

    // req에 userId 추가
    req.userId = jwtDecoded.id;

    // 로그아웃 요청이라면 req에 userToken 추가
    if (req.originalUrl.includes("logout")) {
      req.userToken = userToken;
    }

    next();
  } catch (error) {
    switch (error.name) {
      case "TokenExpiredError":
        res.status(401).json({
          error: "Unauthorized",
          // message: "토큰이 만료되었습니다.",
          message: "세션이 만료되었습니다. 다시 로그인해 주세요.",
        });
        break;
      case "JsonWebTokenError":
        res.status(401).json({
          error: "Unauthorized",
          // message: "유효하지 않은 토큰입니다.",
          message: "로그인 정보가 유효하지 않습니다. 다시 로그인해 주세요.",
        });
        break;
      case "NotBeforeError":
        res.status(401).json({
          error: "Unauthorized",
          // message: "토큰이 아직 활성화되지 않았습니다.",
          message:
            "접근이 아직 허용되지 않았습니다. 잠시 후 다시 시도해 주세요.",
        });
        break;
      default:
        res.status(500).json({
          error: "Internal Server Error",
          message:
            "처리 중 예상치 못한 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.",
        });
    }
  }
};

export default loginRequired;
