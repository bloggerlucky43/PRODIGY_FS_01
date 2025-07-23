import express from "express";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { Register, Login } from "../controllers/authController.js";
const router = express.Router();

router.post("/register", Register);
router.post("/login", Login);
router.get("/me", authMiddleware, (req, res) => {
  // req.user comes from the middleware (after JWT is verified)
  res.json({ user: req.user });
});

export default router;
