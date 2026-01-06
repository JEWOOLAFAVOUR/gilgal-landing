import { CheckCircle2, Plus, Search, MoreHorizontal } from "lucide-react";
import { useState, useMemo } from "react";

export default function ProjectsPage() {
  const [activeTab, setActiveTab] = useState("active");
  const [searchQuery, setSearchQuery] = useState("");

  const services = [
    { name: "StudyPadi", status: "Deployed", runtime: "Node", region: "Oregon", updated: "1mo" },
    { name: "atom-backend", status: "Deployed", runtime: "Node", region: "Oregon", updated: "5mo" },
    { name: "Chapel", status: "Deployed", runtime: "Node", region: "Oregon", updated: "7mo" },
    { name: "medxlearn", status: "Deployed", runtime: "Node", region: "Oregon", updated: "9mo" },
    { name: "api-gateway", status: "Deployed", runtime: "Node", region: "Oregon", updated: "2mo" },
    { name: "dashboard-ui", status: "Deployed", runtime: "React", region: "Oregon", updated: "3mo" },
    { name: "db-service", status: "Deployed", runtime: "Python", region: "Oregon", updated: "4mo" },
    { name: "auth-service", status: "Deployed", runtime: "Node", region: "Oregon", updated: "1w" },
    { name: "cache-layer", status: "Deployed", runtime: "Node", region: "Oregon", updated: "2w" },
    { name: "worker-queue", status: "Deployed", runtime: "Node", region: "Oregon", updated: "3w" },
    { name: "notification-hub", status: "Deployed", runtime: "Node", region: "Oregon", updated: "1d" },
    { name: "analytics-engine", status: "Deployed", runtime: "Python", region: "Oregon", updated: "5d" },
    { name: "payment-processor", status: "Deployed", runtime: "Node", region: "Oregon", updated: "6d" },
  ];

  // Filter services based on tab and search
  const filteredServices = useMemo(() => {
    let filtered = services;
    
    if (activeTab === "active") {
      filtered = services.filter(s => s.status === "Deployed");
    } else if (activeTab === "suspended") {
      filtered = services.filter(s => s.status !== "Deployed");
    }
    
    if (searchQuery) {
      filtered = filtered.filter(s =>
        s.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    return filtered;
  }, [activeTab, searchQuery]);

  return (
    <div className="space-y-6 w-full">
      {/* Overview Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-normal text-black dark:text-white">
          Overview
        </h1>
        <button className="text-white border border-dashed border-gray-600 px-4 py-2 rounded-lg font-medium hover:bg-gray-900 transition-colors cursor-pointer text-sm flex items-center gap-2">
          <Plus size={18} />
          New
        </button>
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
            Active ({services.filter(s => s.status === "Deployed").length})
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
            All ({services.length})
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
      </div>
    </div>
  );
}
