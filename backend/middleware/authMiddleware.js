import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const authMiddleware = (req, res, next) => {
  try {
    const token = req.cookies.token;
    console.log("Cookies from request:", req.cookies);

    console.log("The token from middlewareis :", token);

    if (!token) return res.status(401).json({ message: "Not authenticated" });
    //   console.log(process.env.JWT_SECRET);

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log(decoded, "this is the decoded point");

    req.user = decoded;
    next();
  } catch (error) {
    console.error("JWT Error:", error.message);
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};
