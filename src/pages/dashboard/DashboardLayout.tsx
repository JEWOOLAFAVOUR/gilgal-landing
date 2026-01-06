import { useState } from "react";
import {
  Menu,
  X,
  LayoutDashboard,
  FileStack,
  Settings,
  LogOut,
  Plus,
  Search,
  Bell,
  User,
  Moon,
  Sun,
} from "lucide-react";
import { useTheme } from "../../context/ThemeContext";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isDark, setIsDark } = useTheme();
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const menuItems = [
    { icon: LayoutDashboard, label: "Dashboard", href: "/dashboard" },
    { icon: FileStack, label: "Projects", href: "/dashboard/projects" },
    { icon: Settings, label: "Settings", href: "/dashboard/settings" },
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-black transition-colors duration-200">
      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-0 h-screen bg-white dark:bg-gray-950 border-r border-gray-200 dark:border-gray-800 transition-all duration-300 z-40 ${
          sidebarOpen ? "w-64" : "w-20"
        }`}
      >
        {/* Logo */}
        <div className="flex items-center justify-between h-16 px-4 border-b border-gray-200 dark:border-gray-800">
          <a href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-black dark:bg-white rounded-md flex items-center justify-center font-bold text-white dark:text-black text-sm">
              G
            </div>
            {sidebarOpen && (
              <span className="font-bold text-black dark:text-white">
                GILGAL
              </span>
            )}
          </a>
        </div>

        {/* Menu Items */}
        <nav className="p-4 space-y-2">
          {menuItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-900 transition-colors"
              title={!sidebarOpen ? item.label : ""}
            >
              <item.icon size={20} />
              {sidebarOpen && <span>{item.label}</span>}
            </a>
          ))}
        </nav>

        {/* Spacer */}
        <div className="flex-1"></div>

        {/* Bottom Menu */}
        <div className="p-4 space-y-2 border-t border-gray-200 dark:border-gray-800">
          <button
            onClick={() => setIsDark(!isDark)}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-900 transition-colors"
            title={!sidebarOpen ? "Toggle theme" : ""}
          >
            {isDark ? <Sun size={20} /> : <Moon size={20} />}
            {sidebarOpen && <span>{isDark ? "Light" : "Dark"}</span>}
          </button>

          <a
            href="#"
            className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-red-50 dark:hover:bg-red-950/20 hover:text-red-600 dark:hover:text-red-400 transition-colors"
            title={!sidebarOpen ? "Logout" : ""}
          >
            <LogOut size={20} />
            {sidebarOpen && <span>Logout</span>}
          </a>
        </div>
      </aside>

      {/* Main Content */}
      <main
        className={`transition-all duration-300 ${
          sidebarOpen ? "ml-64" : "ml-20"
        }`}
      >
        {/* Top Bar */}
        <div className="h-16 bg-white dark:bg-gray-950 border-b border-gray-200 dark:border-gray-800 flex items-center justify-between px-6">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-900 rounded-lg transition-colors"
          >
            {sidebarOpen ? <Menu size={24} /> : <Menu size={24} />}
          </button>

          <div className="flex items-center gap-4">
            {/* Search Bar */}
            <div className="hidden md:flex items-center gap-2 bg-gray-100 dark:bg-gray-900 px-4 py-2 rounded-lg">
              <Search size={18} className="text-gray-500 dark:text-gray-400" />
              <input
                type="text"
                placeholder="Search projects..."
                className="bg-transparent outline-none text-sm text-black dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
              />
            </div>

            {/* Notifications */}
            <button className="relative p-2 hover:bg-gray-100 dark:hover:bg-gray-900 rounded-lg transition-colors">
              <Bell size={20} className="text-gray-700 dark:text-gray-300" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-blue-500 rounded-full"></span>
            </button>

            {/* User Profile */}
            <button className="flex items-center gap-2 px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-900 rounded-lg transition-colors">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
                <User size={18} className="text-white" />
              </div>
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300 hidden md:inline">
                Profile
              </span>
            </button>
          </div>
        </div>

        {/* Page Content */}
        <div className="p-6">{children}</div>
      </main>
    </div>
  );
}
