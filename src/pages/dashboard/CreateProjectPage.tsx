import { Github, ArrowRight, CheckCircle2, Loader2 } from "lucide-react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { authApi } from "../../services/api";

export default function CreateProjectPage() {
  const navigate = useNavigate();
  const [isConnected, setIsConnected] = useState(false);
  const [selectedRepo, setSelectedRepo] = useState<string | null>(null);
  const [selectedRepoData, setSelectedRepoData] = useState<any>(null);
  const [repositories, setRepositories] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [gitHubUsername, setGitHubUsername] = useState("");

  // Check GitHub connection status on mount
  useEffect(() => {
    const checkGitHubStatus = async () => {
      try {
        const response = await authApi.getGitHubStatus();
        if (response.success && response.data.connected) {
          setIsConnected(true);
          setGitHubUsername(response.data.username);
          // Fetch repositories if already connected
          await fetchRepositories();
        }
      } catch (err) {
        console.error("Error checking GitHub status:", err);
      }
    };

    checkGitHubStatus();
  }, []);

  // Fetch user's repositories
  const fetchRepositories = async () => {
    try {
      setIsLoading(true);
      setError("");
      const response = await authApi.getGitHubRepositories(1, 50);

      if (response.success && response.data.repositories) {
        setRepositories(response.data.repositories);
      } else {
        setError("Failed to fetch repositories");
      }
    } catch (err: any) {
      console.error("Error fetching repositories:", err);
      setError(err.message || "Failed to fetch repositories");
    } finally {
      setIsLoading(false);
    }
  };

  const handleConnectGitHub = async () => {
    try {
      const response = await authApi.getGitHubAuthUrl();
      if (response.success && response.data.authUrl) {
        // Redirect to GitHub OAuth
        window.location.href = response.data.authUrl;
      } else {
        setError("Failed to get GitHub auth URL");
      }
    } catch (err: any) {
      console.error("Error getting GitHub auth URL:", err);
      setError(err.message || "Failed to connect to GitHub");
    }
  };

  const handleSelectRepo = (repo: any) => {
    setSelectedRepo(String(repo.id));
    setSelectedRepoData(repo);
  };

  const handleDeploy = () => {
    if (selectedRepo && selectedRepoData) {
      // Navigate to project configuration page with full repo data encoded
      const repoData = {
        id: selectedRepoData.id,
        name: selectedRepoData.name,
        clone_url: selectedRepoData.clone_url,
        full_name: selectedRepoData.full_name,
      };
      navigate(
        `/dashboard/project-config?repo=${encodeURIComponent(
          JSON.stringify(repoData)
        )}`
      );
    }
  };

  const handleDisconnect = async () => {
    try {
      await authApi.disconnectGitHub();
      setIsConnected(false);
      setRepositories([]);
      setSelectedRepo(null);
      setGitHubUsername("");
    } catch (err: any) {
      console.error("Error disconnecting GitHub:", err);
      setError("Failed to disconnect GitHub");
    }
  };

  return (
    <div className="space-y-6 w-full">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-normal text-black dark:text-white mb-2">
          Create a new project
        </h1>
        <p className="text-gray-600 dark:text-gray-400 text-sm">
          Connect your GitHub account and select a repository to deploy
        </p>
      </div>

      {!isConnected ? (
        // GitHub Connection Step
        <div className="bg-white dark:bg-gray-950 border border-gray-200 dark:border-gray-800 rounded-lg p-8">
          <div className="max-w-md mx-auto text-center">
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-blue-600 rounded-lg flex items-center justify-center">
                <Github size={32} className="text-white" />
              </div>
            </div>

            <h2 className="text-xl font-normal text-black dark:text-white mb-3">
              Connect GitHub
            </h2>
            <p className="text-gray-600 dark:text-gray-400 text-sm mb-6">
              Authorize Gilgal to access your GitHub repositories. This allows
              us to monitor for code changes and automatically deploy your
              projects.
            </p>

            <button
              onClick={handleConnectGitHub}
              className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-black dark:bg-white text-white dark:text-black font-medium rounded-lg hover:opacity-90 transition-opacity cursor-pointer"
            >
              <Github size={20} />
              Connect with GitHub
            </button>

            {error && (
              <p className="text-xs text-red-600 dark:text-red-400 mt-4">
                {error}
              </p>
            )}

            <p className="text-xs text-gray-500 dark:text-gray-500 mt-4">
              We'll redirect you to GitHub to authorize the connection securely.
            </p>
          </div>
        </div>
      ) : (
        // Repository Selection Step
        <div>
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-lg font-normal text-black dark:text-white">
                Select a repository
              </h2>
              <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">
                Choose which repository you want to deploy ({gitHubUsername})
              </p>
            </div>
            <button
              onClick={handleDisconnect}
              className="text-red-600 dark:text-red-400 hover:underline text-sm font-medium cursor-pointer"
            >
              Disconnect
            </button>
          </div>

          {error && (
            <div className="p-3 mb-4 bg-red-50 dark:bg-red-950 border border-red-200 dark:border-red-800 rounded-lg">
              <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
            </div>
          )}

          {isLoading ? (
            <div className="flex items-center justify-center py-8">
              <Loader2 size={24} className="animate-spin text-purple-600" />
              <p className="text-gray-600 dark:text-gray-400 ml-3">
                Fetching repositories...
              </p>
            </div>
          ) : repositories.length === 0 ? (
            <div className="p-6 bg-gray-50 dark:bg-gray-900 rounded-lg text-center">
              <p className="text-gray-600 dark:text-gray-400">
                No repositories found
              </p>
            </div>
          ) : (
            /* Repository Grid */
            <div className="space-y-3">
              {repositories.map((repo) => (
                <div
                  key={repo.id}
                  onClick={() => handleSelectRepo(repo)}
                  className={`p-4 rounded-lg border cursor-pointer transition-all ${
                    selectedRepo === String(repo.id)
                      ? "border-purple-600 bg-purple-600/10 dark:bg-purple-600/20"
                      : "border-gray-200 dark:border-gray-800 hover:border-gray-300 dark:hover:border-gray-700 bg-white dark:bg-gray-950"
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="text-sm font-medium text-black dark:text-white">
                          {repo.name}
                        </h3>
                        {repo.language && (
                          <span className="px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded text-xs text-gray-600 dark:text-gray-400">
                            {repo.language}
                          </span>
                        )}
                      </div>
                      {repo.description && (
                        <p className="text-xs text-gray-600 dark:text-gray-400 mb-2">
                          {repo.description}
                        </p>
                      )}
                      <p className="text-xs text-gray-500 dark:text-gray-500">
                        ⭐ {repo.stargazers_count} stars • 🔀 {repo.forks_count}{" "}
                        forks
                      </p>
                    </div>
                    {selectedRepo === String(repo.id) && (
                      <CheckCircle2
                        size={20}
                        className="text-purple-600 flex-shrink-0 ml-4"
                      />
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Deploy Button */}
          <div className="mt-8">
            <button
              onClick={handleDeploy}
              disabled={!selectedRepo}
              className={`w-full flex items-center justify-center gap-2 px-6 py-3 font-medium rounded-lg transition-colors cursor-pointer ${
                selectedRepo
                  ? "bg-purple-600 text-white hover:bg-purple-700"
                  : "bg-gray-300 dark:bg-gray-700 text-gray-500 dark:text-gray-400 cursor-not-allowed"
              }`}
            >
              Continue to Configuration
              <ArrowRight size={18} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
