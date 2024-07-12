import { User } from "../models/User.model.js";
import { ApiError } from "../utils/ApiError.js";
import otpGenerator from "otp-generator";
import { Otp } from "../models/Otp.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const sendOtp = async (req, res) => {
  try {
    const { email } = req.body;
    const checkUserPresent = User.findOne(email);
    if (checkUserPresent) {
      return res.status(401).json(new ApiError(400, "User already exists"));
    }

    var otp = otpGenerator.generate(6, {
      upperCaseAlphabets: false,
      lowerCaseAlphabets: false,
      specialChars: false,
    });
    console.log("OTP GENERATED");
    let result = await Otp.findOne(otp);
    while (result) {
      otp = otpGenerator.generate(6, {
        upperCaseAlphabets: false,
        lowerCaseAlphabets: false,
        specialChars: false,
      });
      result = await Otp.findOne(otp);
    }

    const otpPayload = { email, otp };
    const otpBody = await Otp.create(otpPayload);

    return res.status(200).json(new ApiResponse(200, "Otp sent Successfully"));
  } catch (error) {
    console.log(error);

    return res.status(500).json(new ApiError(500, "OTP send error"));
  }
};

///worst code for validating otp ::: loop on db call

export const registerUser = async (req, res) => {
  try {
    const { firstName, lastName, email, password, accountType, mobile, otp } =
      req.body;

    const presentUser = await User.findOne(email);
    if (presentUser) {
      throw new ApiError(409, "User with same email or username already exist");
    }

    const recentOtp = await Otp.find(email).sort({ createdAt: -1 }).limit(1);

    if (recentOtp.length == 0) {
      return res.status(400).json(new ApiError(400, "Otp not found"));
    } else if (otp !== recentOtp.otp) {
      return res.status(400).json(new ApiError(400, "Inva;idOtp"));
    }

    const hashedPassword = await bcrypt(password, 10);

    const createdUser = await User.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      accountType,
      mobile,
      image: "https://api.dicebear.com/9.x/adventurer/svg?seed=Loki",
    });

    if (!createdUser) {
      throw new ApiError(
        500,
        "Something went wrong while registering the  user"
      );
    }
    return res
      .status(201)
      .json(new ApiResponse(200, createdUser, "User registered successfully"));
  } catch (error) {
    console, log(error);
    res
      .status(400)
      .json(new ApiError(400, "User doesn't created successfully , Try Again"));
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email && !password) {
      return res
        .status(403)
        .json(new ApiResponse(200, "All fields are mandatory"));
    }
    const user = User.findOne(email);
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
        httpOnly: true,
        secure: true,
      };
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
      .json(new ApiError(400, "Login failed , Try again later"));
  }
};
