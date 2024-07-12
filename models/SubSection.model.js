import mongoose from "mongoose";

const subsectionSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    videoUrl: {
      type: string,
    },
    description: {
      type: String,
    },
    timeduration: {
      type: Number,
    },
  },
  { timestamps: true }
);

export const SubSection = mongoose.model("SubSection", subsectionSchema);
