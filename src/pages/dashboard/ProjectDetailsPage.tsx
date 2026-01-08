import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { ArrowLeft, Edit2, AlertCircle, ExternalLink } from "lucide-react";
import { projectsApi } from "../../services/api";

export default function ProjectDetailsPage() {
  const { projectId } = useParams<{ projectId: string }>();
  const navigate = useNavigate();
  const [project, setProject] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  // Helper function to convert ISO date to readable format
  const formatDate = (dateString: string): string => {
    return new Date(dateString).toLocaleString();
  };

  // Get status color
  const getStatusColor = (status: string) => {
    if (status === "success") return "text-green-600 dark:text-green-400";
    if (status === "deploying") return "text-blue-600 dark:text-blue-400";
    return "text-gray-600 dark:text-gray-400";
  };

  const getStatusBg = (status: string) => {
    if (status === "success") return "bg-green-50 dark:bg-green-900/20";
    if (status === "deploying") return "bg-blue-50 dark:bg-blue-900/20";
    return "bg-gray-50 dark:bg-gray-900/20";
  };

  const getStatusIcon = (status: string) => {
    if (status === "success") return "🟢";
    if (status === "deploying") return "🔵";
    return "⚪";
  };

  // Fetch project details
  useEffect(() => {
    const fetchProject = async () => {
      if (!projectId) return;
      try {
        setIsLoading(true);
        setError("");
        const response = await projectsApi.getProject(projectId);

        if (response.success && response.data) {
          setProject(response.data);
        } else {
          setError("Failed to load project details");
        }
      } catch (err: any) {
        console.error("Error fetching project:", err);
        setError(
          err.response?.data?.message || "Failed to load project details"
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchProject();
  }, [projectId]);

  if (isLoading) {
    return (
      <div className="space-y-4 animate-pulse">
        <div className="h-12 bg-gray-300 dark:bg-gray-700 rounded w-1/3"></div>
        <div className="space-y-3">
          <div className="h-20 bg-gray-300 dark:bg-gray-700 rounded"></div>
          <div className="h-20 bg-gray-300 dark:bg-gray-700 rounded"></div>
          <div className="h-20 bg-gray-300 dark:bg-gray-700 rounded"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4 max-w-md">
          <div className="flex items-center gap-2 text-red-600 dark:text-red-400 mb-2">
            <AlertCircle size={20} />
            <h3 className="font-semibold">Error</h3>
          </div>
          <p className="text-red-700 dark:text-red-300 text-sm mb-4">{error}</p>
          <button
            onClick={() => navigate("/dashboard/projects")}
            className="w-full px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors text-sm font-medium"
          >
            Back to Projects
          </button>
        </div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 dark:text-gray-400">Project not found</p>
        <button
          onClick={() => navigate("/dashboard/projects")}
          className="mt-4 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors text-sm font-medium"
        >
          Back to Projects
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl">
      {/* Header */}
      <div className="flex items-center gap-2 mb-6">
        <button
          onClick={() => navigate("/dashboard/projects")}
          className="p-2 hover:bg-gray-200 dark:hover:bg-gray-800 rounded-lg transition-colors text-gray-600 dark:text-gray-400 cursor-pointer"
          title="Back to Projects"
        >
          <ArrowLeft size={20} />
        </button>
        <h1 className="text-3xl font-bold text-black dark:text-white">
          {project.name}
        </h1>
      </div>

      {/* Project Info Card */}
      <div className="bg-white dark:bg-gray-950 border border-gray-200 dark:border-gray-800 rounded-lg overflow-hidden shadow-sm mb-6">
        {/* Header Section */}
        <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900/50">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">
                  {project.name.charAt(0).toUpperCase()}
                </span>
              </div>
              <div>
                <h2 className="text-lg font-semibold text-black dark:text-white">
                  {project.name}
                </h2>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {project.slug}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() =>
                  navigate(`/dashboard/projects/${project.id}/edit`)
                }
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors text-sm font-medium cursor-pointer"
              >
                <Edit2 size={16} />
                Edit
              </button>
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div className="px-6 py-4 space-y-6">
          {/* Status */}
          <div>
            <label className="text-sm font-medium text-gray-600 dark:text-gray-400 block mb-2">
              Status
            </label>
            <div
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg font-medium text-sm ${getStatusColor(
                project.status
              )} ${getStatusBg(project.status)}`}
            >
              <span>{getStatusIcon(project.status)}</span>
              <span className="capitalize">{project.status}</span>
            </div>
          </div>

          {/* Description */}
          {project.description && (
            <div>
              <label className="text-sm font-medium text-gray-600 dark:text-gray-400 block mb-2">
                Description
              </label>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                {project.description}
              </p>
            </div>
          )}

          {/* Framework */}
          {project.framework && (
            <div>
              <label className="text-sm font-medium text-gray-600 dark:text-gray-400 block mb-2">
                Framework
              </label>
              <p className="text-gray-700 dark:text-gray-300 font-mono text-sm bg-gray-50 dark:bg-gray-900/50 rounded px-3 py-2">
                {project.framework}
              </p>
            </div>
          )}

          {/* Repository URL */}
          {project.repository_url && (
            <div>
              <label className="text-sm font-medium text-gray-600 dark:text-gray-400 block mb-2">
                Repository
              </label>
              <a
                href={project.repository_url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 transition-colors text-sm"
              >
                {project.repository_url}
                <ExternalLink size={14} />
              </a>
            </div>
          )}

          {/* Deployed URL */}
          {project.deployedUrl && (
            <div>
              <label className="text-sm font-medium text-gray-600 dark:text-gray-400 block mb-2">
                Live Project
              </label>
              <a
                href={project.deployedUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-green-600 dark:text-green-400 hover:text-green-700 dark:hover:text-green-300 transition-colors text-sm"
              >
                {project.deployedUrl}
                <ExternalLink size={14} />
              </a>
            </div>
          )}

          {/* Timestamps */}
          <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-200 dark:border-gray-800">
            <div>
              <label className="text-xs font-medium text-gray-500 dark:text-gray-500 uppercase tracking-wider block mb-1">
                Created
              </label>
              <p className="text-sm text-gray-700 dark:text-gray-300">
                {formatDate(project.created_at)}
              </p>
            </div>
            <div>
              <label className="text-xs font-medium text-gray-500 dark:text-gray-500 uppercase tracking-wider block mb-1">
                Last Updated
              </label>
              <p className="text-sm text-gray-700 dark:text-gray-300">
                {formatDate(project.updated_at)}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Additional Info */}
      <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
        <p className="text-sm text-blue-800 dark:text-blue-200">
          Project ID: <code className="font-mono">{project.id}</code>
        </p>
      </div>
    </div>
  );
}
