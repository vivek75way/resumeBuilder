import express from "express";
import { ResumeController } from "./resume.controller";

const router = express.Router();

const resumeController = new ResumeController();

// Define routes
router.get("getresume/:id", resumeController.getResumeById);
router.get("/getallresume", resumeController.getAllResumes);
router.post("/createresume", resumeController.createResume);
router.put("updateresume/:id", resumeController.updateResume);
router.delete("deleteresume/:id", resumeController.deleteResume);

export default router;
