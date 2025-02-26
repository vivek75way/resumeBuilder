"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const response_helper_1 = require("../helper/response.helper");
const responseHelper = new response_helper_1.ResponseHelper();
const authMiddleware = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return responseHelper.error(res, {
                statusCode: 401,
                message: "No token provided",
            });
        }
        const token = authHeader.split(" ")[1];
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET || "secret");
        if (!decoded) {
            return responseHelper.error(res, {
                statusCode: 401,
                message: "Invalid token",
            });
        }
        req.user = decoded;
        next();
    }
    catch (error) {
        let message = "Unauthorized";
        if (error.name === "TokenExpiredError") {
            message = "Token expired. Please refresh your token.";
        }
        else if (error.name === "JsonWebTokenError") {
            message = "Invalid token";
        }
        return responseHelper.error(res, { statusCode: 401, message });
    }
};
exports.authMiddleware = authMiddleware;
