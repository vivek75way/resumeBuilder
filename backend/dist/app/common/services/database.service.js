"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initDB = exports.prisma = void 0;
const client_1 = require("@prisma/client");
exports.prisma = new client_1.PrismaClient();
const initDB = async () => {
    try {
        await exports.prisma.$connect();
        console.log("Database connected successfully");
    }
    catch (error) {
        console.error("Database connection failed:", error);
        process.exit(1);
    }
};
exports.initDB = initDB;
