import Feedback from "../models/feedbackModel.js";

export const createFeedback = async (req, res) => {
  try {
    const userId = req.userId;
    const resumeId = req.params.resumeId;
    const feedback = req.body;

    const newFeedback = new Feedback({
      userId,
      resumeId,
      feedback,
    });

    const savedFeedback = await newFeedback.save();
    res.status(201).json(savedFeedback);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const getFeedbacks = async (req, res) => {
  try {
    const resumeId = req.params.resumeId;

    const feedbacks = await Feedback.find({ resumeId: resumeId });
    res.status(201).json(feedbacks);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const usersFeedbacks = async (req, res) => {
  try {
    const userId = req.userId;

    const usersFeedbacks = await Feedback.find({ userId: userId });

    res.status(201).json(usersFeedbacks);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const updateFeedback = async (req, res) => {
  try {
    const userId = req.userId;
    const feedbackId = req.params.feedbackId;
    const newFeedback = req.body;

    const updatedFeedback = await Feedback.findOneAndUpdate(
      { userId: userId, _id: feedbackId },
      { feedback: newFeedback }
    );
    if (updatedFeedback) {
      res.status(201).send("수정이 완료되었습니다.");
    } else {
      res.status(400).send("수정할 수 없습니다.");
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteFeedback = async (req, res) => {
  try {
    const userId = req.userId;
    const feedbackId = req.params.feedbackId;

    const deletedFeedback = await Feedback.findOneAndDelete({
      userId: userId,
      _id: feedbackId,
    });

    if (deletedFeedback) {
      res.status(201).send("삭제가 완료되었습니다.");
    } else {
      res.status(400).send("이미 삭제되었거나 삭제할 수 없습니다.");
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
