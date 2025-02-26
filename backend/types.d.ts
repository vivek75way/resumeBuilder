import { Request } from "express";

declare module "express" {
  export interface Request {
    user?: {
      id: string;
      email: string;
      role?: string;
    };
  }
}
