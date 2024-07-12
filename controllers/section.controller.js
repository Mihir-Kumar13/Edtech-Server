import { Course } from "../models/Course.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Section } from "../models/Section.model.js";

export const createSection = async (req, res) => {
  try {
    const { sectionName, CourseId } = req.body;
    if (!sectionName || !CourseId) {
      return res.status(400).json(new ApiError(400, "All fields are required"));
    }

    // Create new section and save it to the database
    const newSection = await Section.create({ sectionName });

    // Update the course with the new section
    const updatedCourse = await Course.findByIdAndUpdate(
      CourseId,
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
    const { sectionId } = req.params;

    // Find the section to get the associated CourseId
    const section = await Section.findById(sectionId);

    if (!section) {
      return res.status(404).json(new ApiError(404, "Section not found"));
    }

    // Remove the section from the course's courseContent
    const course = await Course.findByIdAndUpdate(
      section.courseId,
      { $pull: { courseContent: sectionId } },
      { new: true }
    );

    if (!course) {
      return res.status(404).json(new ApiError(404, "Course not found"));
    }

    // Delete the section
    await Section.findByIdAndDelete(sectionId);

    return res
      .status(200)
      .json(new ApiResponse(200, course, "Section deleted successfully"));
  } catch (error) {
    return res
      .status(500)
      .json(new ApiError(500, "Error in deleting section", error.message));
  }
};
