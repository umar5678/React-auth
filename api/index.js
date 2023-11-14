import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRoutes from "./routes/user.route.js";
import authRoutes from "./routes/auth.route.js";

dotenv.config();

const app = express();

app.use(express.json());

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

app.listen(3344, () => {
  console.log(`server is listening on port 3344`);
});
