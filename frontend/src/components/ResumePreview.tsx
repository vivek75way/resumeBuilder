import React, { useRef } from 'react';
import { useSelector } from 'react-redux';
import ModernTemplate from './ResumeTemplates/ModernTemplate';
import ProfessionalTemplate from './ResumeTemplates/ProfessionalTemplate';
import PDFExport from './PDFExport';

const ResumePreview: React.FC = () => {
  const resumeData = useSelector((state: any) => state.resume);
  const contentRef = useRef<HTMLDivElement>(null);

  const getTemplate = () => {
    switch (resumeData.template) {
      case 'modern':
        return <ModernTemplate data={resumeData} />;
      case 'professional':
        return <ProfessionalTemplate data={resumeData} />;
      default:
        return <ModernTemplate data={resumeData} />;
    }
  };

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Resume Preview</h2>
        <PDFExport contentRef={contentRef} />
      </div>
      <div ref={contentRef} className="bg-white rounded-lg shadow-lg">
        {getTemplate()}
      </div>
    </div>
  );
};

export default ResumePreview;