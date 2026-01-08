import {
  Plus,
  Search,
  MoreHorizontal,
  FolderPlus,
  UserPlus,
  ChevronLeft,
  ChevronRight,
  AlertCircle,
  Edit2,
  Trash2,
} from "lucide-react";
import { useState, useMemo, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { projectsApi } from "../../services/api";

// Skeleton Loader Component
const SkeletonRow = () => (
  <div className="grid grid-cols-6 gap-4 px-6 py-4 border-b border-gray-200 dark:border-gray-800 animate-pulse">
    <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-3/4"></div>
    <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-1/2"></div>
    <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-2/3"></div>
    <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-1/2"></div>
    <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-1/3"></div>
    <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-1/4"></div>
  </div>
);

export default function ProjectsPage() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [showNewMenu, setShowNewMenu] = useState(false);
  const [projects, setProjects] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [openActionMenu, setOpenActionMenu] = useState<string | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
  const [deleteInputValue, setDeleteInputValue] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const actionMenuRef = useRef<HTMLDivElement>(null);
  const itemsPerPage = 10;

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

  // Get status color
  const getStatusColor = (status: string) => {
    if (status === "success")
      return "text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/20";
    if (status === "deploying")
      return "text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20";
    return "text-gray-600 dark:text-gray-400 bg-gray-50 dark:bg-gray-900/20";
  };

  const getStatusIcon = (status: string) => {
    if (status === "success") return "🟢";
    if (status === "deploying") return "🔵";
    return "⚪";
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
              slug: project.slug,
              status: project.status, // Keep original status from API
              framework: project.framework,
              created_at: project.created_at,
              updated_at: project.updated_at,
              repository_url: project.repository_url,
              description: project.description,
            })
          );
          setProjects(transformedProjects);
        }
      } catch (err: any) {
        console.error("Error fetching projects:", err);
        setError(err.message || "Failed to fetch projects");
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
      if (
        actionMenuRef.current &&
        !actionMenuRef.current.contains(event.target as Node)
      ) {
        setOpenActionMenu(null);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Handle delete project
  const handleDeleteProject = async (projectId: string) => {
    try {
      setIsDeleting(true);
      await projectsApi.deleteProject(projectId);
      setProjects((prev) => prev.filter((p) => p.id !== projectId));
      setDeleteConfirm(null);
      setDeleteInputValue("");
      setOpenActionMenu(null);
    } catch (err: any) {
      console.error("Error deleting project:", err);
    } finally {
      setIsDeleting(false);
    }
  };

  // Close delete modal and reset
  const closeDeleteModal = () => {
    setDeleteConfirm(null);
    setDeleteInputValue("");
  };

  // Handle edit project
  const handleEditProject = (projectId: string) => {
    navigate(`/dashboard/projects/${projectId}/edit`);
  };

  // Filter services based on tab and search
  const filteredServices = useMemo(() => {
    let filtered = projects;

    // Filter by status/tab
    if (activeTab === "active") {
      filtered = filtered.filter((p) => p.status === "success");
    } else if (activeTab === "deploying") {
      filtered = filtered.filter((p) => p.status === "deploying");
    } else if (activeTab === "inactive") {
      filtered = filtered.filter((p) => p.status === "inactive");
    }
    // "all" shows everything

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter((p) =>
        p.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    return filtered;
  }, [activeTab, searchQuery, projects]);

  // Get current page items
  const paginatedServices = useMemo(() => {
    const startIdx = (currentPage - 1) * itemsPerPage;
    return filteredServices.slice(startIdx, startIdx + itemsPerPage);
  }, [filteredServices, currentPage]);

  // Calculate total pages for filtered results
  const totalFilteredPages = Math.ceil(filteredServices.length / itemsPerPage);

  // Reset to page 1 when filter changes
  useEffect(() => {
    setCurrentPage(1);
  }, [activeTab, searchQuery]);

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
                className="w-full flex items-center gap-3 px-4 py-3 text-gray-300 hover:bg-gray-800 hover:text-white transition-colors text-sm cursor-pointer"
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
        <div className="flex items-center gap-2 mb-6 overflow-x-auto pb-2">
          <button
            onClick={() => setActiveTab("all")}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all whitespace-nowrap cursor-pointer ${
              activeTab === "all"
                ? "bg-purple-600 text-white shadow-lg"
                : "border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:border-gray-400 dark:hover:border-gray-600"
            }`}
          >
            All ({projects.length})
          </button>
          <button
            onClick={() => setActiveTab("active")}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all whitespace-nowrap cursor-pointer ${
              activeTab === "active"
                ? "bg-green-600 text-white shadow-lg"
                : "border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:border-gray-400 dark:hover:border-gray-600"
            }`}
          >
            Active ({projects.filter((p) => p.status === "success").length})
          </button>
          <button
            onClick={() => setActiveTab("deploying")}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all whitespace-nowrap cursor-pointer ${
              activeTab === "deploying"
                ? "bg-blue-600 text-white shadow-lg"
                : "border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:border-gray-400 dark:hover:border-gray-600"
            }`}
          >
            Deploying ({projects.filter((p) => p.status === "deploying").length}
            )
          </button>
          <button
            onClick={() => setActiveTab("inactive")}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all whitespace-nowrap cursor-pointer ${
              activeTab === "inactive"
                ? "bg-gray-600 text-white shadow-lg"
                : "border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:border-gray-400 dark:hover:border-gray-600"
            }`}
          >
            Inactive ({projects.filter((p) => p.status === "inactive").length})
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
      <div className="bg-white dark:bg-gray-950 border border-gray-200 dark:border-gray-800 rounded-lg overflow-hidden shadow-sm">
        {isLoading ? (
          <div>
            {/* Header */}
            <div className="grid grid-cols-6 gap-4 px-6 py-4 border-b border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900/50">
              <div className="text-sm font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wide">
                Project Name
              </div>
              <div className="text-sm font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wide">
                Status
              </div>
              <div className="text-sm font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wide">
                Framework
              </div>
              <div className="text-sm font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wide">
                Created
              </div>
              <div className="text-sm font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wide">
                Updated
              </div>
              <div className="text-sm font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wide text-right">
                Actions
              </div>
            </div>
            {/* Skeleton rows */}
            {[...Array(5)].map((_, i) => (
              <SkeletonRow key={i} />
            ))}
          </div>
        ) : error ? (
          <div className="px-6 py-12 text-center">
            <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
            <p className="text-red-600 dark:text-red-400 text-sm font-medium">
              {error}
            </p>
            <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">
              Please make sure the backend is running on localhost:3000
            </p>
          </div>
        ) : (
          <>
            {/* Table Header */}
            <div className="grid grid-cols-6 gap-4 px-6 py-4 border-b border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900/50">
              <div className="text-sm font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wide">
                Project Name
              </div>
              <div className="text-sm font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wide">
                Status
              </div>
              <div className="text-sm font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wide">
                Framework
              </div>
              <div className="text-sm font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wide">
                Created
              </div>
              <div className="text-sm font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wide">
                Updated
              </div>
              <div className="text-sm font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wide text-right">
                Actions
              </div>
            </div>

            {/* Table Body */}
            {paginatedServices.length > 0 ? (
              paginatedServices.map((project, idx) => (
                <div
                  key={project.id}
                  className={`grid grid-cols-6 gap-4 px-6 py-4 items-center hover:bg-gray-50 dark:hover:bg-gray-900/50 transition-colors ${
                    idx !== paginatedServices.length - 1
                      ? "border-b border-gray-200 dark:border-gray-800"
                      : ""
                  }`}
                >
                  {/* Project Name */}
                  <div
                    className="flex items-center gap-3 min-w-0 cursor-pointer"
                    onClick={() =>
                      navigate(`/dashboard/projects/${project.id}`)
                    }
                  >
                    <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-md flex items-center justify-center flex-shrink-0">
                      <span className="text-white font-bold text-sm">
                        {project.name.charAt(0).toUpperCase()}
                      </span>
                    </div>
                    <div className="min-w-0">
                      <div className="text-sm font-medium text-black dark:text-white truncate hover:text-purple-600 dark:hover:text-purple-400 transition-colors">
                        {project.name}
                      </div>
                      <div className="text-xs text-gray-500 dark:text-gray-500 truncate">
                        {project.slug}
                      </div>
                    </div>
                  </div>

                  {/* Status */}
                  <div
                    className={`flex items-center gap-2 px-3 py-1 rounded-full w-fit text-xs font-medium cursor-pointer transition-opacity hover:opacity-80 ${getStatusColor(
                      project.status
                    )}`}
                  >
                    <span>{getStatusIcon(project.status)}</span>
                    <span className="capitalize">{project.status}</span>
                  </div>

                  {/* Framework */}
                  <div className="flex items-center">
                    <span className="text-sm text-gray-600 dark:text-gray-400 font-medium capitalize">
                      {project.framework}
                    </span>
                  </div>

                  {/* Created */}
                  <div
                    className="flex items-center"
                    title={new Date(project.created_at).toLocaleString()}
                  >
                    <span className="text-sm text-gray-600 dark:text-gray-400 cursor-help">
                      {getTimeAgo(project.created_at)}
                    </span>
                  </div>

                  {/* Updated */}
                  <div
                    className="flex items-center"
                    title={new Date(project.updated_at).toLocaleString()}
                  >
                    <span className="text-sm text-gray-600 dark:text-gray-400 cursor-help">
                      {getTimeAgo(project.updated_at)}
                    </span>
                  </div>

                  {/* Actions */}
                  <div
                    className="flex items-center justify-end relative"
                    ref={
                      openActionMenu === project.id ? actionMenuRef : undefined
                    }
                  >
                    <button
                      onClick={() =>
                        setOpenActionMenu(
                          openActionMenu === project.id ? null : project.id
                        )
                      }
                      className="p-2 hover:bg-gray-200 dark:hover:bg-gray-800 rounded-lg transition-colors text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 cursor-pointer"
                    >
                      <MoreHorizontal size={18} />
                    </button>

                    {/* Action Menu Dropdown */}
                    {openActionMenu === project.id && (
                      <div className="absolute right-0 top-full mt-1 w-40 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg shadow-lg overflow-hidden z-50">
                        <button
                          onClick={() => handleEditProject(project.id)}
                          className="cursor-pointer w-full flex items-center gap-2 px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                        >
                          <Edit2 size={16} />
                          Edit
                        </button>
                        <button
                          onClick={() => setDeleteConfirm(project.id)}
                          className="cursor-pointer w-full flex items-center gap-2 px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors border-t border-gray-200 dark:border-gray-800"
                        >
                          <Trash2 size={16} />
                          Delete
                        </button>
                      </div>
                    )}
                  </div>

                  {/* Delete Confirmation Modal */}
                  {deleteConfirm === project.id && (
                    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                      <div className="bg-white dark:bg-gray-900 rounded-lg p-6 max-w-sm w-full border border-gray-200 dark:border-gray-800 shadow-lg">
                        <h3 className="text-lg font-semibold text-black dark:text-white mb-2">
                          Delete Project?
                        </h3>
                        <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
                          This action cannot be undone. Type the project name to
                          confirm:
                        </p>
                        <p className="text-sm font-mono font-bold text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20 px-3 py-2 rounded mb-4 break-words">
                          {project.name}
                        </p>
                        <input
                          type="text"
                          placeholder="Type project name to confirm"
                          value={deleteInputValue}
                          onChange={(e) => setDeleteInputValue(e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-black dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-600 mb-6 text-sm"
                          autoFocus
                        />
                        <div className="flex gap-3 justify-end">
                          <button
                            onClick={() => closeDeleteModal()}
                            className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors cursor-pointer font-medium"
                          >
                            Cancel
                          </button>
                          <button
                            onClick={() => handleDeleteProject(project.id)}
                            disabled={
                              isDeleting || deleteInputValue !== project.name
                            }
                            className="px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors cursor-pointer font-medium"
                          >
                            {isDeleting ? "Deleting..." : "Delete"}
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))
            ) : (
              <div className="px-6 py-12 text-center">
                <AlertCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600 dark:text-gray-400 text-sm font-medium">
                  No projects found
                </p>
                <p className="text-gray-500 dark:text-gray-500 text-sm mt-1">
                  {searchQuery
                    ? "Try adjusting your search query"
                    : "Create a new project to get started"}
                </p>
              </div>
            )}

            {/* Pagination */}
            {totalFilteredPages > 1 && (
              <div className="px-6 py-4 border-t border-gray-200 dark:border-gray-800 flex items-center justify-between bg-gray-50 dark:bg-gray-900/50">
                <div className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Page{" "}
                  <span className="font-bold text-purple-600 dark:text-purple-400">
                    {currentPage}
                  </span>{" "}
                  of {totalFilteredPages} • Showing{" "}
                  <span className="font-bold text-purple-600 dark:text-purple-400">
                    {paginatedServices.length}
                  </span>{" "}
                  of {filteredServices.length} projects
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                    disabled={currentPage === 1}
                    className="p-2 hover:bg-gray-200 dark:hover:bg-gray-800 rounded-lg transition-colors text-gray-600 dark:text-gray-400 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer hover:text-gray-900 dark:hover:text-gray-200"
                    title="Previous page"
                  >
                    <ChevronLeft size={18} />
                  </button>
                  <button
                    onClick={() =>
                      setCurrentPage((p) => Math.min(totalFilteredPages, p + 1))
                    }
                    disabled={currentPage === totalFilteredPages}
                    className="p-2 hover:bg-gray-200 dark:hover:bg-gray-800 rounded-lg transition-colors text-gray-600 dark:text-gray-400 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer hover:text-gray-900 dark:hover:text-gray-200"
                    title="Next page"
                  >
                    <ChevronRight size={18} />
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
