import { PrismaClient } from "@prisma/client";

export const prisma = new PrismaClient();

export const initDB = async (): Promise<void> => {
  try {
    await prisma.$connect();
    console.log("Database connected successfully");
  } catch (error) {
    console.error("Database connection failed:", error);
    process.exit(1); 
  }
};
