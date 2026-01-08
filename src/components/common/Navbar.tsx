import { Menu, X, Github } from "lucide-react";
import { useState } from "react";
import { useTheme } from "../../context/ThemeContext";

export function Navbar() {
  const { isDark, setIsDark } = useTheme();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 w-full z-50 bg-black dark:bg-black border-b border-gray-900 dark:border-gray-800 transition-colors duration-200">
      <div className="w-full px-4 sm:px-6 lg:px-8">
        {/* Main Nav */}
        <div className="flex items-center justify-between h-16">
          {/* Left side - Logo */}
          <a href="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 bg-white rounded-md flex items-center justify-center font-bold text-black text-sm">
              G
            </div>
            <span className="font-bold text-white text-lg hidden sm:inline-block">
              GILGAL
            </span>
          </a>

          {/* Center - Desktop Menu */}
          <div className="hidden lg:flex items-center gap-8">
            <a
              href="#features"
              className="text-gray-300 hover:text-white transition-colors text-sm font-medium"
            >
              Features
            </a>
            <a
              href="#blog"
              className="text-gray-300 hover:text-white transition-colors text-sm font-medium"
            >
              Blog
            </a>
            <a
              href="https://docs.gilgal.tech"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-300 hover:text-white transition-colors text-sm font-medium"
            >
              Docs
            </a>
            <a
              href="#faq"
              className="text-gray-300 hover:text-white transition-colors text-sm font-medium"
            >
              FAQ
            </a>
          </div>

          {/* Right side - GitHub + Sign In + Create Account */}
          <div className="flex items-center gap-4">
            {/* GitHub Link */}
            <a
              href="https://github.com/yourusername/gilgal"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 text-gray-300 hover:text-white transition-colors"
              aria-label="GitHub repository"
            >
              <Github size={20} />
            </a>

            {/* Sign In Button */}
            <a
              href="/auth/login"
              className="text-gray-300 hover:text-white transition-colors text-sm font-medium"
            >
              Sign in
            </a>

            {/* Create Account Button */}
            <a
              href="/auth/signup"
              className="px-4 py-2 text-sm font-medium text-black bg-white rounded-md hover:bg-gray-100 transition-colors"
            >
              Create account
            </a>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden p-2 text-white"
              aria-label="Toggle menu"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="lg:hidden border-t border-gray-900 py-4 space-y-4 px-4">
            <a
              href="#features"
              className="block px-4 py-2 text-gray-300 hover:text-white transition-colors text-sm font-medium"
            >
              Features
            </a>
            <a
              href="#blog"
              className="block px-4 py-2 text-gray-300 hover:text-white transition-colors text-sm font-medium"
            >
              Blog
            </a>
            <a
              href="https://docs.gilgal.tech"
              target="_blank"
              rel="noopener noreferrer"
              className="block px-4 py-2 text-gray-300 hover:text-white transition-colors text-sm font-medium"
            >
              Docs
            </a>
            <a
              href="#faq"
              className="block px-4 py-2 text-gray-300 hover:text-white transition-colors text-sm font-medium"
            >
              FAQ
            </a>
            <div className="flex gap-3 mt-4">
              <a
                href="/auth/login"
                className="flex-1 flex items-center justify-center px-4 py-2 text-sm font-medium text-white border border-gray-700 rounded-md hover:bg-gray-950 transition-colors"
              >
                Sign in
              </a>
              <a
                href="/auth/signup"
                className="flex-1 flex items-center justify-center px-4 py-2 text-sm font-medium text-black bg-white rounded-md hover:bg-gray-100 transition-colors"
              >
                Create account
              </a>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
