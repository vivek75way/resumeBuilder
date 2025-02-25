import { body } from "express-validator";

export const createUser = [
  body("username").isString().withMessage("username must be a string"),
  body("email").isString().withMessage("email must be a string"),
  body("password").isLength({ min: 6 }).withMessage("Password must be at least 6 characters"),
];


