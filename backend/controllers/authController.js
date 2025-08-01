import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import User from "../models/User.js";

dotenv.config();
const saltRound = Number(process.env.SALT, 10);
export const Register = async (req, res) => {
  try {
    const { username, password, confirmPassword } = req.body;

    if (!username || !password || !confirmPassword) {
      return res.status(400).json({ message: "All fields are required" });
    }

    if (password.trim() !== confirmPassword.trim()) {
      return res.status(400).json({ message: "Passwords does not match" });
    }

    const existingUser = await User.findOne({
      where: { username: username.trim() },
    });
    if (existingUser) {
      console.log("The esiting user details", existingUser);
      return res.status(400).json({ message: "Username already exist" });
    }

    const hashedPassword = await bcrypt.hash(password.trim(), saltRound);

    await User.create({
      username,
      password: hashedPassword,
      role: "user",
    });

    res.status(200).json({ message: "User has been created" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

export const Login = async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password)
      return res.status(400).json({ message: "All fields are required" });
    const user = await User.findOne({ where: { username: username.trim() } });
    if (!user) return res.status(404).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(password.trim(), user.password);
    if (!isMatch)
      return res.status(404).json({ message: "Invalid credentials" });

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    console.log("jst token", token);

    res
      .cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "Lax",
        maxAge: 24 * 60 * 60 * 1000,
      })
      .json({ message: "Login successful", token: token });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
