import { razorpayInstance } from "../utils/razorpayconfig.js";
import { User } from "../models/User.model.js";
import { Course } from "../models/Course.model.js";

import { generateEnrollmentEmail } from "../utils/EnrollmentTemplate.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import crypto from "crypto";

export const capturePayment = async (req, res) => {
  const userId = req.user.id;
  const { courseId } = req.body;

  if (!courseId) {
    return res.status(400).json(new ApiError(400, "Course Id is required"));
  }

  try {
    const course = await Course.findById(courseId);

    if (!course) {
      return res.status(400).json(new ApiError(400, "Course Id is invalid"));
    }

    if (course.studentsEnrolled.includes(userId)) {
      return res
        .status(400)
        .json(new ApiError(400, "User is already enrolled"));
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
    return res.status(500).json(new ApiError(500, `Error: ${error.message}`));
  }
};

export const verifySignature = async (req, res) => {
  const webhookSecret = process.env.WEBHOOK_SECRET;
  const signature = req.headers["x-razorpay-signature"];

  if (!webhookSecret || !signature) {
    return res
      .status(400)
      .json(new ApiError(400, "Missing webhook secret or signature"));
  }

  const shasum = crypto.createHmac("sha256", webhookSecret);
  shasum.update(JSON.stringify(req.body));
  const digest = shasum.digest("hex");

  if (signature !== digest) {
    return res.status(400).json(new ApiError(400, "Invalid signature"));
  }

  console.log("Payment authorized");

  const { courseId, userId } = req.body.payload.payment.entity.notes;

  if (!courseId || !userId) {
    return res.status(400).json(new ApiError(400, "Invalid payload"));
  }

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
    console.error(`Error in enrolling user: ${error.message}`);
    return res
      .status(500)
      .json(new ApiError(500, `Error in enrolling user: ${error.message}`));
  }
};
