import { ArrowLeft } from "lucide-react";

export default function TermsOfServicePage() {
  return (
    <div className="min-h-screen bg-white dark:bg-black text-black dark:text-white transition-colors">
      {/* Header */}
      <div className="border-b border-gray-200 dark:border-gray-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <a href="/" className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white mb-4">
            <ArrowLeft size={20} />
            Back to home
          </a>
          <h1 className="text-4xl font-bold">Terms of Service</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">Last updated: January 8, 2026</p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="prose dark:prose-invert max-w-none space-y-8">
          <section>
            <h2 className="text-2xl font-bold mb-4">1. Agreement to Terms</h2>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              By accessing and using GILGAL, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">2. Use License</h2>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              Permission is granted to temporarily download one copy of the materials (information or software) on GILGAL for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:
            </p>
            <ul className="list-disc list-inside text-gray-600 dark:text-gray-400 space-y-2 mt-4">
              <li>Modifying or copying the materials</li>
              <li>Using the materials for any commercial purpose or for any public display</li>
              <li>Attempting to decompile or reverse engineer any software contained on GILGAL</li>
              <li>Transferring the materials to another person or "mirroring" the materials on any other server</li>
              <li>Removing any copyright or other proprietary notations from the materials</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">3. Disclaimer</h2>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              The materials on GILGAL are provided on an 'as is' basis. GILGAL makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">4. Limitations</h2>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              In no event shall GILGAL or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on GILGAL.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">5. Accuracy of Materials</h2>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              The materials appearing on GILGAL could include technical, typographical, or photographic errors. GILGAL does not warrant that any of the materials on GILGAL are accurate, complete, or current. GILGAL may make changes to the materials contained on GILGAL at any time without notice.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">6. Links</h2>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              GILGAL has not reviewed all of the sites linked to its website and is not responsible for the contents of any such linked site. The inclusion of any link does not imply endorsement by GILGAL of the site. Use of any such linked website is at the user's own risk.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">7. Modifications</h2>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              GILGAL may revise these terms of service for its website at any time without notice. By using this website, you are agreeing to be bound by the then current version of these terms of service.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">8. Governing Law</h2>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              These terms and conditions are governed by and construed in accordance with the laws of the jurisdiction in which GILGAL operates, and you irrevocably submit to the exclusive jurisdiction of the courts located in that location.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
