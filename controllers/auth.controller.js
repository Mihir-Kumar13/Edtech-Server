import { User } from "../models/User.model.js";
import { ApiError } from "../utils/ApiError.js";
import otpGenerator from "otp-generator";
import { Otp } from "../models/Otp.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { request } from "express";

export const sendOtp = async (req, res) => {
  try {
    const { email } = req.body;
    const checkUserPresent = await User.findOne({ email });
    if (checkUserPresent) {
      return res.status(401).json(new ApiError(400, "User already exists"));
    }

    let otp = otpGenerator.generate(6, {
      upperCaseAlphabets: false,
      lowerCaseAlphabets: false,
      specialChars: false,
    });
    console.log("OTP GENERATED");

    let result = await Otp.findOne({ otp });
    while (result) {
      otp = otpGenerator.generate(6, {
        upperCaseAlphabets: false,
        lowerCaseAlphabets: false,
        specialChars: false,
      });
      result = await Otp.findOne({ otp });
    }

    const otpPayload = { email, otp };
    const otpBody = await Otp.create(otpPayload);

    return res
      .status(200)
      .json(new ApiResponse(200, "Otp sent successfully", otpBody));
  } catch (error) {
    console.log(error);

    return res.status(500).json(new ApiError(500, "OTP send error"));
  }
};
///worst code for validating otp ::: loop on db call
export const servercheck = async (req, res) => {
  return res.status(200).json(new ApiResponse(200, "SERVER GOOD"));
};

export const registerUser = async (req, res) => {
  try {
    const { firstName, lastName, email, password, accountType, mobile, otp } =
      req.body;

    if (!firstName || !lastName || !email || !password || !accountType) {
      return res.status(400).json(new ApiError(400, "Fields are required"));
    }

    const presentUser = await User.findOne({ email });
    if (presentUser) {
      throw new ApiError(
        409,
        "User with same email or username already exists"
      );
    }

    const recentOtp = await Otp.find({ email })
      .sort({ createdAt: -1 })
      .limit(1);

    if (recentOtp.length === 0) {
      return res.status(400).json(new ApiError(400, "Otp not found"));
    } else if (otp !== recentOtp[0].otp) {
      return res.status(400).json(new ApiError(400, "Invalid Otp"));
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const createdUser = await User.create({
      firstName, // User's first name
      lastName, // User's last name
      email, // User's email address
      password: hashedPassword, // Hashed password for security
      accountType, // Type of user account
      mobile, // User's mobile number
      image: "https://api.dicebear.com/9.x/adventurer/svg?seed=Loki", // Avatar image URL
    });

    createdUser.password = undefined;
    if (!createdUser) {
      throw new ApiError(
        500,
        "Something went wrong while registering the user"
      );
    }

    return res
      .status(201)
      .json(new ApiResponse(201, createdUser, "User registered successfully"));
  } catch (error) {
    console.log(error);

    // Check if the error is an instance of ApiError
    if (error instanceof ApiError) {
      return res.status(error.statusCode).json(error);
    } else {
      // For other types of errors, return a generic ApiError
      return res
        .status(500)
        .json(new ApiError(500, error.message || "Internal Server Error"));
    }
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(403)
        .json(new ApiResponse(200, "All fields are mandatory"));
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json(new ApiError(400, "User doesn't exist"));
    }

    if (await bcrypt.compare(password, user.password)) {
      const payload = {
        email: user.email,
        id: user._id,
        accountType: user.accountType,
      };
      const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: "2h",
      });
      user.token = token;
      user.password = undefined;

      const options = {
        expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
        sameSite: "Lax",
        httpOnly: true,
        secure: false, // Set to false for local development
      };

      console.log("Setting cookie with token:", token); // Debug log

      return res
        .cookie("token", token, options)
        .status(200)
        .json(new ApiResponse(200, user, "Logged in successfully"));
    } else {
      return res.status(400).json(new ApiError(400, "Password is incorrect"));
    }
  } catch (error) {
    console.log(error);
    return res
      .status(400)
      .json(new ApiError(400, "Login failed, Try again later"));
  }
};

export const logoutUser = (req, res) => {
  try {
    const options = {
      expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
      httpOnly: true,
      secure: true,
      sameSite: "Lax",
    };
    res.cookie("token", "", options);
    return res
      .status(200)
      .json(new ApiResponse(200, null, "Logged out successfully"));
  } catch (error) {
    console.log(error);
    return res
      .status(400)
      .json(new ApiError(400, "Logout failed, try again later"));
  }
};

export const getCurrentUser = async (req, res) => {
  const user = req.user;

  // Retrieve the user from the database if needed (optional)
  const userdb = await User.findById(user.id);

  if (!userdb) {
    return res.status(404).json(new ApiError(404, "User not found."));
  }

  res
    .status(200)
    .json(new ApiResponse(200, userdb, "User retrieved successfully."));
};
