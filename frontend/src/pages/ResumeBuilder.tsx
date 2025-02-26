import { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { useCreateResumeMutation } from "../services/api";
import TemplateSelector from "../components/TemplateSelector";
import FormSection from "../components/builder/FormSection";
import ResumePreview from "../components/ResumePreview";

const ResumeBuilder = () => {
  const [activeSection, setActiveSection] = useState("personal");
  const [createResume, { isLoading, isError, isSuccess }] = useCreateResumeMutation();

  const sections = [
    { id: "personal", label: "Personal Info" },
    { id: "education", label: "Education" },
    { id: "experience", label: "Experience" },
    { id: "skills", label: "Skills" },
  ];

  const resumeData = useSelector((state: RootState) => state.resume);
  const user = useSelector((state: RootState) => state.auth.user);

  const handleSave = async () => {
    if (!user) {
      alert("Please log in first.");
      return;
    }

    try {
      const payload = {
        fullName: resumeData.personalInfo.fullName,
        email: resumeData.personalInfo.email,
        phone: resumeData.personalInfo.phone,
        skills: resumeData.skills,
        education: resumeData.education,
        experience: resumeData.experience,
        address: resumeData.personalInfo.address,
      };

      await createResume(payload).unwrap();
      alert("Resume saved successfully!");
    } catch (error) {
      console.error("Error saving resume:", error);
      alert("Failed to save resume. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex justify-between items-center mb-12">
            <TemplateSelector />
            </div>
            <div className="flex gap-4 mb-6">
              {sections.map((section) => (
                <button
                  key={section.id}
                  onClick={() => setActiveSection(section.id)}
                  className={`px-4 py-2 rounded ${
                    activeSection === section.id
                      ? "bg-indigo-600 text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  {section.label}
                </button>
              ))}
            </div>

            <FormSection activeSection={activeSection} />
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6">
            <ResumePreview />
          </div>
        </div>

        <button
          onClick={handleSave}
          className="px-4 py-2 rounded bg-indigo-600 text-white mt-5"
          disabled={isLoading}
        >
          {isLoading ? "Saving..." : "Save"}
        </button>

        {isSuccess && (
          <p className="text-green-600 mt-2">Resume saved successfully!</p>
        )}
        {isError && <p className="text-red-600 mt-2">Failed to save resume.</p>}
      </div>
    </div>
  );
};

export default ResumeBuilder;