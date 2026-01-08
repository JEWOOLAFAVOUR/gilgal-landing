import { ArrowLeft } from "lucide-react";

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-black text-black dark:text-white transition-colors">
      {/* Header */}
      <div className="border-b border-gray-200 dark:border-gray-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <a
            href="/"
            className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white mb-4"
          >
            <ArrowLeft size={20} />
            Back to home
          </a>
          <h1 className="text-4xl font-bold">Privacy Policy</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Last updated: January 8, 2026
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="prose dark:prose-invert max-w-none space-y-8">
          <section>
            <h2 className="text-2xl font-bold mb-4">1. Introduction</h2>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              GILGAL ("we", "us", "our" or "Company") operates the GILGAL
              website. This page informs you of our policies regarding the
              collection, use, and disclosure of personal data when you use our
              service and the choices you have associated with that data.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">
              2. Information Collection and Use
            </h2>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
              We collect several different types of information for various
              purposes to provide and improve our service to you.
            </p>
            <h3 className="text-xl font-semibold mb-3">
              Types of Data Collected:
            </h3>
            <ul className="list-disc list-inside text-gray-600 dark:text-gray-400 space-y-2">
              <li>
                <strong>Personal Data:</strong> Email address, first name, last
                name, username, password
              </li>
              <li>
                <strong>Usage Data:</strong> Browser type, IP address, pages
                visited, time and date of visits
              </li>
              <li>
                <strong>Technical Data:</strong> Device type, operating system,
                mobile network information
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">3. Use of Data</h2>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              GILGAL uses the collected data for various purposes:
            </p>
            <ul className="list-disc list-inside text-gray-600 dark:text-gray-400 space-y-2 mt-4">
              <li>To provide and maintain our service</li>
              <li>To notify you about changes to our service</li>
              <li>
                To allow you to participate in interactive features of our
                service
              </li>
              <li>
                To gather analysis or valuable information to improve our
                service
              </li>
              <li>To monitor the usage of our service</li>
              <li>To detect, prevent and address technical issues</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">4. Security of Data</h2>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              The security of your data is important to us but remember that no
              method of transmission over the Internet or method of electronic
              storage is 100% secure. While we strive to use commercially
              acceptable means to protect your Personal Data, we cannot
              guarantee its absolute security.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">
              5. Changes to This Privacy Policy
            </h2>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              We may update our Privacy Policy from time to time. We will notify
              you of any changes by posting the new Privacy Policy on this page
              and updating the "effective date" at the top of this Privacy
              Policy.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">6. Contact Us</h2>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              If you have any questions about this Privacy Policy, please
              contact us at:
            </p>
            <ul className="list-disc list-inside text-gray-600 dark:text-gray-400 space-y-2 mt-4">
              <li>Email: privacy@gilgal.tech</li>
              <li>Website: https://gilgal.tech</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">7. Your Rights</h2>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              You have the right to request access to, correct, or delete your
              personal data. You also have the right to data portability. If you
              wish to exercise any of these rights, please contact us.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">8. Third-Party Services</h2>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              Our service may contain links to third-party websites that are not
              operated by us. We have no control over, and assume no
              responsibility for, the content, privacy policies, or practices of
              any third-party websites.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
