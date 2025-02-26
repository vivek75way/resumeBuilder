"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateResumeDTO = exports.createResumeDTO = void 0;
const express_validator_1 = require("express-validator");
exports.createResumeDTO = [
    (0, express_validator_1.body)('fullName').notEmpty().withMessage('Full name is required'),
    (0, express_validator_1.body)('email').isEmail().withMessage('Valid email is required'),
    (0, express_validator_1.body)('phone')
        .matches(/^\d{10}$/)
        .withMessage('Phone number must be 10 digits'),
    (0, express_validator_1.body)('address').optional().isString().withMessage('Address must be a string'),
    (0, express_validator_1.body)('skills').isArray().withMessage('Skills must be an array'),
    (0, express_validator_1.body)('education').isArray({ min: 1 }).withMessage('Education must be a non-empty array'),
    (0, express_validator_1.body)('experience').isArray({ min: 1 }).withMessage('Experience must be a non-empty array'),
];
exports.updateResumeDTO = [
    (0, express_validator_1.body)('fullName').optional().notEmpty().withMessage('Full name cannot be empty'),
    (0, express_validator_1.body)('email').optional().isEmail().withMessage('Valid email is required'),
    (0, express_validator_1.body)('phone')
        .optional()
        .matches(/^\d{10}$/)
        .withMessage('Phone number must be 10 digits'),
    (0, express_validator_1.body)('address').optional().isString().withMessage('Address must be a string'),
    (0, express_validator_1.body)('skills').optional().isArray().withMessage('Skills must be an array'),
    (0, express_validator_1.body)('education').optional().isArray().withMessage('Education must be an array'),
    (0, express_validator_1.body)('experience').optional().isArray().withMessage('Experience must be an array'),
];
