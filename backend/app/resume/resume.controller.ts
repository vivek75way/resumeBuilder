import * as resumeService from "./resume.service";
import { createResponse } from "../common/helper/response.hepler";
import asyncHandler from "express-async-handler";
import { type Request, type Response } from "express";

export const createResume = asyncHandler(
  async (req: Request, res: Response) => {
    const result = await resumeService.createResume(req.body);
    res.send(createResponse(result, "Resume created sucssefully"));
  },
);


export const updateResume = asyncHandler(
  async (req: Request, res: Response) => {
    const result = await resumeService.updateResume(req.params.id, req.body);
    res.send(createResponse(result, "Resume updated sucssefully"));
  },
);


export const deleteResume = asyncHandler(
  async (req: Request, res: Response) => {
    const result = await resumeService.deleteResume(req.params.id);
    res.send(createResponse(result, "Resume deleted sucssefully"));
  },
);

export const getResumeById = asyncHandler(
  async (req: Request, res: Response) => {
    const result = await resumeService.getResumeById(req.params.id);
    res.send(createResponse(result));
  },
);

export const getAllResume = asyncHandler(
  async (req: Request, res: Response) => {
    const result = await resumeService.getAllResume();
    res.send(createResponse(result));
  },
);
