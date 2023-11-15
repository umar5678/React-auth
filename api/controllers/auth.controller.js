import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";

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
