import mongoose from "mongoose";

const sectionSchema = new mongoose.Schema(
  {
    sectionName: {
      type: String,
      required: true,
    },
    courseId: { type: mongoose.Schema.Types.ObjectId, ref: "Course" },
    subSection: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "SubSection",
      },
    ],
  },
  { timestamps: true }
);
export const Section = mongoose.model("Section", sectionSchema);
