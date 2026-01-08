import { Github, Twitter, Linkedin } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-gray-300 dark:border-gray-800 py-12 px-4 sm:px-6 lg:px-8 bg-white dark:bg-black transition-colors">
      <div className="max-w-6xl mx-auto">
        {/* Footer Content */}
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-black dark:bg-white rounded-lg flex items-center justify-center transition-colors">
                <span className="text-white dark:text-black font-bold text-sm">
                  G
                </span>
              </div>
              <span className="text-black dark:text-white font-bold transition-colors">
                Gilgal
              </span>
            </div>
            <p className="text-gray-600 dark:text-gray-400 text-sm transition-colors">
              Open-source PaaS for deploying web applications
            </p>
          </div>

          {/* Product */}
          <div>
            <h4 className="text-black dark:text-white font-semibold mb-4 transition-colors">
              Product
            </h4>
            <ul className="space-y-2">
              <li>
                <a
                  href="#features"
                  className="text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition text-sm"
                >
                  Features
                </a>
              </li>
              <li>
                <a
                  href="https://docs.gilgal.tech"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition text-sm"
                >
                  Documentation
                </a>
              </li>
              <li>
                <a
                  href="#faq"
                  className="text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition text-sm"
                >
                  FAQ
                </a>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="text-black dark:text-white font-semibold mb-4 transition-colors">
              Resources
            </h4>
            <ul className="space-y-2">
              <li>
                <a
                  href="#blog"
                  className="text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition text-sm"
                >
                  Blog
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/yourusername/gilgal"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition text-sm"
                >
                  GitHub
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-300 dark:border-gray-800 pt-8 transition-colors">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-600 dark:text-gray-400 text-sm transition-colors">
              © 2026 Gilgal. All rights reserved.
            </p>

            {/* Social Links */}
            <div className="flex gap-4">
              <a
                href="https://github.com/JEWOOLAFAVOUR/gilgal"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition duration-200"
                aria-label="GitHub"
              >
                <Github size={20} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
