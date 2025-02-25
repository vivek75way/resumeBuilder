import * as userService from "./user.service";
import { createResponse } from "../common/helper/response.hepler";
import asyncHandler from "express-async-handler";
import { type Request, type Response } from "express";

export const createUser = asyncHandler(async (req: Request, res: Response) => {
  const result = await userService.createUser(req.body);
  res.send(createResponse(result, "User created successfully"));
});

export const getUserByEmail = asyncHandler(async (req: Request, res: Response) => {
  const result = await userService.getUserByEmail(req.params.email);
  res.send(createResponse(result));
});
