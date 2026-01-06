import { ArrowRight, Code, Zap, GitBranch, Calendar } from "lucide-react";

export default function DashboardHome() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-black dark:text-white mb-2">
          Welcome back, Developer
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Manage your projects and deployments in one place
        </p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          {
            label: "Active Projects",
            value: "5",
            icon: Code,
            color: "from-blue-500 to-blue-600",
          },
          {
            label: "Deployments",
            value: "24",
            icon: Zap,
            color: "from-green-500 to-green-600",
          },
          {
            label: "Repositories",
            value: "12",
            icon: GitBranch,
            color: "from-purple-500 to-purple-600",
          },
          {
            label: "Last Deployed",
            value: "2h ago",
            icon: Calendar,
            color: "from-orange-500 to-orange-600",
          },
        ].map((stat) => (
          <div
            key={stat.label}
            className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-6 hover:shadow-lg dark:hover:shadow-lg dark:hover:shadow-gray-800/20 transition-shadow"
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                  {stat.label}
                </p>
                <p className="text-3xl font-bold text-black dark:text-white">
                  {stat.value}
                </p>
              </div>
              <div className={`bg-gradient-to-br ${stat.color} p-3 rounded-lg`}>
                <stat.icon size={20} className="text-white" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Projects */}
      <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg overflow-hidden">
        <div className="p-6 border-b border-gray-200 dark:border-gray-800 flex items-center justify-between">
          <h2 className="text-xl font-bold text-black dark:text-white">
            Recent Projects
          </h2>
          <button className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 text-sm font-medium flex items-center gap-1">
            View All <ArrowRight size={16} />
          </button>
        </div>

        <div className="divide-y divide-gray-200 dark:divide-gray-800">
          {[
            {
              name: "glow_note",
              desc: "Note-taking app with AI features",
              status: "Active",
              statusColor:
                "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400",
            },
            {
              name: "task-manager",
              desc: "Project management tool for teams",
              status: "Active",
              statusColor:
                "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400",
            },
            {
              name: "analytics-dashboard",
              desc: "Real-time analytics visualization",
              status: "Building",
              statusColor:
                "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400",
            },
            {
              name: "api-gateway",
              desc: "Unified API management system",
              status: "Paused",
              statusColor:
                "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-400",
            },
          ].map((project) => (
            <a
              key={project.name}
              href="#"
              className="p-4 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors flex items-center justify-between group"
            >
              <div className="flex-1">
                <h3 className="font-semibold text-black dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  {project.name}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  {project.desc}
                </p>
              </div>
              <div className="flex items-center gap-3">
                <span
                  className={`px-3 py-1 rounded-full text-xs font-medium ${project.statusColor}`}
                >
                  {project.status}
                </span>
                <ArrowRight
                  size={16}
                  className="text-gray-400 dark:text-gray-500 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors"
                />
              </div>
            </a>
          ))}
        </div>
      </div>

      {/* Deployment Activity */}
      <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg overflow-hidden">
        <div className="p-6 border-b border-gray-200 dark:border-gray-800">
          <h2 className="text-xl font-bold text-black dark:text-white">
            Recent Deployments
          </h2>
        </div>

        <div className="divide-y divide-gray-200 dark:divide-gray-800 max-h-64 overflow-y-auto">
          {[
            {
              project: "glow_note",
              version: "v1.2.5",
              status: "Success",
              time: "2 hours ago",
            },
            {
              project: "task-manager",
              version: "v2.0.0",
              status: "Success",
              time: "1 day ago",
            },
            {
              project: "glow_note",
              version: "v1.2.4",
              status: "Failed",
              time: "2 days ago",
            },
            {
              project: "api-gateway",
              version: "v0.8.1",
              status: "Success",
              time: "3 days ago",
            },
          ].map((deploy, idx) => (
            <div
              key={idx}
              className="p-4 flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
            >
              <div className="flex-1">
                <h3 className="font-medium text-black dark:text-white">
                  {deploy.project}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {deploy.version} · {deploy.time}
                </p>
              </div>
              <span
                className={`px-3 py-1 rounded-full text-xs font-medium ${
                  deploy.status === "Success"
                    ? "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400"
                    : "bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400"
                }`}
              >
                {deploy.status}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
