import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { ResponseHelper } from "../helper/response.helper";

const responseHelper = new ResponseHelper();

export interface AuthRequest extends Request {
  user?: {
    id: string;
    email: string;
    role?: string;
  };
}

export const authMiddleware = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return responseHelper.error(res, {
        statusCode: 401,
        message: "No token provided",
      });
    }

    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET || "secret"
    ) as { id: string; email: string; role?: string };

    if (!decoded || !decoded.id) {
      return responseHelper.error(res, {
        statusCode: 401,
        message: "Invalid token",
      });
    }

    req.user = {
      id: decoded.id,
      email: decoded.email,
      role: decoded.role || "user", // Default role if not present
    };

    console.log("Authenticated User:", req.user); // Debugging log

    next();
  } catch (error: any) {
    let message = "Unauthorized";
    if (error.name === "TokenExpiredError") {
      message = "Token expired. Please refresh your token.";
    } else if (error.name === "JsonWebTokenError") {
      message = "Invalid token";
    }

    console.error("Auth Middleware Error:", error.message); // Debugging log
    return responseHelper.error(res, { statusCode: 401, message });
  }
};
