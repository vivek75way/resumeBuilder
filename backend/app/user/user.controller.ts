import { Request, Response } from 'express';
import { UserService } from './user.service';
import { ResponseHelper } from '../common/helper/response.helper';
import { AuthRequest } from '../common/middleware/auth.middleware';
import jwt from "jsonwebtoken";

export class UserController {
  private userService: UserService;
  private responseHelper: ResponseHelper;

  constructor() {
    this.userService = new UserService();
    this.responseHelper = new ResponseHelper();
  }

  public register = async (req: Request, res: Response) => {
    try {
      const result = await this.userService.register(req.body);
      return this.responseHelper.success(res, result, 'User registered successfully');
    } catch (error) {
      return this.responseHelper.error(res, error);
    }
  };

  public login = async (req: Request, res: Response) => {
    try {
      const result = await this.userService.login(req.body);
      return this.responseHelper.success(res, result, 'Login successful');
    } catch (error) {
      return this.responseHelper.error(res, error);
    }
  };

  public refreshToken = async (req: Request, res: Response) => {
    try {
      const { refreshToken } = req.body;
      if (!refreshToken) {
        throw new Error("Refresh token is required");
      }
  
      const decoded = jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET || "refresh_secret"
      ) as { id: string };
  
      const newAccessToken = jwt.sign(
        { id: decoded.id },
        process.env.JWT_SECRET || "secret",
        { expiresIn: "15m" } // Issue new short-lived token
      );
  
      return this.responseHelper.success(res, { accessToken: newAccessToken }, "Token refreshed successfully");
    } catch (error) {
      return this.responseHelper.error(res, {
        statusCode: 401,
        message: "Invalid or expired refresh token",
      });
    }
  };
  

  public getProfile = async (req: AuthRequest, res: Response) => {
    try {
      if (!req.user?.id) {
        throw new Error('Unauthorized');
      }
      const result = await this.userService.getProfile(req.user.id);
      return this.responseHelper.success(res, result, 'Profile retrieved successfully');
    } catch (error) {
      return this.responseHelper.error(res, error);
    }
  };
}
