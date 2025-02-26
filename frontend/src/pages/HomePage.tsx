import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useGetAllResumesQuery } from "../services/api";
import { FileText, Plus, Download, Edit, Trash2 } from "lucide-react";

const HomePage = () => {
  const navigate = useNavigate();
  const { data: resumes, isLoading, error } = useGetAllResumesQuery();

  useEffect(() => {
    const isAuthenticated = localStorage.getItem("user");
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [navigate]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <p className="text-red-600 text-lg font-medium">Error loading resumes. Please try again later.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 px-6 py-8">
      <div className="container mx-auto max-w-6xl">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900">My Resumes</h1>
          <Link
            to="/builder"
            className="flex items-center gap-2 bg-indigo-600 text-white px-5 py-3 rounded-xl shadow-md hover:bg-indigo-700 transition"
          >
            <Plus className="w-5 h-5" /> Create New Resume
          </Link>
        </div>

        {resumes?.length === 0 ? (
          <div className="text-center py-16">
            <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h2 className="text-2xl font-semibold text-gray-700 mb-3">No Resumes Yet</h2>
            <p className="text-gray-500 mb-6">Create your first resume to get started</p>
            <Link
              to="/builder"
              className="inline-flex items-center gap-2 bg-indigo-600 text-white px-6 py-3 rounded-xl shadow-md hover:bg-indigo-700 transition"
            >
              <Plus className="w-5 h-5" /> Create Resume
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {resumes?.map((resume: any) => (
              <div
                key={resume.id}
                className="bg-white rounded-xl shadow-lg overflow-hidden transition-transform transform hover:scale-105"
              >
                <img
                  src="data:image/jpeg;base64,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"
                  className="w-full h-52 object-cover"
                  alt={resume.fullName}
                />
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-800 mb-3">{resume.fullName}</h3>
                  <div className="flex gap-3">
                    <button
                      onClick={() => navigate(`/preview/${resume.id}`)}
                      className="flex-1 flex items-center justify-center gap-2 bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition"
                    >
                      <Download className="w-4 h-4" /> Download
                    </button>
                    <button
                      onClick={() => navigate(`/builder?id=${resume.id}`)}
                      className="flex items-center justify-center gap-2 bg-indigo-100 text-indigo-700 px-4 py-2 rounded-lg hover:bg-indigo-200 transition"
                    >
                      <Edit className="w-4 h-4" /> Edit
                    </button>
                    <button
                      onClick={() => {
                        if (window.confirm("Are you sure you want to delete this resume?")) {
                          // Add delete functionality here
                        }
                      }}
                      className="flex items-center justify-center gap-2 bg-red-100 text-red-700 px-4 py-2 rounded-lg hover:bg-red-200 transition"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;
