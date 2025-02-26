import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ResumeState {
  template: string;
  personalInfo: {
    fullName: string;
    email: string;
    phone: string;
    address: string;
  };
  education: Array<{
    institution: string;
    degree: string;
    year: string;
    gpa: string;
  }>;
  experience: Array<{
    company: string;
    position: string;
    duration: string;
    description: string;
  }>;
  skills: string[];
}

const initialState: ResumeState = {
  template: 'modern',
  personalInfo: {
    fullName: '',
    email: '',
    phone: '',
    address: '',
  },
  education: [],
  experience: [],
  skills: []
};

const resumeSlice = createSlice({
  name: 'resume',
  initialState,
  reducers: {
    setTemplate: (state, action: PayloadAction<string>) => {
      state.template = action.payload;
    },
    updatePersonalInfo: (state, action: PayloadAction<ResumeState['personalInfo']>) => {
      state.personalInfo = action.payload;
    },
    addEducation: (state, action: PayloadAction<ResumeState['education'][0]>) => {
      state.education.push(action.payload);
    },
    updateEducation: (state, action: PayloadAction<{ index: number; data: ResumeState['education'][0] }>) => {
      const { index, data } = action.payload;
      if (index >= 0 && index < state.education.length) {
        state.education[index] = data;
      }
    },
    removeEducation: (state, action: PayloadAction<number>) => {
      state.education = state.education.filter((_, i) => i !== action.payload);
    },
    addExperience: (state, action: PayloadAction<ResumeState['experience'][0]>) => {
      state.experience.push(action.payload);
    },
    updateExperience: (state, action: PayloadAction<{ index: number; data: ResumeState['experience'][0] }>) => {
      const { index, data } = action.payload;
      if (index >= 0 && index < state.experience.length) {
        state.experience[index] = data;
      }
    },
    removeExperience: (state, action: PayloadAction<number>) => {
      state.experience = state.experience.filter((_, i) => i !== action.payload);
    },
    updateSkills: (state, action: PayloadAction<string[]>) => {
      state.skills = action.payload;
    },
    addSkill: (state, action: PayloadAction<string>) => {
      state.skills.push(action.payload);
    },
    removeSkill: (state, action: PayloadAction<number>) => {
      state.skills = state.skills.filter((_, i) => i !== action.payload);
    }
  }
});

export const {
  setTemplate,
  updatePersonalInfo,
  addEducation,
  updateEducation,
  removeEducation,
  addExperience,
  updateExperience,
  removeExperience,
  updateSkills,
  addSkill,
  removeSkill
} = resumeSlice.actions;

export default resumeSlice.reducer;
