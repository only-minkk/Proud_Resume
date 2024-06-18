export const authorizeUser = (req, res, next) => {
  try {
    // 토큰 검증 후 추출한 userId와 파라미터에 입력한 userId가 같은지 검증
    if (req.userId === req.params.userId) {
      next();
    } else {
      return res.status(401).json({
        error: "Unauthorized",
        message: "로그인 정보가 유효하지 않습니다. 다시 로그인해 주세요.",
      });
    }
  } catch (error) {
    res.status(500).json({
      error: "Internal Server Error",
      message:
        "처리 중 예상치 못한 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.",
    });
  }
};
