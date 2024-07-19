import { Course } from "../models/Course.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Section } from "../models/Section.model.js";
import mongoose from "mongoose";

export const createSection = async (req, res) => {
  try {
    const { sectionName, courseId } = req.body;
    if (!sectionName || !courseId) {
      return res.status(400).json(new ApiError(400, "All fields are required"));
    }

    // Create new section and save it to the database
    const newSection = await Section.create({ sectionName, courseId });

    // Update the course with the new section
    const updatedCourse = await Course.findByIdAndUpdate(
      courseId,
      { $push: { courseContent: newSection._id } },
      { new: true }
    ).populate("courseContent");

    if (!updatedCourse) {
      return res.status(404).json(new ApiError(404, "Course not found"));
    }

    return res
      .status(200)
      .json(
        new ApiResponse(200, updatedCourse, "Section created successfully")
      );
  } catch (error) {
    return res
      .status(500)
      .json(new ApiError(500, "Error in creating Section", error.message));
  }
};

export const updateSection = async (req, res) => {
  try {
    const { sectionId, sectionName } = req.body;

    if (!sectionName) {
      return res
        .status(400)
        .json(new ApiError(400, "Section name is required"));
    }

    // Find the section by id and update its name
    const updatedSection = await Section.findByIdAndUpdate(
      sectionId,
      { sectionName },
      { new: true }
    );

    if (!updatedSection) {
      return res.status(404).json(new ApiError(404, "Section not found"));
    }

    return res
      .status(200)
      .json(
        new ApiResponse(200, updatedSection, "Section updated successfully")
      );
  } catch (error) {
    return res
      .status(500)
      .json(new ApiError(500, "Error in updating Section", error.message));
  }
};

export const deleteSection = async (req, res) => {
  try {
    const { sectionId } = req.body; // Extract sectionId from req.body
    if (!sectionId) {
      return res.status(400).json(new ApiError(400, "Section id is required"));
    }

    // console.log(`Received sectionId: ${sectionId}`);

    // Check if sectionId is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(sectionId)) {
      return res
        .status(400)
        .json(new ApiError(400, "Invalid section id format"));
    }

    const objectId = new mongoose.Types.ObjectId(sectionId);

    const section = await Section.findById(objectId);
    // console.log(`Section found: ${section}`);

    if (!section) {
      return res.status(404).json(new ApiError(404, "Section not found"));
    }

    const course = await Course.findByIdAndUpdate(
      section.courseId,
      { $pull: { courseContent: sectionId } },
      { new: true }
    );

    if (!course) {
      return res.status(404).json(new ApiError(404, "Course not found"));
    }

    await Section.findByIdAndDelete(sectionId);

    return res
      .status(200)
      .json(new ApiResponse(200, course, "Section deleted successfully"));
  } catch (error) {
    console.error(`Error in deleting section: ${error.message}`);
    return res
      .status(500)
      .json(new ApiError(500, "Error in deleting section", error.message));
  }
};
