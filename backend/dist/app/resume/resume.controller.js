"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResumeController = void 0;
const resume_service_1 = require("./resume.service");
const resumeService = new resume_service_1.ResumeService();
class ResumeController {
    async getResumeById(req, res, next) {
        try {
            const { id } = req.params;
            const resume = await resumeService.getResumeById(id);
            if (!resume)
                return res.status(404).json({ error: "Resume not found" });
            res.json(resume);
        }
        catch (error) {
            console.error("Error fetching resume:", error);
            next(error);
        }
    }
    async createResume(req, res, next) {
        var _a;
        try {
            const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id; // ✅ Now TypeScript recognizes req.user
            if (!userId) {
                return res.status(401).json({ message: "Unauthorized: No user ID found" });
            }
            const { fullName, email, phone, skills, education, experience, address } = req.body;
            const resumeData = {
                user: { connect: { id: userId } },
                fullName,
                email,
                phone,
                skills,
                education,
                experience,
                address: address || null,
            };
            const resume = await resumeService.createResume(resumeData);
            return res.status(201).json(resume);
        }
        catch (error) {
            console.error("Error creating resume:", error);
            next(error);
        }
    }
    async updateResume(req, res, next) {
        var _a;
        try {
            const { id } = req.params;
            const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
            if (!userId) {
                return res.status(401).json({ message: "Unauthorized: No user ID found" });
            }
            const resume = await resumeService.getResumeById(id);
            if (!resume) {
                return res.status(404).json({ message: "Resume not found" });
            }
            if (resume.userId !== userId) {
                return res.status(403).json({ message: "Forbidden: Cannot update this resume" });
            }
            const updatedResume = await resumeService.updateResume(id, req.body);
            return res.json(updatedResume);
        }
        catch (error) {
            console.error("Error updating resume:", error);
            next(error);
        }
    }
    async deleteResume(req, res, next) {
        var _a;
        try {
            const { id } = req.params;
            const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
            if (!userId) {
                return res.status(401).json({ message: "Unauthorized: No user ID found" });
            }
            const resume = await resumeService.getResumeById(id);
            if (!resume) {
                return res.status(404).json({ message: "Resume not found" });
            }
            if (resume.userId !== userId) {
                return res.status(403).json({ message: "Forbidden: Cannot delete this resume" });
            }
            await resumeService.deleteResume(id);
            return res.json({ message: "Resume deleted successfully" });
        }
        catch (error) {
            console.error("Error deleting resume:", error);
            next(error);
        }
    }
}
exports.ResumeController = ResumeController;
exports.default = ResumeController;
