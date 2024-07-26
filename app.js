import express, { json, urlencoded } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import fileUpload from "express-fileupload";
const app = express();
app.use(cookieParser());

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));

app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp",
  })
);

app.get("/", (req, res) => {
  res.status(200).json({ message: "server on" });
});
//routes

import userRouter from "./routes/user.routes.js";
import courseRouter from "./routes/course.routes.js";
import paymentRouter from "./routes/payment.routes.js";

app.use("/api/v1/users", userRouter);
app.use("/api/v1/courses", courseRouter);
app.use("/api/v1/payments", paymentRouter);

export { app };
