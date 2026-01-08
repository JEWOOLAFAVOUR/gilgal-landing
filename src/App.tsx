import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { ThemeProvider } from "./context/ThemeContext";
import { ProtectedRoute } from "./components/ProtectedRoute";
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/auth/LoginPage";
import SignupPage from "./pages/auth/SignupPage";
import DashboardLayout from "./pages/dashboard/DashboardLayout";
import ProjectsPage from "./pages/dashboard/ProjectsPage";
import ProjectDetailsPage from "./pages/dashboard/ProjectDetailsPage";
import CreateProjectPage from "./pages/dashboard/CreateProjectPage";
import ProjectConfigPage from "./pages/dashboard/ProjectConfigPage";
import DeploymentStatusPage from "./pages/dashboard/DeploymentStatusPage";
import SettingsPage from "./pages/dashboard/SettingsPage";
import "./index.css";

function App() {
  return (
    <ThemeProvider>
      <Router>
        <div className="min-h-screen bg-white dark:bg-black text-black dark:text-white transition-colors">
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<LandingPage />} />

            {/* Auth Routes */}
            <Route path="/auth/login" element={<LoginPage />} />
            <Route path="/auth/signup" element={<SignupPage />} />

            {/* Legacy routes for backward compatibility */}
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />

            {/* Dashboard Routes - Protected */}
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Navigate to="/dashboard/projects" replace />
                </ProtectedRoute>
              }
            />
            <Route
              path="/dashboard/projects"
              element={
                <ProtectedRoute>
                  <DashboardLayout>
                    <ProjectsPage />
                  </DashboardLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/dashboard/projects/:projectId"
              element={
                <ProtectedRoute>
                  <DashboardLayout>
                    <ProjectDetailsPage />
                  </DashboardLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/dashboard/create-project"
              element={
                <ProtectedRoute>
                  <DashboardLayout>
                    <CreateProjectPage />
                  </DashboardLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/dashboard/project-config"
              element={
                <ProtectedRoute>
                  <DashboardLayout>
                    <ProjectConfigPage />
                  </DashboardLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/dashboard/deployment-status"
              element={
                <ProtectedRoute>
                  <DashboardLayout>
                    <DeploymentStatusPage />
                  </DashboardLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/dashboard/settings"
              element={
                <ProtectedRoute>
                  <DashboardLayout>
                    <SettingsPage />
                  </DashboardLayout>
                </ProtectedRoute>
              }
            />

            {/* Catch all - redirect to home */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
