"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.editResume = exports.updateResume = exports.createResume = void 0;
const express_validator_1 = require("express-validator");
exports.createResume = [
    (0, express_validator_1.body)("userId"),
    (0, express_validator_1.body)("title").isString().withMessage("title must be a string"),
    (0, express_validator_1.body)("content").isString().withMessage("content must be a string"),
];
exports.updateResume = [
    (0, express_validator_1.body)("userId"),
    (0, express_validator_1.body)("title").isString().withMessage("title must be a string"),
    (0, express_validator_1.body)("content").isString().withMessage("content must be a string"),
];
exports.editResume = [
    (0, express_validator_1.body)("userId"),
    (0, express_validator_1.body)("title").isString().withMessage("title must be a string"),
    (0, express_validator_1.body)("content").isString().withMessage("content must be a string"),
];
