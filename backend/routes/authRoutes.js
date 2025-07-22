import express from "express";
import { Register, Login } from "../controllers/authController.js";
const router = express.Router();

router.post("/sign-up", Register);
router.post("/login", Login);
export default router;
