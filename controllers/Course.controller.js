import { User } from "../models/User.model.js";
import { Category } from "../models/Category.model.js";
import { Course } from "../models/Course.model.js";
import { uploadToCloudinary } from "../utils/imageUploader.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Section } from "../models/Section.model.js";
import { RatingandReview } from "../models/RatingandReview.model.js";

export const createCourse = async (req, res) => {
  try {
    const { courseName, courseDescription, WhatYouWillLearn, price, category } =
      req.body;
    const { thumbnail } = req.files;

    if (
      !courseName ||
      !courseDescription ||
      !WhatYouWillLearn ||
      !category ||
      !price ||
      !thumbnail
    ) {
      return res.status(400).json(new ApiError(400, "All fields are required"));
    }

    const userId = req.user.id;
    const instructorDetails = await User.findById(userId).select(
      "-password -token"
    );

    if (!instructorDetails) {
      return res
        .status(404)
        .json(new ApiError(404, "Instructor details not found"));
    }

    const categoryDetails = await Category.findById(category);

    if (!categoryDetails) {
      return res
        .status(404)
        .json(new ApiError(404, "Category details not found"));
    }

    const thumbnailImage = await uploadToCloudinary(
      thumbnail,
      process.env.FOLDER_NAME
    );

    const newCourse = await Course.create({
      courseName,
      courseDescription,
      instructor: instructorDetails._id,
      price,
      category: categoryDetails._id,
      thumbnail: thumbnailImage,
      WhatYouWillLearn,
    });

    await User.findByIdAndUpdate(
      instructorDetails._id,
      { $push: { courses: newCourse._id } },
      { new: true }
    );

    await Category.findByIdAndUpdate(
      categoryDetails._id,
      { $push: { courses: newCourse._id } },
      { new: true }
    );

    return res
      .status(200)
      .json(new ApiResponse(200, newCourse, "Course created successfully"));
  } catch (error) {
    return res.status(500).json(new ApiError(500, "Error in course creation"));
  }
};

export const getCourse = async (req, res) => {
  try {
    const { courseId } = req.params;

    if (!courseId) {
      return res.status(400).json(new ApiError(400, "Course ID is required"));
    }

    const courseDetails = await Course.findById(courseId)
      .populate({
        path: "instructor",
        model: User,
        select: "-password -token", // Exclude password and token fields
      })
      .populate({
        path: "category",
        model: Category,
      })
      .populate({
        path: "courseContent",
        model: Section,
        populate: {
          path: "subSection",
          model: "SubSection",
        },
      })
      .populate({
        path: "ratings",
        model: RatingandReview,
      })
      .populate({
        path: "studentsEnrolled",
        model: User,
        select: "-password -token", // Exclude password and token fields
      });

    if (!courseDetails) {
      return res.status(404).json(new ApiError(404, "Course not found"));
    }

    return res
      .status(200)
      .json(
        new ApiResponse(
          200,
          courseDetails,
          "Course details fetched successfully"
        )
      );
  } catch (error) {
    return res
      .status(500)
      .json(new ApiError(500, "Error fetching course details"));
  }
};

export const showAllCourses = async (req, res) => {
  try {
    const allCourses = await Course.find({});

    return res
      .status(200)
      .json(
        new ApiResponse(
          200,
          allCourses,
          "Data for all courses fetched successfully"
        )
      );
  } catch (error) {
    return res
      .status(500)
      .json(new ApiError(500, "Data for all courses cannot be fetched"));
  }
};
