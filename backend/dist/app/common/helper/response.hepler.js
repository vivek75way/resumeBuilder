"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createResponse = void 0;
const createResponse = (data, message) => {
    return { data, message, success: true };
};
exports.createResponse = createResponse;
