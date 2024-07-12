import { User } from "../models/User.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Course } from "../models/Course.model.js";

export const updateProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    const {
      firstName,
      lastName,
      dateofBirth = "",
      gender = "",
      mobile,
    } = req.body;
    if (!firstName || !lastName || !mobile) {
      return res
        .status(404)
        .json(new ApiError(404, "These feilds are required"));
    }

    const updatedUser = User.findByIdAndUpdate(
      userId,
      {
        firstName,
        lastName,
        dateofBirth,
        gender,
        mobile,
      },
      { new: true }
    ).select(["-password -token"]);

    return res
      .status(200)
      .json(new ApiResponse(200, updatedUser, "profile updated successfully"));
  } catch (error) {
    return res.status(404).json(404, "Error in updating user Profile");
  }
};

export const deleteProfile = async (req, res) => {
  try {
    const userId = req.user.id; // Assuming userId is available in req.user.id

    // Check if userId is valid
    if (!userId) {
      return res.status(404).json(new ApiError(404, "User ID not found"));
    }

    // Delete user profile
    const deletedUser = await User.findByIdAndDelete(userId);

    if (!deletedUser) {
      return res.status(404).json(new ApiError(404, "User not found"));
    }

    // Remove user from enrolled courses
    await Course.updateMany(
      { studentsEnrolled: userId },
      { $pull: { studentsEnrolled: userId } }
    );

    // Return success response
    return res
      .status(200)
      .json(new ApiResponse(200, {}, "User profile deleted successfully"));
  } catch (error) {
    // Handle errors
    return res
      .status(500)
      .json(new ApiError(500, "Error in deleting user profile", error.message));
  }
};

export const getUserProfile = async (req, res) => {
  try {
    const userId = req.user.id; // Assuming userId is passed as a route parameter

    // Check if userId is valid
    if (!userId) {
      return res.status(404).json(new ApiError(404, "User ID not found"));
    }

    // Find user profile
    const userProfile = await User.findById(userId)
      .populate("courses", "courseName") // Populate courses with courseName field
      .populate("courseProgress"); // Populate courseProgress

    if (!userProfile) {
      return res.status(404).json(new ApiError(404, "User not found"));
    }

    // Return user profile
    return res
      .status(200)
      .json(
        new ApiResponse(200, userProfile, "User profile fetched successfully")
      );
  } catch (error) {
    // Handle errors
    return res
      .status(500)
      .json(new ApiError(500, "Error in fetching user profile", error.message));
  }
};
