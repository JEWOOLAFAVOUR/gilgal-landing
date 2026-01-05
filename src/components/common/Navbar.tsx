import { Github, Menu, X, Moon, Sun } from "lucide-react";
import { useState } from "react";

interface NavbarProps {
  isDark: boolean;
  setIsDark: (isDark: boolean) => void;
}

export function Navbar({ isDark, setIsDark }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 w-full z-50 bg-white dark:bg-black border-b border-gray-200 dark:border-gray-800 transition-colors duration-200">
      <div className="w-full px-4 sm:px-6 lg:px-8">
        {/* Main Nav */}
        <div className="flex items-center justify-between h-16">
          {/* Left side - Logo */}
          <a href="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 bg-black dark:bg-white rounded-md flex items-center justify-center font-bold text-white dark:text-black text-sm">
              G
            </div>
            <span className="font-bold text-black dark:text-white text-lg hidden sm:inline-block">
              GILGAL
            </span>
          </a>

          {/* Center - Desktop Menu */}
          <div className="hidden lg:flex items-center gap-12">
            <a
              href="#features"
              className="text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors text-base font-medium border-b-2 border-transparent hover:border-gray-400 dark:hover:border-gray-600 pb-1"
            >
              Features
            </a>
            <a
              href="#blog"
              className="text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors text-base font-medium border-b-2 border-transparent hover:border-gray-400 dark:hover:border-gray-600 pb-1"
            >
              Blog
            </a>
            <a
              href="#docs"
              className="text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors text-base font-medium border-b-2 border-transparent hover:border-gray-400 dark:hover:border-gray-600 pb-1"
            >
              Docs
            </a>
            <a
              href="#faq"
              className="text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors text-base font-medium border-b-2 border-transparent hover:border-gray-400 dark:hover:border-gray-600 pb-1"
            >
              FAQ
            </a>
          </div>

          {/* Right side - Theme Toggle + Sign Up + Login + GitHub */}
          <div className="flex items-center gap-3 sm:gap-4">
            {/* Theme Toggle */}
            <button
              onClick={() => setIsDark(!isDark)}
              className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-900 transition-colors text-gray-600 dark:text-gray-400"
              aria-label="Toggle theme"
            >
              {isDark ? (
                <Sun size={20} className="text-gray-600 dark:text-gray-400" />
              ) : (
                <Moon size={20} className="text-gray-600 dark:text-gray-400" />
              )}
            </button>

            {/* Sign Up Button - Hidden on mobile */}
            <a
              href="https://api.gilgal.tech/api/auth/github/login"
              className="hidden sm:flex items-center gap-2 px-4 py-2 text-base font-medium text-black dark:text-white border border-gray-300 dark:border-gray-700 rounded-md hover:bg-gray-50 dark:hover:bg-gray-950 transition-colors"
            >
              <span className="hidden md:inline">Sign Up</span>
            </a>

            {/* Login Button - Hidden on mobile */}
            <a
              href="https://api.gilgal.tech/api/auth/github/login"
              className="hidden sm:flex items-center gap-2 px-4 py-2 text-base font-medium text-white bg-black dark:bg-white dark:text-black rounded-md hover:bg-gray-900 dark:hover:bg-gray-100 transition-colors"
            >
              <Github size={16} />
              <span className="hidden md:inline">Login</span>
            </a>

            {/* GitHub Project Link */}
            <a
              href="https://github.com/yourusername/gilgal"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-900 transition-colors text-gray-600 dark:text-gray-400"
              aria-label="GitHub project"
            >
              <Github size={20} />
            </a>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden p-2 text-black dark:text-white"
              aria-label="Toggle menu"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="lg:hidden border-t border-gray-200 dark:border-gray-800 py-4 space-y-4 px-4">
            <a
              href="#features"
              className="block px-4 py-2 text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors text-sm font-medium"
            >
              Features
            </a>
            <a
              href="#blog"
              className="block px-4 py-2 text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors text-sm font-medium"
            >
              Blog
            </a>
            <a
              href="#docs"
              className="block px-4 py-2 text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors text-sm font-medium"
            >
              Docs
            </a>
            <a
              href="#faq"
              className="block px-4 py-2 text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors text-sm font-medium"
            >
              FAQ
            </a>
            <div className="flex gap-3 mt-4">
              <a
                href="https://api.gilgal.tech/api/auth/github/login"
                className="flex-1 flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium text-black dark:text-white border border-gray-300 dark:border-gray-700 rounded-md hover:bg-gray-50 dark:hover:bg-gray-950 transition-colors"
              >
                Sign Up
              </a>
              <a
                href="https://api.gilgal.tech/api/auth/github/login"
                className="flex-1 flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium text-white bg-black dark:bg-white dark:text-black rounded-md hover:bg-gray-900 dark:hover:bg-gray-100 transition-colors"
              >
                <Github size={16} />
                Login
              </a>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
