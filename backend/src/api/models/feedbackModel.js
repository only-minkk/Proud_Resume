import { Schema, model } from "mongoose";

const feedbackSchema = new Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    resumeId: {
      type: String,
      required: true,
    },
    feedback: {
      type: Schema.Types.Mixed,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Feedback = model("Feedback", feedbackSchema);

export default Feedback;
