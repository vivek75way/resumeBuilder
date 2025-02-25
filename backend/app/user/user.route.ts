import { Router } from "express";
import { catchError } from "../common/middleware/cath-error.middleware";
import * as userController from "./user.controller";
import * as userValidator from "./user.validation";

const router = Router();

router
  .get("/email/:email", userController.getUserByEmail) 
  .post("/register", userValidator.createUser, catchError, userController.createUser);

export default router;
