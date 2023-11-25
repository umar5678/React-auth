import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/error.js";
import jwt from "jsonwebtoken";
import { MongoErrorLabel } from "mongodb";

export const signup = async (req, res, next) => {
  const { username, email, password } = req.body;
  const hashedPswd = bcryptjs.hashSync(password, 10);

  const newUser = new User({
    username,
    email,
    password: hashedPswd,
  });
  try {
    await newUser.save();
    res.status(201).json({ msg: "user created successfully" });
  } catch (err) {
    console.log(err);
    next(err);
  }
};

export const login = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const validUser = await User.findOne({ email });
    if (!validUser) return next(errorHandler(404, "User not found"));
    const validPswd = bcryptjs.compareSync(password, validUser.password);
    if (!validPswd) return next(errorHandler(401, "Wrong credintials"));
    const { password: hashedPswd, ...rest } = validUser._doc;
    const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET);
    const expireTime = new Date(Date.now() + 3600000);
    res
      .cookie("access_token", token, { httpOnly: true, expires: expireTime })
      .status(200)
      .json(rest);
  } catch (err) {
    next(err);
  }
};

export const googleLogin = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
      const { password: hashedPswd, ...rest } = user._doc;
      const expiryDate = new Date(Date.now() + 3600000); // 1 hour
      res
        .cookie("access_token", token, {
          httpOnly: true,
          expires: expiryDate,
        })
        .status(200)
        .json(rest);
    } else {
      const generatedPswd =
        Math.random().toString(36).slice(-8) +
        Math.random().toString(36).slice(-8);
      const hashedPswd = bcryptjs.hashSync(generatedPswd, 10);
      const newUser = new User({
        username:
          req.body.name.toLowerCase().split(" ").join("") +
          Math.random().toString(36).slice(-8),

        email: req.body.email,
        profilePhoto: req.body.photo,
        password: hashedPswd,
      });
      await newUser.save();
      const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET);
      const { password: hashedPswd2, ...rest } = newUser._doc;
      const expiryDate = new Date(Date.now() + 3600000); // 1 hour
      res
        .cookie("access_token", token, {
          httpOnly: true,
          expires: expiryDate,
        })
        .status(200)
        .json(rest);
    }
  } catch (err) {
    next(err);
  }
};

export const signout = async (req, res) => {
  res.clearCookie("access_token").status(200).json("Signout Success!");
};
