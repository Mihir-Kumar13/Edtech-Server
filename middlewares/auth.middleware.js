import jwt from "jsonwebtoken";
import { ApiError } from "../utils/ApiError.js";

export const auth = (req, res, next) => {
  console.log(req.cookies.token);
  const token = req.cookies.token || req.body.token;

  if (!token) {
    console.log("Token missing");
    return res.status(401).json(new ApiError(401, "Token missing"));
  }

  if (typeof token !== "string") {
    console.log("Invalid token format:", token);
    return res.status(400).json(new ApiError(400, "Invalid token format"));
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    console.log("JWT verification error:", error);
    return res.status(401).json(new ApiError(401, "Unauthorized request"));
  }
};

export const authorize = (role) => (req, res, next) => {
  if (!req.user) {
    return res.status(401).json(new ApiError(401, "Unauthorized request"));
  }

  if (req.user.accountType !== role) {
    return res
      .status(403)
      .json(new ApiError(403, `Protected route :: Only for ${role}`));
  }

  next();
};

export const isStudent = authorize("Student");
export const isAdmin = authorize("Admin");
export const isInstructor = authorize("Instructor");
