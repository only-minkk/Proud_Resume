import { Schema, model } from "mongoose";

const resumeSchema = new Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    resume: {
      type: Schema.Types.Mixed,
    },
    isPublic: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const Resume = model("Resume", resumeSchema);

export default Resume;
