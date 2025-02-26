"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const client_1 = require("@prisma/client");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const prisma = new client_1.PrismaClient();
class UserService {
    async register(data) {
        const existingUser = await prisma.user.findUnique({
            where: { email: data.email },
        });
        if (existingUser) {
            throw new Error("Email already exists");
        }
        const hashedPassword = await bcryptjs_1.default.hash(data.password, 10);
        const user = await prisma.user.create({
            data: {
                email: data.email,
                password: hashedPassword,
                name: data.name,
            },
            select: {
                id: true,
                email: true,
                name: true,
            },
        });
        const accessToken = jsonwebtoken_1.default.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET || "secret", { expiresIn: "15m" } // Short-lived access token
        );
        const refreshToken = jsonwebtoken_1.default.sign({ id: user.id }, process.env.REFRESH_TOKEN_SECRET || "refresh_secret", { expiresIn: "7d" } // Long-lived refresh token
        );
        return { user, accessToken, refreshToken };
    }
    async login(data) {
        const user = await prisma.user.findUnique({
            where: { email: data.email },
            select: {
                id: true,
                email: true,
                name: true,
                password: true,
            },
        });
        if (!user) {
            throw new Error("Invalid credentials");
        }
        const isValidPassword = await bcryptjs_1.default.compare(data.password, user.password);
        if (!isValidPassword) {
            throw new Error("Invalid credentials");
        }
        const accessToken = jsonwebtoken_1.default.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET || "secret", { expiresIn: "15m" } // Short-lived access token
        );
        const refreshToken = jsonwebtoken_1.default.sign({ id: user.id }, process.env.REFRESH_TOKEN_SECRET || "refresh_secret", { expiresIn: "7d" } // Long-lived refresh token
        );
        return {
            user: {
                id: user.id,
                email: user.email,
                name: user.name,
            },
            accessToken,
            refreshToken,
        };
    }
    async getProfile(userId) {
        const user = await prisma.user.findUnique({
            where: { id: userId },
            select: {
                id: true,
                email: true,
                name: true,
            },
        });
        if (!user) {
            throw new Error("User not found");
        }
        return user;
    }
}
exports.UserService = UserService;
