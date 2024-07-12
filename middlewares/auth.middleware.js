import jwt from "jsonwebtoken";
import { ApiResponse } from "../utils/ApiResponse";
import { ApiError } from "../utils/ApiError";

export const auth = (req, res, next) => {
  try {
    const token =
      req.cookies.token ||
      req.body ||
      req.header("Authorization").replace("Bearer ", "");

    if (!token) {
      return res.status(400).json(new ApiError(400, "Token missing"));
    }

    try {
      const decode = jwt.verify(token, process.env.JWT_SECRET);

      req.user = decode;
    } catch (error) {
      return res.status(400).json(new ApiError(400, "Unauthorized request"));
    }

    next();
  } catch (error) {
    return res
      .status(400)
      .json(new ApiError(400, "Something  went wrong while validating tokem"));
  }
};

export const isStudent = (req, res, next) => {
  try {
    if (req.user.accountType !== "Student") {
      return res
        .status(400)
        .json(new ApiError(400, "Protected route :: Only for student"));
    }
    next();
  } catch (error) {
    return res
      .status(400)
      .json(new ApiError(400, "User role cannot be fetched , Try again"));
  }
};
export const isAdmin = (req, res, next) => {
  try {
    if (req.user.accountType !== "Admin") {
      return res
        .status(400)
        .json(new ApiError(400, "Protected route :: Only for Admin"));
    }
    next();
  } catch (error) {
    return res
      .status(400)
      .json(new ApiError(400, "User role cannot be fetched , Try again"));
  }
};

export const isInstructor = (req, res, next) => {
  try {
    if (req.user.accountType !== "Instructor") {
      return res
        .status(400)
        .json(new ApiError(400, "Protected route :: Only for Instructor"));
    }
    next();
  } catch (error) {
    return res
      .status(400)
      .json(new ApiError(400, "User role cannot be fetched , Try again"));
  }
};
