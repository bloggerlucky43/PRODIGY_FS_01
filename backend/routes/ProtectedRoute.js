import express from "express";
import { Dashboard } from "../controllers/Protected.js";
import { authMiddleware } from "../middleware/authMiddleware.js";
const router = express.Router();

router.get("/dashboard", authMiddleware, Dashboard);
export default router;
