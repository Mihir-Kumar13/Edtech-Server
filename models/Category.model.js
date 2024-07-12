import mongoose, { mongo } from "mongoose";

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    courses: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course",
      },
    ],
    description: {
      type: String,
    },
  },
  { timestamps: true }
);
export const Category = mongoose.model("Category", categorySchema);
