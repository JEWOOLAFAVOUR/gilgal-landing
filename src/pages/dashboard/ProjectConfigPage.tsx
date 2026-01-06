import { ArrowLeft, ArrowRight, Loader2 } from "lucide-react";
import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { projectsApi } from "../../services/api";

export default function ProjectConfigPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const repoParam = searchParams.get("repo");

  let repositoryData: any = null;
  try {
    if (repoParam) {
      repositoryData = JSON.parse(repoParam);
    }
  } catch (e) {
    console.error("Failed to parse repo data:", e);
  }

  const [projectName, setProjectName] = useState("");
  const [branch, setBranch] = useState("main");
  const [envVars, setEnvVars] = useState<{ key: string; value: string }[]>([]);
  const [isDeploying, setIsDeploying] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    // Auto-generate project name from repo name if needed
    if (repositoryData && !projectName) {
      setProjectName(repositoryData.name || "");
    }
  }, [repositoryData, projectName]);

  const addEnvVar = () => {
    setEnvVars([...envVars, { key: "", value: "" }]);
  };

  const removeEnvVar = (index: number) => {
    setEnvVars(envVars.filter((_, i) => i !== index));
  };

  const updateEnvVar = (
    index: number,
    field: "key" | "value",
    value: string
  ) => {
    const updated = [...envVars];
    updated[index][field] = value;
    setEnvVars(updated);
  };

  const handleDeploy = async () => {
    if (!projectName.trim()) {
      setError("Project name is required");
      return;
    }

    if (!repositoryData || !repositoryData.clone_url) {
      setError("Repository not selected");
      return;
    }

    try {
      setIsDeploying(true);
      setError("");

      // Call backend to create project with FULL git clone URL
      const response = await projectsApi.createProject({
        name: projectName,
        repositoryUrl: repositoryData.clone_url, // Use full git URL!
        framework: "Node", // Default framework - can be enhanced with detection
        description: `Auto-deployed from GitHub repository: ${repositoryData.full_name}`,
      });

      if (response.success && response.data.id) {
        // Redirect to deployment status page to deploy the project
        navigate(`/dashboard/deployment-status?projectId=${response.data.id}`);
      } else {
        setError(response.message || "Failed to create project");
      }
    } catch (err: any) {
      setError(
        err.response?.data?.message || err.message || "Failed to deploy project"
      );
      console.error("Deploy error:", err);
    } finally {
      setIsDeploying(false);
    }
  };

  return (
    <div className="space-y-6 w-full max-w-2xl">
      {/* Header */}
      <div className="flex items-center gap-4">
        <button
          onClick={() => navigate("/dashboard/create-project")}
          className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
        >
          <ArrowLeft size={20} className="text-gray-600 dark:text-gray-400" />
        </button>
        <div>
          <h1 className="text-2xl font-normal text-black dark:text-white">
            Configure Project
          </h1>
          <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">
            Set up your deployment configuration
          </p>
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="p-3 bg-red-50 dark:bg-red-950 border border-red-200 dark:border-red-800 rounded-lg">
          <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
        </div>
      )}

      {/* Configuration Form */}
      <div className="bg-white dark:bg-gray-950 border border-gray-200 dark:border-gray-800 rounded-lg p-6 space-y-6">
        {/* Project Name */}
        <div>
          <label className="block text-sm font-medium text-black dark:text-white mb-2">
            Project Name
          </label>
          <input
            type="text"
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
            placeholder="My Awesome Project"
            className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg text-black dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-600"
          />
          <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
            This is how your project will appear in your dashboard
          </p>
        </div>

        {/* Branch Selection */}
        <div>
          <label className="block text-sm font-medium text-black dark:text-white mb-2">
            Branch to Deploy
          </label>
          <input
            type="text"
            value={branch}
            onChange={(e) => setBranch(e.target.value)}
            placeholder="main"
            className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg text-black dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-600"
          />
          <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
            Deployment will automatically trigger on commits to this branch
          </p>
        </div>

        {/* Environment Variables */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <label className="block text-sm font-medium text-black dark:text-white">
              Environment Variables (Optional)
            </label>
            <button
              onClick={addEnvVar}
              className="text-xs text-purple-600 dark:text-purple-400 hover:underline font-medium cursor-pointer"
            >
              Add Variable
            </button>
          </div>

          {envVars.length > 0 && (
            <div className="space-y-3">
              {envVars.map((envVar, idx) => (
                <div key={idx} className="flex gap-2">
                  <input
                    type="text"
                    placeholder="KEY"
                    value={envVar.key}
                    onChange={(e) => updateEnvVar(idx, "key", e.target.value)}
                    className="flex-1 px-3 py-2 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg text-sm text-black dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-600"
                  />
                  <input
                    type="text"
                    placeholder="value"
                    value={envVar.value}
                    onChange={(e) => updateEnvVar(idx, "value", e.target.value)}
                    className="flex-1 px-3 py-2 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg text-sm text-black dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-600"
                  />
                  <button
                    onClick={() => removeEnvVar(idx)}
                    className="px-3 py-2 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950 rounded-lg transition-colors text-sm font-medium cursor-pointer"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
          )}

          {envVars.length === 0 && (
            <p className="text-sm text-gray-500 dark:text-gray-400 py-3">
              No environment variables added yet
            </p>
          )}
        </div>
      </div>

      {/* Deploy Button */}
      <div className="flex gap-3">
        <button
          onClick={() => navigate("/dashboard/create-project")}
          className="flex-1 px-6 py-3 border border-gray-200 dark:border-gray-800 rounded-lg text-black dark:text-white font-medium hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors cursor-pointer"
        >
          Back
        </button>
        <button
          onClick={handleDeploy}
          disabled={isDeploying || !projectName.trim()}
          className={`flex-1 flex items-center justify-center gap-2 px-6 py-3 font-medium rounded-lg transition-colors cursor-pointer ${
            isDeploying || !projectName.trim()
              ? "bg-gray-300 dark:bg-gray-700 text-gray-500 dark:text-gray-400 cursor-not-allowed"
              : "bg-purple-600 text-white hover:bg-purple-700"
          }`}
        >
          {isDeploying ? (
            <>
              <Loader2 size={18} className="animate-spin" />
              Deploying...
            </>
          ) : (
            <>
              Deploy Project
              <ArrowRight size={18} />
            </>
          )}
        </button>
      </div>
    </div>
  );
}
