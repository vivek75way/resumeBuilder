import { type IResume } from "./resume.dto";
import ResumeSchema from "./resume.schema";

export const createResume = async (data: IResume) => {
  const result = await ResumeSchema.create({ ...data, active: true });
  return result;
};

export const updateResume = async (id: string, data: IResume) => {
  const result = await ResumeSchema.findOneAndUpdate({ _id: id }, data, {
    new: true,
  });
  return result;
};

export const editResume = async (id: string, data: Partial<IResume>) => {
  const result = await ResumeSchema.findOneAndUpdate({ _id: id }, data);
  return result;
};

export const deleteResume = async (id: string) => {
  const result = await ResumeSchema.deleteOne({ _id: id });
  return result;
};

export const getResumeById = async (id: string) => {
  const result = await ResumeSchema.findById(id).lean();
  return result;
};

export const getAllResume = async () => {
  const result = await ResumeSchema.find({}).lean();
  return result;
};
