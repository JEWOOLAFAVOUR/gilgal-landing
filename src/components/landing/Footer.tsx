import { Github, Twitter, Linkedin } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-gray-300 dark:border-gray-800 py-12 px-4 sm:px-6 lg:px-8 bg-white dark:bg-black transition-colors">
      <div className="max-w-6xl mx-auto">
        {/* Footer Content */}
        <div className="grid md:grid-cols-4 gap-8 mb-8">
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
                  href="#pricing"
                  className="text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition text-sm"
                >
                  Pricing
                </a>
              </li>
              <li>
                <a
                  href="#docs"
                  className="text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition text-sm"
                >
                  Documentation
                </a>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-black dark:text-white font-semibold mb-4 transition-colors">
              Company
            </h4>
            <ul className="space-y-2">
              <li>
                <a
                  href="https://github.com"
                  className="text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition text-sm"
                >
                  About
                </a>
              </li>
              <li>
                <a
                  href="https://github.com"
                  className="text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition text-sm"
                >
                  Blog
                </a>
              </li>
              <li>
                <a
                  href="https://github.com"
                  className="text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition text-sm"
                >
                  Careers
                </a>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-black dark:text-white font-semibold mb-4 transition-colors">
              Legal
            </h4>
            <ul className="space-y-2">
              <li>
                <a
                  href="https://github.com"
                  className="text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition text-sm"
                >
                  Privacy
                </a>
              </li>
              <li>
                <a
                  href="https://github.com"
                  className="text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition text-sm"
                >
                  Terms
                </a>
              </li>
              <li>
                <a
                  href="https://github.com"
                  className="text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition text-sm"
                >
                  License
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
                href="https://github.com"
                className="text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition duration-200"
                aria-label="GitHub"
              >
                <Github size={20} />
              </a>
              <a
                href="https://twitter.com"
                className="text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition duration-200"
                aria-label="Twitter"
              >
                <Twitter size={20} />
              </a>
              <a
                href="https://linkedin.com"
                className="text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition duration-200"
                aria-label="LinkedIn"
              >
                <Linkedin size={20} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
