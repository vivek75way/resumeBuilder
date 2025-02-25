import mongoose from "mongoose";
import { type IResume } from "./resume.dto";

const Schema = mongoose.Schema;

const ResumeSchema = new Schema<IResume>(
  {
    userId: { type: mongoose.Types.ObjectId, required: false },
    title: { type: String, required: false },
    content: { type: String, required: false },
  },
  { timestamps: true },
);

export default mongoose.model<IResume>("resume", ResumeSchema);
