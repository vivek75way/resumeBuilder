import React from 'react';

const ProfessionalTemplate: React.FC<{ data: any }> = ({ data }) => {
  return (
    <div className="p-8 max-w-4xl mx-auto bg-white shadow-lg">
      <header className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-900">{data.personalInfo?.fullName}</h1>
        <div className="text-gray-600 mt-2">
          <p>{data.personalInfo?.email} • {data.personalInfo?.phone}</p>
          <p>{data.personalInfo?.address}</p>
        </div>
      </header>

      <div className="grid grid-cols-3 gap-8">
        <div className="col-span-2">
          <section className="mb-6">
            <h2 className="text-2xl font-bold text-gray-800 border-b-2 border-gray-300 pb-2 mb-4">
              Professional Experience
            </h2>
            {data.experience?.map((exp: any, index: number) => (
              <div key={index} className="mb-4">
                <div className="flex justify-between items-baseline">
                  <h3 className="text-xl font-semibold">{exp.company}</h3>
                  <span className="text-gray-600">{exp.startDate} - {exp.endDate}</span>
                </div>
                <p className="text-gray-700 font-medium">{exp.position}</p>
                <p className="text-gray-600 mt-2">{exp.description}</p>
              </div>
            ))}
          </section>

          <section className="mb-6">
            <h2 className="text-2xl font-bold text-gray-800 border-b-2 border-gray-300 pb-2 mb-4">
              Education
            </h2>
            {data.education?.map((edu: any, index: number) => (
              <div key={index} className="mb-4">
                <div className="flex justify-between items-baseline">
                  <h3 className="text-xl font-semibold">{edu.institution}</h3>
                  <span className="text-gray-600">{edu.startDate} - {edu.endDate}</span>
                </div>
                <p className="text-gray-700">{edu.degree}</p>
              </div>
            ))}
          </section>
        </div>

        <div className="col-span-1">
          <section className="mb-6">
            <h2 className="text-2xl font-bold text-gray-800 border-b-2 border-gray-300 pb-2 mb-4">
              Skills
            </h2>
            <div className="flex flex-col gap-2">
              {data.skills?.map((skill: string, index: number) => (
                <span key={index} className="text-gray-700">• {skill}</span>
              ))}
            </div>
          </section>

          <section className="mb-6">
            <h2 className="text-2xl font-bold text-gray-800 border-b-2 border-gray-300 pb-2 mb-4">
              Summary
            </h2>
            <p className="text-gray-700">{data.personalInfo?.summary}</p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default ProfessionalTemplate;