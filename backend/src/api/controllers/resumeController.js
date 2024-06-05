import Resume from "../models/resumeModel.js";

export const createResume = async (req, res) => {
  try {
    const userId = req.userId;
    const { resume, isPublic } = req.body;

    const newResume = new Resume({
      userId,
      resume,
      isPublic,
    });

    const savedResume = await newResume.save();
    res.status(201).json(savedResume);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const getUsersResumes = async (req, res) => {
  try {
    const userId = req.userId;
    const usersResumes = await Resume.find({ userId: userId });
    res.status(201).json(usersResumes);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const getResumes = async (req, res) => {
  try {
    const resumes = await Resume.find({ isPublic: true });
    res.status(201).json(resumes);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const updateResume = async (req, res) => {
  try {
    const userId = req.userId;
    const resumeId = req.params.resumeId;
    const newResume = req.body.resume;
    const newIsPublic = req.body.isPublic;

    const updatedResume = await Resume.findOneAndUpdate(
      { userId: userId, _id: resumeId },
      { resume: newResume, isPublic: newIsPublic }
    );
    if (updatedResume) {
      res.status(201).json(updatedResume);
    } else {
      res.status(400).send("수정할 수 없습니다.");
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteResume = async (req, res) => {
  try {
    const userId = req.userId;
    const resumeId = req.params.resumeId;
    const deletedResume = await Resume.findOneAndDelete({
      userId: userId,
      _id: resumeId,
    });
    // userId와 resumeId 조건을 동시에 만족시키는 데이터가 없다면 null로 반환됨. resumeId를 임의로 변경해서 요청해도 동일. 하지만 resumeId의 length가 변질되면 CastError.
    if (deletedResume) {
      res.status(201).send("삭제가 완료되었습니다.");
    } else {
      res.status(400).send("이미 삭제되었거나 삭제할 수 없습니다.");
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
