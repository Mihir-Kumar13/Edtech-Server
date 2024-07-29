import { Section } from "../models/Section.model.js";
import { SubSection } from "../models/SubSection.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { uploadToCloudinary } from "../utils/imageUploader.js";

export const createsubSection = async (req, res) => {
  try {
    const { sectionId, title, description } = req.body;
    //console.log(req.files);
    console.log(sectionId, title, description);
    console.log(req.files);
    const video = req.files.videoFile;

    console.log(sectionId, title, description, video);

    if (!sectionId || !title || !description || !video) {
      return res.status(400).json(new ApiError(400, "All fields are required"));
    }

    const videoDetails = await uploadToCloudinary(
      video,
      process.env.FOLDER_NAME
    );

    console.log(videoDetails);
    const newSubSection = await SubSection.create({
      title,
      description,
      videoUrl: videoDetails.url,
      timeduration: Number(videoDetails.duration) / 60 || 5, // Convert duration to minutes if necessary
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

    return res
      .status(200)
      .json(
        new ApiResponse(
          200,
          updatedSection,
          "new Subsection created succcesfully"
        )
      );
  } catch (error) {
    return res
      .status(500)
      .json(new ApiError(500, "Error in creating Subsection", error.message));
  }
};
