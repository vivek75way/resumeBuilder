"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResponseHelper = void 0;
class ResponseHelper {
    success(res, data, message = "Success") {
        const response = {
            success: true,
            message,
            data,
        };
        return res.status(200).json(response);
    }
    error(res, error, message = "Error occurred") {
        const statusCode = error.statusCode || 500;
        const response = {
            success: false,
            message: error.message || message,
            data: null,
            error_code: statusCode,
        };
        return res.status(statusCode).json(response);
    }
}
exports.ResponseHelper = ResponseHelper;
