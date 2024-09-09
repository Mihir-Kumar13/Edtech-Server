import cookieParser from "cookie-parser";
import cors from "cors";
import express, { json, urlencoded } from "express";
import fileUpload from "express-fileupload";
import swaggerUi from "swagger-ui-express";
import { openapispec } from "./openapi.js"; // Adjust the path as needed
const app = express();

// Middleware setup
app.use(cookieParser());

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);
app.use(json({ limit: "16kb" }));
app.use(urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));

app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp",
  })
);

// Route for Swagger UI
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(openapispec));

// Basic route
app.get("/", (req, res) => {
  res.status(200).json({ message: "server on all ok part-2 .   " });
});

// Route handlers
import courseRouter from "./routes/course.routes.js";
import paymentRouter from "./routes/payment.routes.js";
import userRouter from "./routes/user.routes.js";

app.use("/api/v1/users", userRouter);
app.use("/api/v1/courses", courseRouter);
app.use("/api/v1/payments", paymentRouter);

// Export the app
export { app };
