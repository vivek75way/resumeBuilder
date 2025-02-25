import { type BaseSchema } from "../common/dto/base.dto";
import mongoose from "mongoose";

export interface IResume extends BaseSchema {
  userId?: mongoose.Types.ObjectId;
  title?: string;
  content?: string;
}
