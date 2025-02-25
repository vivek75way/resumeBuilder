import { type IUser } from "./user.dto";
import UserSchema from "./user.schema";

export const createUser = async (data: IUser) => {
  const result = await UserSchema.create(data);
  return result;
};


export const getUserByEmail = async (email: string) => {
  return await UserSchema.findOne({ email }).lean();
};
