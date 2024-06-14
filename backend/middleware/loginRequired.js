import jwt from "jsonwebtoken";

const loginRequired = (req, res, next) => {
  try {
    const userToken = req.headers["authorization"]?.split(" ")[1] ?? null;
    if (!userToken || userToken === "null") {
      res.status(500).json({
        error: "The token could not be verified.",
        message: "토큰을 확인할 수 없습니다.",
      });
    }

    const secretKey = process.env.JWT_SECRET_KEY;

    const jwtDecoded = jwt.verify(userToken, secretKey);

    req.userId = jwtDecoded.id;
    next();
  } catch (error) {
    switch (error.name) {
      case "TokenExpiredError":
        res.status(401).json({
          error: "Unauthorized",
          message: "토큰이 만료되었습니다.",
        });
        break;
      case "JsonWebTokenError":
        res.status(401).json({
          error: "Unauthorized",
          message: "유효하지 않은 토큰입니다.",
        });
        break;
      case "NotBeforeError":
        res.status(401).json({
          error: "Unauthorized",
          message: "토큰이 아직 활성화되지 않았습니다.",
        });
        break;
      default:
        res.status(500).json({
          error: "Internal Server Error",
          message: "서버 처리 과정 중 오류가 발생했습니다.",
        });
    }
  }
};

export default loginRequired;
