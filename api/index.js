import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRoutes from "./routes/user.route.js";
import authRoutes from "./routes/auth.route.js";
import cors from "cors";
import cookieParser from "cookie-parser";

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());
app.use(cookieParser());

app.listen(3344, () => {
  console.log(`server is listening on port 3344`);
});
mongoose
  .connect(process.env.MONGO)
  .then(() => {
    console.log("Connected to Database");
  })
  .catch((err) => {
    console.log(err);
  });

app.use("/api/user/", userRoutes);
app.use("/api/auth", authRoutes);

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Err";
  return res.status(statusCode).json({
    success: false,
    message,
    statusCode,
  });
});
