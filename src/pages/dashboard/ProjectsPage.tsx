import { Plus, Star, GitBranch, Users, Clock } from "lucide-react";

export default function ProjectsPage() {
  const projects = [
    {
      name: "glow_note",
      desc: "AI-powered note-taking application",
      stars: 342,
      contributors: 8,
      lastUpdate: "2 hours ago",
      status: "Active",
    },
    {
      name: "task-manager",
      desc: "Collaborative project management tool",
      stars: 218,
      contributors: 5,
      lastUpdate: "1 day ago",
      status: "Active",
    },
    {
      name: "analytics-dashboard",
      desc: "Real-time data visualization platform",
      stars: 156,
      contributors: 3,
      lastUpdate: "3 days ago",
      status: "Building",
    },
    {
      name: "api-gateway",
      desc: "Unified API management and routing",
      stars: 89,
      contributors: 2,
      lastUpdate: "1 week ago",
      status: "Paused",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-black dark:text-white mb-2">
            Projects
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Manage all your Gilgal projects and their deployments
          </p>
        </div>
        <button className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium flex items-center gap-2 transition-colors">
          <Plus size={20} /> New Project
        </button>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {projects.map((project) => (
          <a
            key={project.name}
            href="#"
            className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-6 hover:shadow-lg dark:hover:shadow-lg dark:hover:shadow-gray-800/20 transition-all group"
          >
            {/* Header */}
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-lg font-bold text-black dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  {project.name}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  {project.desc}
                </p>
              </div>
              <span
                className={`px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap ${
                  project.status === "Active"
                    ? "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400"
                    : project.status === "Building"
                    ? "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400"
                    : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-400"
                }`}
              >
                {project.status}
              </span>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 pt-4 border-t border-gray-200 dark:border-gray-800">
              <div className="flex items-center gap-2">
                <Star size={16} className="text-yellow-500" />
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  {project.stars}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Users size={16} className="text-blue-500" />
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  {project.contributors}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Clock size={16} className="text-gray-500" />
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  {project.lastUpdate}
                </span>
              </div>
            </div>

            {/* Footer */}
            <div className="mt-4 flex items-center justify-between">
              <div className="flex items-center gap-1">
                <GitBranch
                  size={16}
                  className="text-gray-500 dark:text-gray-400"
                />
                <span className="text-xs text-gray-600 dark:text-gray-400">
                  main branch
                </span>
              </div>
              <button className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 text-sm font-medium">
                View Details →
              </button>
            </div>
          </a>
        ))}
      </div>

      {/* CTA for creating new project */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 dark:from-blue-600 dark:to-blue-700 rounded-lg p-8 text-white text-center">
        <h3 className="text-2xl font-bold mb-2">
          Ready to deploy something new?
        </h3>
        <p className="mb-4 text-blue-100">
          Connect your repository and we'll handle the deployments automatically
        </p>
        <button className="bg-white hover:bg-gray-100 text-blue-600 font-medium px-6 py-2 rounded-lg transition-colors">
          Connect GitHub Repository
        </button>
      </div>
    </div>
  );
}
