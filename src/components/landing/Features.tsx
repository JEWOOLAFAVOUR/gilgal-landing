import { Github, Zap, GitBranch, Shield, Gauge, Code2 } from "lucide-react";

const features = [
  {
    icon: Github,
    title: "GitHub OAuth",
    description:
      "Connect with one click. Secure authentication with GitHub OAuth.",
  },
  {
    icon: Zap,
    title: "Auto-Deploy on Push",
    description:
      "Push to GitHub, deploy automatically. Webhooks trigger builds instantly.",
  },
  {
    icon: GitBranch,
    title: "Framework Agnostic",
    description: "React, Next.js, Vue, Node.js, Python—deploy any framework.",
  },
  {
    icon: Shield,
    title: "HTTPS & SSL",
    description: "Free SSL certificates for every app. Secure by default.",
  },
  {
    icon: Gauge,
    title: "Auto Scaling",
    description:
      "Automatically scale based on demand. Your app grows with you.",
  },
  {
    icon: Code2,
    title: "Developer Friendly",
    description: "Powerful API, comprehensive docs, and CLI tools included.",
  },
];

export function Features() {
  return (
    <section
      id="features"
      className="py-24 px-4 sm:px-6 lg:px-8 bg-white dark:bg-black transition-colors duration-200"
    >
      <div className="max-w-6xl mx-auto">
        {/* Section Header - Aligned with hero */}
        <div className="mb-20">
          <h2 className="text-4xl sm:text-5xl font-bold text-black dark:text-white mb-6 transition-colors duration-200">
            Powerful Features
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl transition-colors duration-200">
            Everything you need to deploy and manage applications with ease.
          </p>
        </div>

        {/* Better Auth Inspired Grid with Lines */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-0 border border-gray-300 dark:border-gray-700 rounded-lg overflow-hidden transition-colors duration-200">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            const isLastRow =
              index >= features.length - (features.length % 3 || 3);
            const isLastCol = (index + 1) % 3 === 0;

            return (
              <div
                key={index}
                className={`p-8 sm:p-10 border-gray-300 dark:border-gray-700 transition-all duration-200 hover:bg-gray-50 dark:hover:bg-gray-950 ${
                  !isLastCol ? "border-r" : ""
                } ${!isLastRow ? "border-b" : ""}`}
              >
                <div className="w-12 h-12 rounded-lg bg-black dark:bg-white flex items-center justify-center mb-6">
                  <Icon size={24} className="text-white dark:text-black" />
                </div>
                <h3 className="text-lg font-bold text-black dark:text-white mb-3 transition-colors duration-200">
                  {feature.title}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed transition-colors duration-200">
                  {feature.description}
                </p>
                <a
                  href="#"
                  className="inline-block text-sm font-medium text-gray-900 dark:text-gray-100 hover:opacity-70 transition-opacity mt-4"
                >
                  Learn more →
                </a>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
