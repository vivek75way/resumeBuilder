import mongoose, { Schema } from "mongoose";
import { type IUser } from "./user.dto";


const UserSchema = new Schema<IUser>({
  username: { type: String, required: false },
  email: { type: String, required: false },
  password: { type: String, required: false },
});

export default mongoose.model<IUser>("user", UserSchema);
