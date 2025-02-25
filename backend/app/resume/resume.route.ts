import { Router } from "express";
import { catchError } from "../common/middleware/cath-error.middleware";
import * as resumeController from "./resume.controller";
import * as resumeValidator from "./resume.validation";

const router = Router();

router
  .get("/getresume", resumeController.getAllResume)
  .get("getresume/:id", resumeController.getResumeById)
  .delete("deleteresume/:id", resumeController.deleteResume)
  .post(
    "/createresume",
    resumeValidator.createResume,
    catchError,
    resumeController.createResume,
  )
  .put(
    "updateresume/:id",
    resumeValidator.updateResume,
    catchError,
    resumeController.updateResume,
  )
  

export default router;
