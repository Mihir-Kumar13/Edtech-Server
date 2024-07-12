import mongoose from "mongoose";
import { mailSender } from "../utils/mailSender";

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
      default: Date.now(),
      expires: 5 * 60,
    },
  },
  {}
);

////////////function

async function sendVerification(email, otp) {
  try {
    const mailResponse = await mailSender(
      email,
      "verification email from EDTECH",
      otp
    );

    console.log("Mail sent Successfully: ", mailResponse);
  } catch (error) {
    console.log(error, "error occured while sending mail");
    throw error;
  }
}

otpSchema.pre("save", async function (next) {
  await sendVerification(this.email, this.otp);
  next();
});
export const Otp = mongoose.model("Otp", otpSchema);
