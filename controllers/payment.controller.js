import { razorpayInstance } from "../utils/razorpayconfig";
import { User } from "../models/User.model.js";
import { Course } from "../models/Course.model.js";
import { mailSender } from "../utils/mailSender.js";
import { generateEnrollmentEmail } from "../utils/EnrollmentTemplate.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import crypto from "crypto";

export const capturePayment = async (req, res) => {
  let course;
  const userId = req.user.id;
  const { courseId } = req.body;
  try {
    if (!courseId) {
      return res.status(400).json(new ApiError(400, "Course Id is required"));
    }

    course = await Course.findById(courseId);
    if (!course) {
      return res.status(400).json(new ApiError(400, "Course Id is invalid"));
    }

    if (course.studentsEnrolled.includes(userId)) {
      return res
        .status(400)
        .json(new ApiError(400, "User is already enrolled"));
    }
  } catch (error) {
    return res
      .status(400)
      .json(new ApiError(400, `Error in User payment data ${error.message}`));
  }

  const amount = course.price;
  const currency = "INR";

  const options = {
    amount: amount * 100,
    currency,
    receipt: Math.random(Date.now()).toString(),
    notes: {
      courseId: course._id,
      userId,
    },
  };

  try {
    const paymentResponse = await razorpayInstance.orders.create(options);
    console.log(paymentResponse);
    return res.status(200).json(
      new ApiResponse(
        200,
        {
          courseName: course.courseName,
          courseDescription: course.courseDescription,
          thumbnail: course.thumbnail,
          paymentResponse,
        },
        "Payment successful"
      )
    );
  } catch (error) {
    return res
      .status(400)
      .json(new ApiError(400, `Error in Razorpay: ${error.message}`));
  }
};

export const verifySignature = async (req, res) => {
  const webhookSecret = "12345678";
  const signature = req.headers["x-razorpay-signature"];

  const shasum = crypto.createHmac("sha256", webhookSecret);
  shasum.update(JSON.stringify(req.body));
  const digest = shasum.digest("hex");

  if (signature === digest) {
    console.log("Payment authorized");

    const { courseId, userId } = req.body.payload.payment.entity.notes;

    try {
      const enrolledCourse = await Course.findOneAndUpdate(
        { _id: courseId },
        { $push: { studentsEnrolled: userId } },
        { new: true }
      );

      if (!enrolledCourse) {
        return res.status(400).json(new ApiError(400, "Course not found"));
      }

      const enrolledStudent = await User.findOneAndUpdate(
        { _id: userId },
        { $push: { courses: courseId } },
        { new: true }
      );

      if (!enrolledStudent) {
        return res.status(400).json(new ApiError(400, "User not found"));
      }

      // Optionally send a confirmation email
      await mailSender.sendMail(
        enrolledStudent.email,
        "Enrollment Confirmation"
      );

      return res
        .status(200)
        .json(
          new ApiResponse(
            200,
            { enrolledCourse, enrolledStudent },
            "Enrollment successful"
          )
        );
    } catch (error) {
      return res
        .status(400)
        .json(new ApiError(400, `Error in enrolling user: ${error.message}`));
    }
  } else {
    return res.status(400).json(new ApiError(400, "Invalid signature"));
  }
};
