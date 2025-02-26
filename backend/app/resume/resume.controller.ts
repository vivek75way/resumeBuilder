import { Request, Response, NextFunction } from "express";
import { ResumeService } from "./resume.service";
import jwt from "jsonwebtoken";


const resumeService = new ResumeService();

export class ResumeController {
  async getResumeById(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const resume = await resumeService.getResumeById(id);

      if (!resume) return res.status(404).json({ error: "Resume not found" });

      res.json(resume);
    } catch (error) {
      console.error("Error fetching resume:", error);
      next(error);
    }
  }

  async getAllResumes(req: Request, res: Response, next: NextFunction) {
    try {
      const resumes = await resumeService.getAllResumes();
      res.json(resumes);
    } catch (error) {
      console.error("Error fetching all resumes:", error);
      next(error);
    }
  }

  
async createResume(req: Request, res: Response, next: NextFunction) {
  try {
    const token = req.headers.authorization?.split(" ")[1]; // Extract token from header

    if (!token) {
      return res.status(401).json({ message: "Unauthorized: No token provided" });
    }

    // Verify and decode the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as any;
    const userId = decoded?.id;

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
  } catch (error) {
    console.error("Error creating resume:", error);
    next(error);
  }
}

  
  async updateResume(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const userId: string | undefined = (req as any).user?.id;

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
    } catch (error) {
      console.error("Error updating resume:", error);
      next(error);
    }
  }

  async deleteResume(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const userId: string | undefined = (req as any).user?.id;

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
    } catch (error) {
      console.error("Error deleting resume:", error);
      next(error);
    }
  }
}


export default ResumeController;