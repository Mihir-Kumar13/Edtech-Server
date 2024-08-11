import { Course } from "../models/Course.model.js";
import { Section } from "../models/Section.model.js";
import { SubSection } from "../models/SubSection.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { uploadToCloudinary } from "../utils/imageUploader.js";

export const createsubSection = async (req, res) => {
  try {
    const { sectionId, title, description } = req.body;
    const video = req.files.video;
    console.log(req.files);

    if (!sectionId || !title || !description || !video) {
      return res.status(400).json(new ApiError(400, "All fields are required"));
    }

    const videoDetails = await uploadToCloudinary(
      video,
      process.env.FOLDER_NAME
    );

    const newSubSection = await SubSection.create({
      title,
      description,
      videoUrl: videoDetails.url,
      timeduration: Number(videoDetails.duration) / 60 || 5,
    });

    const updatedSection = await Section.findByIdAndUpdate(
      sectionId,
      {
        $push: {
          subSection: newSubSection._id,
        },
      },
      {
        new: true,
      }
    ).populate("subSection");

    // Find the course that contains this section
    const course = await Course.findOne({ courseContent: sectionId }).populate({
      path: "courseContent",
      populate: {
        path: "subSection",
      },
    });

    if (!course) {
      return res.status(404).json(new ApiError(404, "Course not found"));
    }
    console.log(course);

    return res
      .status(200)
      .json(
        new ApiResponse(200, course, "New Subsection created successfully")
      );
  } catch (error) {
    return res
      .status(500)
      .json(new ApiError(500, "Error in creating Subsection", error.message));
  }
};
