"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const user_service_1 = require("./user.service");
const response_helper_1 = require("../common/helper/response.helper");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class UserController {
    constructor() {
        this.register = async (req, res) => {
            try {
                const result = await this.userService.register(req.body);
                return this.responseHelper.success(res, result, 'User registered successfully');
            }
            catch (error) {
                return this.responseHelper.error(res, error);
            }
        };
        this.login = async (req, res) => {
            try {
                const result = await this.userService.login(req.body);
                return this.responseHelper.success(res, result, 'Login successful');
            }
            catch (error) {
                return this.responseHelper.error(res, error);
            }
        };
        this.refreshToken = async (req, res) => {
            try {
                const { refreshToken } = req.body;
                if (!refreshToken) {
                    throw new Error("Refresh token is required");
                }
                const decoded = jsonwebtoken_1.default.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET || "refresh_secret");
                const newAccessToken = jsonwebtoken_1.default.sign({ id: decoded.id }, process.env.JWT_SECRET || "secret", { expiresIn: "15m" } // Issue new short-lived token
                );
                return this.responseHelper.success(res, { accessToken: newAccessToken }, "Token refreshed successfully");
            }
            catch (error) {
                return this.responseHelper.error(res, {
                    statusCode: 401,
                    message: "Invalid or expired refresh token",
                });
            }
        };
        this.getProfile = async (req, res) => {
            var _a;
            try {
                if (!((_a = req.user) === null || _a === void 0 ? void 0 : _a.id)) {
                    throw new Error('Unauthorized');
                }
                const result = await this.userService.getProfile(req.user.id);
                return this.responseHelper.success(res, result, 'Profile retrieved successfully');
            }
            catch (error) {
                return this.responseHelper.error(res, error);
            }
        };
        this.userService = new user_service_1.UserService();
        this.responseHelper = new response_helper_1.ResponseHelper();
    }
}
exports.UserController = UserController;
