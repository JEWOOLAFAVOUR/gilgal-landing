import {
  CheckCircle2,
  Plus,
  Search,
  MoreHorizontal,
  FolderPlus,
  UserPlus,
} from "lucide-react";
import { useState, useMemo, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { projectsApi } from "../../services/api";

export default function ProjectsPage() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [showNewMenu, setShowNewMenu] = useState(false);
  const [projects, setProjects] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const menuRef = useRef<HTMLDivElement>(null);

  // Mock services for fallback if API doesn't return data
  const mockServices = [
    {
      name: "StudyPadi",
      status: "Deployed",
      runtime: "Node",
      region: "Oregon",
      updated: "1mo",
    },
    {
      name: "atom-backend",
      status: "Deployed",
      runtime: "Node",
      region: "Oregon",
      updated: "5mo",
    },
    {
      name: "Chapel",
      status: "Deployed",
      runtime: "Node",
      region: "Oregon",
      updated: "7mo",
    },
    {
      name: "medxlearn",
      status: "Deployed",
      runtime: "Node",
      region: "Oregon",
      updated: "9mo",
    },
    {
      name: "api-gateway",
      status: "Deployed",
      runtime: "Node",
      region: "Oregon",
      updated: "2mo",
    },
    {
      name: "dashboard-ui",
      status: "Deployed",
      runtime: "React",
      region: "Oregon",
      updated: "3mo",
    },
    {
      name: "db-service",
      status: "Deployed",
      runtime: "Python",
      region: "Oregon",
      updated: "4mo",
    },
    {
      name: "auth-service",
      status: "Deployed",
      runtime: "Node",
      region: "Oregon",
      updated: "1w",
    },
    {
      name: "cache-layer",
      status: "Deployed",
      runtime: "Node",
      region: "Oregon",
      updated: "2w",
    },
    {
      name: "worker-queue",
      status: "Deployed",
      runtime: "Node",
      region: "Oregon",
      updated: "3w",
    },
    {
      name: "notification-hub",
      status: "Deployed",
      runtime: "Node",
      region: "Oregon",
      updated: "1d",
    },
    {
      name: "analytics-engine",
      status: "Deployed",
      runtime: "Python",
      region: "Oregon",
      updated: "5d",
    },
    {
      name: "payment-processor",
      status: "Deployed",
      runtime: "Node",
      region: "Oregon",
      updated: "6d",
    },
  ];

  // Helper function to convert ISO date to relative time
  const getTimeAgo = (dateString: string): string => {
    const date = new Date(dateString);
    const now = new Date();
    const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);

    if (seconds < 60) return "now";
    if (seconds < 3600) return `${Math.floor(seconds / 60)}m`;
    if (seconds < 86400) return `${Math.floor(seconds / 3600)}h`;
    if (seconds < 2592000) return `${Math.floor(seconds / 86400)}d`;
    if (seconds < 31536000) return `${Math.floor(seconds / 2592000)}mo`;
    return `${Math.floor(seconds / 31536000)}y`;
  };

  // Fetch projects on component mount
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setIsLoading(true);
        setError("");
        const response = await projectsApi.getProjects();

        if (response.success && response.data && response.data.items) {
          // Transform API response to match table format
          const transformedProjects = response.data.items.map(
            (project: any) => ({
              id: project.id,
              name: project.name,
              status: project.status === "active" ? "Deployed" : "Inactive",
              runtime: project.framework || "Unknown",
              region: "Oregon", // Default region since API doesn't provide it
              updated: getTimeAgo(project.updated_at),
              repository_url: project.repository_url,
              description: project.description,
            })
          );
          setProjects(transformedProjects);
        } else {
          // Fallback to mock data if API returns no projects
          setProjects(mockServices);
        }
      } catch (err: any) {
        console.error("Error fetching projects:", err);
        setError(err.message || "Failed to fetch projects");
        // Use mock data on error
        setProjects(mockServices);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProjects();
  }, []);

  // Close menu when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setShowNewMenu(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Filter services based on tab and search
  const filteredServices = useMemo(() => {
    let filtered = projects.length > 0 ? projects : mockServices;

    if (activeTab === "active") {
      filtered = filtered.filter((s) => s.status === "Deployed");
    } else if (activeTab === "suspended") {
      filtered = filtered.filter((s) => s.status !== "Deployed");
    }

    if (searchQuery) {
      filtered = filtered.filter((s) =>
        s.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    return filtered;
  }, [activeTab, searchQuery, projects]);

  return (
    <div className="space-y-6 w-full">
      {/* Overview Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-normal text-black dark:text-white">
          Overview
        </h1>
        <div className="relative" ref={menuRef}>
          <button
            onClick={() => setShowNewMenu(!showNewMenu)}
            className="text-white border border-dashed border-gray-600 px-4 py-2 rounded-lg font-medium hover:bg-gray-900 transition-colors cursor-pointer text-sm flex items-center gap-2"
          >
            <Plus size={18} />
            New
          </button>

          {/* Dropdown Menu */}
          {showNewMenu && (
            <div className="absolute right-0 mt-2 w-48 bg-gray-900 border border-gray-800 rounded-lg shadow-lg overflow-hidden z-50">
              <button
                onClick={() => {
                  setShowNewMenu(false);
                  navigate("/dashboard/create-project");
                }}
                className="w-full flex items-center gap-3 px-4 py-3 text-gray-300 hover:bg-gray-800 hover:text-white transition-colors text-sm"
              >
                <FolderPlus size={18} />
                Create a project
              </button>
              <button
                onClick={() => {
                  setShowNewMenu(false);
                  // Add logic for add team member
                }}
                className="w-full flex items-center gap-3 px-4 py-3 text-gray-300 hover:bg-gray-800 hover:text-white transition-colors text-sm border-t border-gray-800"
              >
                <UserPlus size={18} />
                Add team member
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Ungrouped Services Section */}
      <div>
        <h2 className="text-lg font-normal text-black dark:text-white mb-4">
          Ungrouped Services
        </h2>

        {/* Tabs */}
        <div className="flex items-center gap-4 mb-4">
          <button
            onClick={() => setActiveTab("active")}
            className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors border cursor-pointer ${
              activeTab === "active"
                ? "border-purple-600 bg-purple-600 text-white"
                : "border-dashed border-gray-600 text-gray-300 hover:text-white"
            }`}
          >
            Active (
            {
              (projects.length > 0 ? projects : mockServices).filter(
                (s) => s.status === "Deployed"
              ).length
            }
            )
          </button>
          <button
            onClick={() => setActiveTab("suspended")}
            className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors border cursor-pointer ${
              activeTab === "suspended"
                ? "border-purple-600 bg-purple-600 text-white"
                : "border-dashed border-gray-600 text-gray-300 hover:text-white"
            }`}
          >
            Suspended (0)
          </button>
          <button
            onClick={() => setActiveTab("all")}
            className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors border cursor-pointer ${
              activeTab === "all"
                ? "border-purple-600 bg-purple-600 text-white"
                : "border-dashed border-gray-600 text-gray-300 hover:text-white"
            }`}
          >
            All ({(projects.length > 0 ? projects : mockServices).length})
          </button>
        </div>

        {/* Search Bar */}
        <div className="relative mb-6">
          <Search
            size={18}
            className="absolute left-4 top-3 text-gray-400 dark:text-gray-500"
          />
          <input
            type="text"
            placeholder="Search services"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-white dark:bg-gray-950 border border-gray-200 dark:border-gray-800 rounded-lg text-black dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-600"
          />
        </div>
      </div>

      {/* Services Table */}
      <div className="bg-white dark:bg-gray-950 border border-gray-200 dark:border-gray-800 rounded-lg overflow-hidden">
        {isLoading ? (
          <div className="px-6 py-8 text-center">
            <p className="text-gray-600 dark:text-gray-400">
              Loading projects...
            </p>
          </div>
        ) : error ? (
          <div className="px-6 py-8 text-center">
            <p className="text-red-600 dark:text-red-400 text-sm">{error}</p>
          </div>
        ) : (
          <>
            {/* Table Header */}
            <div className="grid grid-cols-6 gap-4 px-6 py-4 border-b border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900/50">
              <div className="text-sm font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wide">
                Service Name
              </div>
              <div className="text-sm font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wide">
                Status
              </div>
              <div className="text-sm font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wide">
                Runtime
              </div>
              <div className="text-sm font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wide">
                Region
              </div>
              <div className="text-sm font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wide">
                Updated
              </div>
              <div className="text-sm font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wide text-right">
                Actions
              </div>
            </div>

            {/* Table Body */}
            {filteredServices.length > 0 ? (
              filteredServices.map((service, idx) => (
                <div
                  key={service.name}
                  className={`grid grid-cols-6 gap-4 px-6 py-4 hover:bg-gray-50 dark:hover:bg-gray-900/50 transition-colors ${
                    idx !== filteredServices.length - 1
                      ? "border-b border-gray-200 dark:border-gray-800"
                      : ""
                  }`}
                >
                  {/* Service Name */}
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-md flex items-center justify-center flex-shrink-0">
                      <span className="text-white font-bold text-sm">
                        {service.name.charAt(0).toUpperCase()}
                      </span>
                    </div>
                    <span className="text-sm font-medium text-black dark:text-white cursor-pointer hover:text-purple-600 dark:hover:text-purple-400">
                      {service.name}
                    </span>
                  </div>

                  {/* Status */}
                  <div className="flex items-center gap-2">
                    <CheckCircle2 size={16} className="text-green-500" />
                    <span className="text-sm text-green-600 dark:text-green-400 font-medium">
                      {service.status}
                    </span>
                  </div>

                  {/* Runtime */}
                  <div className="flex items-center">
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      {service.runtime}
                    </span>
                  </div>

                  {/* Region */}
                  <div className="flex items-center">
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      {service.region}
                    </span>
                  </div>

                  {/* Updated */}
                  <div className="flex items-center">
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      {service.updated}
                    </span>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center justify-end">
                    <button className="p-2 hover:bg-gray-200 dark:hover:bg-gray-800 rounded-lg transition-colors text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200">
                      <MoreHorizontal size={18} />
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="px-6 py-8 text-center">
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  No services found matching your search.
                </p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
