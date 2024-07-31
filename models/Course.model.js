import mongoose from "mongoose";
const courseSchema = new mongoose.Schema(
  {
    courseName: {
      type: String,
      required: true,
    },
    isPublished: { type: Boolean, required: true, default: false },

    courseDescription: {
      type: String,
    },
    instructor: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    courseContent: [{ type: mongoose.Schema.Types.ObjectId, ref: "Section" }],
    ratings: [{ type: mongoose.Schema.Types.ObjectId, ref: "RatingandReview" }],
    price: {
      type: Number,
      required: true,
    },
    thumbnail: {
      type: String,
    },
    studentsEnrolled: [
      { type: mongoose.Schema.Types.ObjectId, required: true, ref: "User" },
    ],
    category: { type: mongoose.Schema.Types.ObjectId, ref: "Category" },
  },

  { timestamps: true }
);

export const Course = mongoose.model("Course", courseSchema);
