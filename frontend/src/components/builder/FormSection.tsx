import React from 'react';
import PersonalInfoForm from '../forms/PersonalInfoForm';
import EducationForm from '../forms/EducationForm';
import ExperienceForm from '../forms/ExperienceForm';
import SkillsForm from '../forms/SkillsForm';

interface FormSectionProps {
  activeSection: string;
}

const FormSection: React.FC<FormSectionProps> = ({ activeSection }) => {
  return (
    <div className="space-y-6">
      {activeSection === "personal" && <PersonalInfoForm />}
      {activeSection === "education" && <EducationForm />}
      {activeSection === "experience" && <ExperienceForm />}
      {activeSection === "skills" && <SkillsForm />}
    </div>
  );
};

export default FormSection;