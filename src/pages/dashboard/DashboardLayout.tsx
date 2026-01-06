import { useState } from "react";
import {
  FileStack,
  Settings,
  LogOut,
  Plus,
  Search,
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
  const [sidebarOpen] = useState(true);

  const menuItems = [
    // { icon: LayoutDashboard, label: "Dashboard", href: "/dashboard" },
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
        className={`min-h-screen flex flex-col transition-all duration-300 ${
          sidebarOpen ? "ml-64" : "ml-20"
        }`}
      >
        {/* Top Bar */}
        <div className="h-16 bg-black border-b border-gray-800 flex items-center justify-between px-6 sticky top-0 z-30">
          {/* Left Section - Title */}
          <div className="flex items-center gap-2">
            <FileStack size={20} className="text-white" />
            <span className="text-white font-medium text-lg">Projects</span>
          </div>

          {/* Right Section - Actions */}
          <div className="flex items-center gap-6">
            {/* Search Bar */}
            <div className="hidden md:flex items-center gap-2 bg-gray-900 px-4 py-2 rounded-lg border border-gray-800">
              <Search size={18} className="text-gray-500" />
              <input
                type="text"
                placeholder="Search"
                className="bg-transparent outline-none text-sm text-white placeholder-gray-500 w-32"
              />
              <span className="text-gray-600 text-xs ml-2">⌘ K</span>
            </div>

            {/* New Button */}
            <button className="flex items-center gap-2 px-3 py-2 text-white border border-dashed border-gray-600 rounded-lg hover:bg-gray-900 transition-colors text-sm font-medium cursor-pointer">
              <Plus size={18} />
              New
            </button>

            {/* Upgrade Button */}
            <button className="flex items-center gap-2 px-3 py-2 text-white border border-dashed border-gray-600 rounded-lg hover:bg-gray-900 transition-colors text-sm font-medium cursor-pointer">
              <span>⬆</span>
              Upgrade
            </button>

            {/* Help Icon */}
            <button className="p-2 text-gray-400 hover:text-white hover:bg-gray-900 rounded-lg transition-colors">
              <span className="text-lg">?</span>
            </button>

            {/* User Profile */}
            <button className="flex items-center justify-center w-8 h-8 bg-gradient-to-br from-green-400 to-blue-500 rounded-lg hover:opacity-80 transition-opacity">
              <span className="text-white font-bold text-sm">J</span>
            </button>
          </div>
        </div>

        {/* Page Content */}
        <div className="flex-1 overflow-y-auto p-6">{children}</div>
      </main>
    </div>
  );
}
