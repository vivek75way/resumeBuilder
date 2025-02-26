import React from 'react';

const ModernTemplate: React.FC<{ data: any }> = ({ data }) => {
  return (
    <div className="p-8 max-w-4xl mx-auto bg-white shadow-lg">
      <header className="border-b-2 border-blue-500 pb-4 mb-6">
        <h1 className="text-4xl font-bold text-gray-800">{data.personalInfo?.fullName}</h1>
        <div className="text-gray-600 mt-2">
          <p>{data.personalInfo?.email} | {data.personalInfo?.phone}</p>
          <p>{data.personalInfo?.address}</p>
        </div>
      </header>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold text-blue-600 mb-3">Professional Summary</h2>
        <p className="text-gray-700">{data.personalInfo?.summary}</p>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold text-blue-600 mb-3">Experience</h2>
        {data.experience?.map((exp: any, index: number) => (
          <div key={index} className="mb-4">
            <h3 className="text-xl font-medium">{exp.company}</h3>
            <p className="text-gray-600">{exp.position}</p>
            <p className="text-gray-500">{exp.startDate} - {exp.endDate}</p>
            <p className="text-gray-700 mt-2">{exp.description}</p>
          </div>
        ))}
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold text-blue-600 mb-3">Education</h2>
        {data.education?.map((edu: any, index: number) => (
          <div key={index} className="mb-4">
            <h3 className="text-xl font-medium">{edu.institution}</h3>
            <p className="text-gray-600">{edu.degree}</p>
            <p className="text-gray-500">{edu.startDate} - {edu.endDate}</p>
          </div>
        ))}
      </section>

      <section>
        <h2 className="text-2xl font-semibold text-blue-600 mb-3">Skills</h2>
        <div className="flex flex-wrap gap-2">
          {data.skills?.map((skill: string, index: number) => (
            <span key={index} className="bg-gray-100 px-3 py-1 rounded-full text-gray-700">
              {skill}
            </span>
          ))}
        </div>
      </section>
    </div>
  );
};

export default ModernTemplate;