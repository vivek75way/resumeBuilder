"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const resume_controller_1 = require("./resume.controller");
const router = express_1.default.Router();
const resumeController = new resume_controller_1.ResumeController();
// Define routes
router.get("/:id", resumeController.getResumeById);
router.post("/create", resumeController.createResume);
router.put("/:id", resumeController.updateResume);
router.delete("/:id", resumeController.deleteResume);
exports.default = router;
