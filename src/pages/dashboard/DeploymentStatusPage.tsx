import { ArrowLeft, Check, Loader2, AlertCircle } from "lucide-react";
import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
  projectsApi,
  environmentsApi,
  deploymentsApi,
} from "../../services/api";

export default function DeploymentStatusPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const projectId = searchParams.get("projectId");

  const [project, setProject] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isDeploying, setIsDeploying] = useState(false);
  const [envVars, setEnvVars] = useState<{ key: string; value: string }[]>([]);
  const [deploymentStatus, setDeploymentStatus] = useState<
    "idle" | "deploying" | "success" | "error"
  >("idle");
  const [error, setError] = useState("");

  // Fetch project details on mount
  useEffect(() => {
    const fetchProject = async () => {
      try {
        if (!projectId) {
          setError("Project ID not found");
          setIsLoading(false);
          return;
        }

        const response = await projectsApi.getProject(projectId);
        if (response.success) {
          setProject(response.data);
        } else {
          setError("Failed to load project");
        }
      } catch (err: any) {
        console.error("Error fetching project:", err);
        setError(err.message || "Failed to load project");
      } finally {
        setIsLoading(false);
      }
    };

    fetchProject();
  }, [projectId]);

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
    if (!projectId) {
      setError("Project ID not found");
      return;
    }

    try {
      setIsDeploying(true);
      setDeploymentStatus("deploying");
      setError("");

      // Step 1: Create environment (production by default)
      const envResponse = await environmentsApi.createEnvironment(projectId, {
        name: "production",
        type: "production",
        environmentVariables: Object.fromEntries(
          envVars.filter((v) => v.key).map((v) => [v.key, v.value])
        ),
      });

      if (!envResponse.success || !envResponse.data?.id) {
        setDeploymentStatus("error");
        setError("Failed to create environment");
        return;
      }

      const environmentId = envResponse.data.id;

      // Step 2: Trigger deployment with environmentId
      const deployResponse = await deploymentsApi.createDeployment(
        environmentId,
        {
          projectId,
        }
      );

      if (deployResponse.success) {
        setDeploymentStatus("success");
        // Redirect to projects after 2 seconds
        setTimeout(() => {
          navigate("/dashboard/projects?deployed=true");
        }, 2000);
      } else {
        setDeploymentStatus("error");
        setError(deployResponse.message || "Deployment failed");
      }
    } catch (err: any) {
      setDeploymentStatus("error");
      setError(
        err.response?.data?.message || err.message || "Deployment failed"
      );
      console.error("Deployment error:", err);
    } finally {
      setIsDeploying(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 size={32} className="animate-spin text-purple-600" />
      </div>
    );
  }

  if (!project) {
    return (
      <div className="space-y-6 w-full max-w-2xl">
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate("/dashboard/create-project")}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
          >
            <ArrowLeft size={20} className="text-gray-600 dark:text-gray-400" />
          </button>
          <h1 className="text-2xl font-normal text-black dark:text-white">
            Project Not Found
          </h1>
        </div>
        <div className="p-4 bg-red-50 dark:bg-red-950 border border-red-200 dark:border-red-800 rounded-lg">
          <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 w-full max-w-2xl">
      {/* Header */}
      <div className="flex items-center gap-4">
        <button
          onClick={() => navigate("/dashboard/projects")}
          className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
        >
          <ArrowLeft size={20} className="text-gray-600 dark:text-gray-400" />
        </button>
        <div>
          <h1 className="text-2xl font-normal text-black dark:text-white">
            {project.name}
          </h1>
          <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">
            Ready to deploy
          </p>
        </div>
      </div>

      {/* Error Alert */}
      {error && (
        <div className="p-4 bg-red-50 dark:bg-red-950 border border-red-200 dark:border-red-800 rounded-lg flex gap-3">
          <AlertCircle
            size={20}
            className="text-red-600 flex-shrink-0 mt-0.5"
          />
          <div>
            <p className="text-sm font-medium text-red-600 dark:text-red-400">
              Error
            </p>
            <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
          </div>
        </div>
      )}

      {/* Project Summary */}
      <div className="bg-white dark:bg-gray-950 border border-gray-200 dark:border-gray-800 rounded-lg p-6 space-y-4">
        <div>
          <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase mb-1">
            Repository
          </label>
          <p className="text-sm text-black dark:text-white">
            {project.repository_url}
          </p>
        </div>
        <div>
          <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase mb-1">
            Framework
          </label>
          <p className="text-sm text-black dark:text-white">
            {project.framework}
          </p>
        </div>
        <div>
          <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase mb-1">
            Status
          </label>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
            <span className="text-sm text-black dark:text-white capitalize">
              {project.status}
            </span>
          </div>
        </div>
      </div>

      {/* Environment Variables */}
      <div className="bg-white dark:bg-gray-950 border border-gray-200 dark:border-gray-800 rounded-lg p-6 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-medium text-black dark:text-white">
              Environment Variables
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              Optional: Add environment variables for your deployment
            </p>
          </div>
          <button
            onClick={addEnvVar}
            className="text-xs text-purple-600 dark:text-purple-400 hover:underline font-medium cursor-pointer"
          >
            Add Variable
          </button>
        </div>

        {envVars.length > 0 && (
          <div className="space-y-2">
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
          <p className="text-sm text-gray-500 dark:text-gray-400 py-2">
            No environment variables added
          </p>
        )}
      </div>

      {/* Deployment Status */}
      {deploymentStatus !== "idle" && (
        <div
          className={`p-6 rounded-lg border ${
            deploymentStatus === "success"
              ? "bg-green-50 dark:bg-green-950 border-green-200 dark:border-green-800"
              : deploymentStatus === "error"
              ? "bg-red-50 dark:bg-red-950 border-red-200 dark:border-red-800"
              : "bg-blue-50 dark:bg-blue-950 border-blue-200 dark:border-blue-800"
          }`}
        >
          <div className="flex items-center gap-3">
            {deploymentStatus === "deploying" && (
              <>
                <Loader2
                  size={24}
                  className="animate-spin text-blue-600 dark:text-blue-400"
                />
                <div>
                  <p
                    className={`font-medium ${
                      deploymentStatus === "deploying"
                        ? "text-blue-600 dark:text-blue-400"
                        : deploymentStatus === "success"
                        ? "text-green-600 dark:text-green-400"
                        : deploymentStatus === "error"
                        ? "text-red-600 dark:text-red-400"
                        : "text-blue-600 dark:text-blue-400"
                    }`}
                  >
                    Deploying your project...
                  </p>
                  <p className="text-sm text-blue-600 dark:text-blue-400 mt-1">
                    This may take a few minutes
                  </p>
                </div>
              </>
            )}
            {deploymentStatus === "success" && (
              <>
                <Check
                  size={24}
                  className="text-green-600 dark:text-green-400"
                />
                <div>
                  <p className="font-medium text-green-600 dark:text-green-400">
                    Deployment successful!
                  </p>
                  <p className="text-sm text-green-600 dark:text-green-400 mt-1">
                    Your project is now live
                  </p>
                </div>
              </>
            )}
            {deploymentStatus === "error" && (
              <>
                <AlertCircle
                  size={24}
                  className="text-red-600 dark:text-red-400"
                />
                <div>
                  <p className="font-medium text-red-600 dark:text-red-400">
                    Deployment failed
                  </p>
                  <p className="text-sm text-red-600 dark:text-red-400 mt-1">
                    Check the error message above
                  </p>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex gap-3">
        <button
          onClick={() => navigate("/dashboard/projects")}
          className="flex-1 px-6 py-3 border border-gray-200 dark:border-gray-800 rounded-lg text-black dark:text-white font-medium hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors cursor-pointer disabled:opacity-50"
          disabled={isDeploying}
        >
          Go to Dashboard
        </button>
        <button
          onClick={handleDeploy}
          disabled={isDeploying || deploymentStatus === "success"}
          className={`flex-1 flex items-center justify-center gap-2 px-6 py-3 font-medium rounded-lg transition-colors cursor-pointer ${
            isDeploying || deploymentStatus === "success"
              ? "bg-gray-300 dark:bg-gray-700 text-gray-500 dark:text-gray-400 cursor-not-allowed"
              : "bg-purple-600 text-white hover:bg-purple-700"
          }`}
        >
          {isDeploying ? (
            <>
              <Loader2 size={18} className="animate-spin" />
              Deploying...
            </>
          ) : deploymentStatus === "success" ? (
            <>
              <Check size={18} />
              Deployed
            </>
          ) : (
            "Deploy Now"
          )}
        </button>
      </div>
    </div>
  );
}
