import jwt from "jsonwebtoken";
import { ApiError } from "../utils/ApiError.js";

export const auth = (req, res, next) => {
  try {
    //console.log(req.cookies);
    const token = req.cookies.token || req.body.token;
    console.log("middleware", token);

    if (!token) {
      console.log("Token missing");
      return res.status(400).json(new ApiError(400, "Token missing"));
    }

    if (typeof token !== "string") {
      console.log("Token is not a string:", token);
      return res.status(400).json(new ApiError(400, "Invalid token format"));
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded;
    } catch (error) {
      console.log("JWT verification error:", error);
      return res.status(401).json(new ApiError(401, "Unauthorized request"));
    }

    next();
  } catch (error) {
    console.log("Error during authentication:", error);
    return res
      .status(500)
      .json(new ApiError(500, "Something went wrong while validating token"));
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
