import { ArrowRight, Github, Zap } from "lucide-react";

export function Hero() {
  return (
    <section className="pt-24 pb-20 px-4 sm:px-6 lg:px-8 bg-white dark:bg-black transition-colors duration-200">
      <div className="max-w-6xl mx-auto">
        {/* Badge - Vercel Alternative */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800 mb-8 transition-colors duration-200">
          <Zap size={14} className="text-blue-600 dark:text-blue-400" />
          <span className="text-sm font-semibold text-blue-600 dark:text-blue-400">
            The open-source Vercel alternative
          </span>
          <ArrowRight size={14} className="text-blue-600 dark:text-blue-400" />
        </div>

        {/* Main Headline - Catchy & Action-oriented */}
        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-black dark:text-white mb-6 leading-tight transition-colors duration-200">
          Deploy Your App
          <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-800 dark:from-blue-400 dark:to-blue-300">
            in Seconds
          </span>
        </h1>

        {/* Subheading */}
        <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-400 max-w-3xl mb-12 leading-relaxed transition-colors duration-200">
          Push to GitHub. Deploy instantly. No DevOps, no configuration, no
          complexity.
          <span className="font-semibold text-black dark:text-white">
            {" "}
            Gilgal handles everything, scaling, SSL, monitoring so you can focus
            on building.
          </span>
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 mb-16">
          <a
            href="https://api.gilgal.tech/api/auth/github/login"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-black dark:bg-white text-white dark:text-black font-semibold rounded-lg hover:bg-gray-900 dark:hover:bg-gray-100 transition-colors duration-200"
          >
            <Github size={18} />
            Try It Free
            <ArrowRight size={18} />
          </a>
          <a
            href="#features"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 border border-gray-300 dark:border-gray-700 text-black dark:text-white font-semibold rounded-lg hover:bg-gray-50 dark:hover:bg-gray-950 transition-colors duration-200"
          >
            See How It Works
            <ArrowRight size={18} />
          </a>
        </div>

        {/* Stats with borders - Better Auth style */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-0 pt-12 border-t border-gray-300 dark:border-gray-700">
          <div className="py-8 px-4 sm:px-8 sm:border-r border-gray-300 dark:border-gray-700 transition-colors duration-200">
            <p className="text-3xl sm:text-4xl font-bold text-black dark:text-white">
              &lt;30s
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
              Deploy Time
            </p>
          </div>
          <div className="py-8 px-4 sm:px-8 sm:border-r border-gray-300 dark:border-gray-700 transition-colors duration-200">
            <p className="text-3xl sm:text-4xl font-bold text-black dark:text-white">
              100%
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
              Free & Open Source
            </p>
          </div>
          <div className="py-8 px-4 sm:px-8 transition-colors duration-200">
            <p className="text-3xl sm:text-4xl font-bold text-black dark:text-white">
              ∞
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
              Deploy Unlimited Apps
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
