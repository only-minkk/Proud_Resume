import jwt from "jsonwebtoken";

const loginRequired = (req, res, next) => {
  try {
    const userToken = req.headers["authorization"]?.split(" ")[1] ?? null;

    if (!userToken || userToken === "null") {
      console.log(
        "서비스 사용 요청이 있습니다. 하지만, Authorization 토큰 : 없음"
      );

      throw new Error(`{
            result : "forbidden-approach",
            reason : "회원만 사용할 수 있는 서비스입니다."
        }`);
    }

    const secretKey = process.env.JWT_SECRET_KEY;

    const jwtDecoded = jwt.verify(userToken, secretKey);

    req.userId = jwtDecoded.id;
    next();
  } catch (error) {
    res.status(401).send(error);
  }
};

export default loginRequired;
