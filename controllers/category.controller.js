import { Category } from "../models/Category.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

export const createCategory = async (req, res) => {
  try {
    const { name, description } = req.body;
    if (!name || !description) {
      return res.status(400).json(new ApiError(400, "All fields are required"));
    }
    const categoryDetails = await Category.create({
      name,
      description,
    });

    return res
      .status(200)
      .json(
        new ApiResponse(200, categoryDetails, "Category created Succesfully")
      );
  } catch (error) {
    return res
      .status(499)
      .json(new ApiError(499, "Error in creating Category"));
  }
};

export const showAllCategorys = async (req, res) => {
  try {
    const allCategorys = await Category.find(
      {},
      { name: true, description: true }
    );
    return res
      .status(200)
      .json(new ApiResponse(200, allCategorys, "Category Fetched Succesfully"));
  } catch (error) {
    return res
      .status(499)
      .json(new ApiError(499, "Error in Fetching all Categorys"));
  }
};

export const getCategoryDetails = async (req, res) => {
  try {
    const categoryId = req.params.categoryId || req.body.categoryId;

    if (!categoryId) {
      return res.status(400).json(new ApiError(400, "Category ID is required"));
    }

    const categoryDetails = await Category.findById(categoryId).populate({
      path: "courses",
      select: "courseName studentsEnrolled",
    });

    if (!categoryDetails) {
      return res.status(404).json(new ApiError(404, "Category not found"));
    }

    const topSellingCourses = categoryDetails.courses
      .sort((a, b) => b.studentsEnrolled - a.studentsEnrolled)
      .slice(0, 3);

    const categoryWithTopCourses = {
      categoryName: categoryDetails.name,
      description: categoryDetails.description,
      topSellingCourses,
      allCourses: categoryDetails.courses,
    };

    return res
      .status(200)
      .json(
        new ApiResponse(
          200,
          categoryWithTopCourses,
          "Category details fetched successfully"
        )
      );
  } catch (error) {
    console.error("Error fetching category details:", error);
    return res
      .status(500)
      .json(new ApiError(500, "Error fetching category details"));
  }
};
