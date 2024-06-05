export const authorizeUser = (req, res, next) => {
  try {
    const userId = req.params.id;
    if (req.userId === userId) {
      next();
    } else {
      res
        .status(403)
        .send("액세스가 거부되었습니다: 이 작업을 수행할 권한이 없습니다.");
    }
  } catch (error) {
    throw new Error(error);
  }
};
