import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRoutes from "./routes/user.route.js";
import authRoutes from "./routes/auth.route.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import path from "path";

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());
app.use(cookieParser());

const PORT = 'react-auth-xi.vercel.app' || 3000

app.listen(PORT, () => {
  console.log(`server is listening on port ${PORT}`);
});

const __dirname = path.resolve();
app.use(express.static(path.join(__dirname, "/client/dist")));
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "dist", "index.html"));
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
