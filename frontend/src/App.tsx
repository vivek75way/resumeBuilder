import { Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "./store/store";
import Authenticated from "./layouts/Authenticated";
import HomePage from "./pages/HomePage";
import ResumeBuilder from "./pages/ResumeBuilder";
import ResumePreview from "./components/ResumePreview";
import LoginForm from "./pages/LoginForm";
import SignupForm from "./pages/SignupForm";

function App() {
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);

  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={isAuthenticated ? <Navigate to="/dashboard" /> : <Navigate to="/login" />} />
      <Route path="/login" element={!isAuthenticated ? <LoginForm /> : <Navigate to="/dashboard" />} />
      <Route path="/signup" element={!isAuthenticated ? <SignupForm /> : <Navigate to="/dashboard" />} />

      {/* Protected Routes */}
      <Route element={<Authenticated />}>
        <Route path="/dashboard" element={<HomePage />} />
        <Route path="/builder" element={<ResumeBuilder />} />
        <Route path="/preview/:id" element={<ResumePreview />} />
        <Route path="/templates" element={<ResumeBuilder />} />
        <Route path="/my-resumes" element={<HomePage />} />
      </Route>

      {/* Catch all route - Redirect to appropriate page based on auth status */}
      <Route path="*" element={isAuthenticated ? <Navigate to="/dashboard" /> : <Navigate to="/login" />} />
    </Routes>
  );
}

export default App;