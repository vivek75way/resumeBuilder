import { IUser } from "../backend/app/user/user.dto"; 

declare global {
  namespace Express {
    interface Request {
      user?: IUser; // Ensure this matches your User type
    }
  }
}
