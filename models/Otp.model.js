import mongoose from "mongoose";
import { mailSender } from "../utils/mailSender.js";
import { generateOtpEmail } from "../utils/EnrollmentTemplate.js";

const otpSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
    },
    otp: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      required: true,
      default: Date.now,
      expires: 5 * 60, // 5 minutes
    },
  },
  {}
);

// Function to send verification email
async function sendVerification(email, otp) {
  try {
    const mailResponse = await mailSender(
      email,
      "Verification Email from EDTECH",
      generateOtpEmail(
        otp,
        email,
        "LearnVerse",
        "Learnverse544@gmail.com",
        "Delhi"
      )
    );

    console.log("Mail sent successfully: ", mailResponse);
  } catch (error) {
    console.error("Error occurred while sending mail: ", error);
    throw error;
  }
}

// Pre-save hook to send email before saving the document
otpSchema.pre("save", async function (next) {
  await sendVerification(this.email, this.otp);
  next();
});

export const Otp = mongoose.model("Otp", otpSchema);
