import { Category } from "../models/Category.model";
import { ApiError } from "../utils/ApiError";
import { ApiResponse } from "../utils/ApiResponse";

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
      { name: true, descriptionLtrue }
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
