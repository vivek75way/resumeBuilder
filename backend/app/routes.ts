import express from "express";
import userRoutes from "./user/user.route";
import resumeRoutes from "./resume/resume.route";

// routes
const router = express.Router();

router.use("/users", userRoutes);
router.use("/resume", resumeRoutes);

export default router;
