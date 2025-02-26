import { body } from 'express-validator';

export const createResumeDTO = [
  body('fullName').notEmpty().withMessage('Full name is required'),
  body('email').isEmail().withMessage('Valid email is required'),
  body('phone')
    .matches(/^\d{10}$/)
    .withMessage('Phone number must be 10 digits'),
  body('address').optional().isString().withMessage('Address must be a string'),
  body('skills').isArray().withMessage('Skills must be an array'),
  body('education').isArray({ min: 1 }).withMessage('Education must be a non-empty array'),
  body('experience').isArray({ min: 1 }).withMessage('Experience must be a non-empty array'),
];

export const updateResumeDTO = [
  body('fullName').optional().notEmpty().withMessage('Full name cannot be empty'),
  body('email').optional().isEmail().withMessage('Valid email is required'),
  body('phone')
    .optional()
    .matches(/^\d{10}$/)
    .withMessage('Phone number must be 10 digits'),
  body('address').optional().isString().withMessage('Address must be a string'),
  body('skills').optional().isArray().withMessage('Skills must be an array'),
  body('education').optional().isArray().withMessage('Education must be an array'),
  body('experience').optional().isArray().withMessage('Experience must be an array'),
];