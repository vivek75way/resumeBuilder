import { Response } from "express";

interface IResponse {
  success: boolean;
  message?: string;
  data: object | null | any;
}

export type ErrorResponse = IResponse & {
  error_code: number;
};

export class ResponseHelper {
  public success(res: Response, data: IResponse["data"], message: string = "Success") {
    const response: IResponse = {
      success: true,
      message,
      data,
    };
    return res.status(200).json(response);
  }

  public error(res: Response, error: any, message: string = "Error occurred") {
    const statusCode = error.statusCode || 500;
    const response: ErrorResponse = {
      success: false,
      message: error.message || message,
      data: null,
      error_code: statusCode,
    };
    return res.status(statusCode).json(response);
  }
}
