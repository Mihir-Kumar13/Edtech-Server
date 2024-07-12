import { User } from "../models/User.model";
import { mailSender } from "../utils/mailSender";
import { ApiError } from "../utils/ApiError";
import { ApiResponse } from "../utils/ApiResponse";
import bcrypt from "bcrypt";

export const resetPasswordLink = async (req, res) => {
  //get email
  // check user for email
  try {
    const { email } = req.body;
    const user = await User.findOne(email);
    if (!user) {
      return res.status(400).json(new ApiError(400, `User doesn,t exist`));
    }

    const token = crypto.randomUUID();

    const updatedDetails = await User.findOneAndUpdate(
      { email },
      {
        token,
        resetPasswordExpires: Date.now() + 5 * 60 * 1000,
      },
      { new: true }
    );

    const url = `http://localhost:3000/update-password/${token}`;

    await mailSender(
      email,
      `Reset Password Link`,
      `password resent link : ${token}`
    );

    return res.json(200).json(new ApiResponse(200, `Email sent Successfully`));
  } catch (error) {
    return res
      .status(400)
      .json(new ApiError(400, "Error in sending password reset link"));
  }
};

///////////////

export const resetPassword = async (req, res) => {
  try {
    const { password, token } = req.body;
    const user = await User.findOne(token);
    if (!user) {
      return res.status(400).json(new ApiError(400, "Token is Invalid"));
    }

    if (user.resetPasswordExpires < Date.now()) {
      return res.status(400).json(new ApiError(400, `Link is expired`));
    }

    const hashed = await bcrypt.hash(password, 10);

    await User.findOneAndUpdate({ token }, { password: hashed }, { new: true });

    return res
      .status(200)
      .json(new ApiResponse(200, "Password Reset Successfully"));
  } catch (error) {
    return res
      .status(400)
      .json(new ApiError(400, "Error in password resetting"));
  }
};
