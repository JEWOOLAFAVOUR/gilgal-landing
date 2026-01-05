import { Github, ArrowRight } from "lucide-react";

export function CTA() {
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 bg-white dark:bg-black transition-colors">
      <div className="max-w-4xl mx-auto relative overflow-hidden">
        {/* CTA Card */}
        <div className="rounded-2xl border border-gray-300 dark:border-gray-800 bg-gray-50 dark:bg-gray-950 p-8 sm:p-12 text-center transition-colors">
          <h2 className="text-4xl sm:text-5xl md:text-5xl font-bold text-black dark:text-white mb-6 transition-colors">
            Ready to Deploy?
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-400 mb-10 max-w-2xl mx-auto leading-relaxed transition-colors">
            Join developers who are deploying faster. Free forever, with
            optional premium features coming soon.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-10">
            <a
              href="https://api.gilgal.tech/api/auth/github/login"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-black dark:bg-white text-white dark:text-black font-semibold rounded-lg hover:bg-gray-900 dark:hover:bg-gray-100 transition-colors duration-200"
            >
              <Github size={20} />
              <span>Deploy Your First App</span>
            </a>
            <a
              href="https://github.com/JEWOOLAFAVOUR/gilgal"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gray-100 dark:bg-gray-900 text-black dark:text-white font-semibold rounded-lg hover:bg-gray-200 dark:hover:bg-gray-800 border border-gray-300 dark:border-gray-700 transition-colors duration-200"
            >
              <span>View on GitHub</span>
              <ArrowRight size={18} />
            </a>
          </div>

          {/* Trust Badges */}
          <div className="flex flex-wrap justify-center gap-6 sm:gap-8 text-sm text-gray-600 dark:text-gray-400 border-t border-gray-300 dark:border-gray-800 pt-8 transition-colors">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-600 dark:bg-green-500"></div>
              <span>99.9% Uptime</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-600 dark:bg-green-500"></div>
              <span>Enterprise Security</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-600 dark:bg-green-500"></div>
              <span>24/7 Support</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
