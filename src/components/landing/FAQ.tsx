import { ChevronDown } from "lucide-react";
import { useState } from "react";

interface FAQItem {
  question: string;
  answer: string;
}

const faqs: FAQItem[] = [
  {
    question: "What is GILGAL?",
    answer:
      "GILGAL is a modern deployment platform that simplifies the process of deploying and managing your web applications. It provides an intuitive interface for managing deployments, monitoring performance, and scaling your applications.",
  },
  {
    question: "How do I get started with GILGAL?",
    answer:
      "Getting started is easy! Sign up for an account, connect your git repository, configure your deployment settings, and deploy your application with a single click. Our documentation provides detailed guides for every step.",
  },
  {
    question: "What frameworks does GILGAL support?",
    answer:
      "GILGAL supports all major frameworks including React, Vue, Angular, Next.js, Nuxt, Express, Django, Flask, and many more. We continuously add support for new frameworks and technologies.",
  },
  {
    question: "How much does GILGAL cost?",
    answer:
      "GILGAL offers flexible pricing plans for individuals, teams, and enterprises. We provide a free tier with generous limits, and paid plans start at affordable rates. Check our pricing page for detailed information.",
  },
  {
    question: "Can I use GILGAL for production applications?",
    answer:
      "Absolutely! GILGAL is designed for production use. We provide uptime SLAs, automatic backups, SSL certificates, and 24/7 monitoring to ensure your applications run reliably.",
  },
  {
    question: "How do I scale my application on GILGAL?",
    answer:
      "Scaling is simple with GILGAL. You can adjust resources, enable auto-scaling, and manage load balancing from our dashboard. Our team is also available to help with complex scaling scenarios.",
  },
];

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section
      id="faq"
      className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-900"
    >
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-black dark:text-white mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-lg">
            Find answers to common questions about GILGAL
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden transition-all duration-200"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200"
              >
                <span className="text-left font-semibold text-black dark:text-white">
                  {faq.question}
                </span>
                <ChevronDown
                  size={20}
                  className={`text-gray-600 dark:text-gray-400 flex-shrink-0 ml-4 transition-transform duration-200 ${
                    openIndex === index ? "rotate-180" : ""
                  }`}
                />
              </button>

              {openIndex === index && (
                <div className="px-6 py-4 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800">
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            Can't find what you're looking for?
          </p>
          <a
            href="https://docs.gilgal.tech"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-6 py-3 bg-black dark:bg-white text-white dark:text-black rounded-lg font-semibold hover:bg-gray-900 dark:hover:bg-gray-100 transition-colors"
          >
            Visit our Documentation
          </a>
        </div>
      </div>
    </section>
  );
}
