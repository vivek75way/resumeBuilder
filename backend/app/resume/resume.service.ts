import { PrismaClient, Prisma, Resume } from '@prisma/client';

const prisma = new PrismaClient();

export class ResumeService {
  async getResumeById(resumeId: string): Promise<Resume | null> {
    try {
      return await prisma.resume.findUnique({ where: { id: resumeId } });
    } catch (error) {
      console.error('Error fetching resume:', error);
      throw new Error('Could not fetch resume');
    }
  }

  async getAllResumes(): Promise<Resume[]> {
    try {
      return await prisma.resume.findMany();
    } catch (error) {
      console.error("Error fetching all resumes:", error);
      throw new Error("Could not fetch resumes");
    }
  }

  async createResume(data: Prisma.ResumeCreateInput): Promise<Resume> {
    try {
      return await prisma.resume.create({ data });
    } catch (error) {
      console.error('Error creating resume:', error);
      throw new Error('Could not create resume');
    }
  }

  async updateResume(resumeId: string, data: Prisma.ResumeUpdateInput): Promise<Resume> {
    try {
      const resume = await prisma.resume.findUnique({ where: { id: resumeId } });

      if (!resume) {
        throw new Error('Resume not found');
      }

      return await prisma.resume.update({
        where: { id: resumeId },
        data,
      });
    } catch (error) {
      console.error('Error updating resume:', error);
      throw new Error('Could not update resume');
    }
  }

  async deleteResume(resumeId: string): Promise<void> {
    try {
      const resume = await prisma.resume.findUnique({ where: { id: resumeId } });

      if (!resume) {
        throw new Error('Resume not found');
      }

      await prisma.resume.delete({ where: { id: resumeId } });
    } catch (error) {
      console.error('Error deleting resume:', error);
      throw new Error('Could not delete resume');
    }
  }
}