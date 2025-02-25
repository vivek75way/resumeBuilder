import { body } from "express-validator";

export const createResume = [
  body("userId"),
  body("title").isString().withMessage("title must be a string"),
  body("content").isString().withMessage("content must be a string"),
];

export const updateResume = [
  body("userId"),
  body("title").isString().withMessage("title must be a string"),
  body("content").isString().withMessage("content must be a string"),
];

export const editResume = [
  body("userId"),
  body("title").isString().withMessage("title must be a string"),
  body("content").isString().withMessage("content must be a string"),
];
