"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResumeService = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
class ResumeService {
    async getResumeById(resumeId) {
        try {
            return await prisma.resume.findUnique({ where: { id: resumeId } });
        }
        catch (error) {
            console.error('Error fetching resume:', error);
            throw new Error('Could not fetch resume');
        }
    }
    async createResume(data) {
        try {
            return await prisma.resume.create({ data });
        }
        catch (error) {
            console.error('Error creating resume:', error);
            throw new Error('Could not create resume');
        }
    }
    async updateResume(resumeId, data) {
        try {
            const resume = await prisma.resume.findUnique({ where: { id: resumeId } });
            if (!resume) {
                throw new Error('Resume not found');
            }
            return await prisma.resume.update({
                where: { id: resumeId },
                data,
            });
        }
        catch (error) {
            console.error('Error updating resume:', error);
            throw new Error('Could not update resume');
        }
    }
    async deleteResume(resumeId) {
        try {
            const resume = await prisma.resume.findUnique({ where: { id: resumeId } });
            if (!resume) {
                throw new Error('Resume not found');
            }
            await prisma.resume.delete({ where: { id: resumeId } });
        }
        catch (error) {
            console.error('Error deleting resume:', error);
            throw new Error('Could not delete resume');
        }
    }
}
exports.ResumeService = ResumeService;
