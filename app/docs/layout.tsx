import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Documentation | Obfuscated TailwindCSS",
  description: "Complete documentation for Obfuscated TailwindCSS",
};

export default function DocsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <a href="/" className="flex items-center gap-2">
              <svg
                className="fill-black w-6 h-6"
                width="97"
                height="108"
                viewBox="0 0 97 108"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M35.5 35.5C16.5667 35.5 4.73333 44.9444 0 63.8333C7.1 54.3889 15.3833 50.8472 24.85 53.2083C30.2513 54.5568 34.1116 58.4657 38.3847 62.7918C45.3453 69.8411 53.4025 78 71 78C89.9333 78 101.767 68.5556 106.5 49.6667C99.4 59.1111 91.1167 62.6528 81.65 60.2917C76.2487 58.9458 72.3884 55.0343 68.1153 50.7082C61.1547 43.6589 53.0975 35.5 35.5 35.5Z"
                  fill="#38BDF8"
                />
              </svg>
              <span className="text-xl font-bold tracking-tight text-slate-900">
                Obfuscated TailwindCSS
              </span>
            </a>
            <nav className="flex gap-6">
              <a
                href="/docs/getting-started"
                className="text-gray-600 hover:text-gray-900 font-medium"
              >
                Getting Started
              </a>
              <a
                href="/docs/token-setup"
                className="text-gray-600 hover:text-gray-900 font-medium"
              >
                Token Setup
              </a>
              <a
                href="/"
                className="text-blue-600 hover:text-blue-700 font-medium"
              >
                Back to Home
              </a>
            </nav>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid lg:grid-cols-4 gap-8">
          <aside className="lg:col-span-1">
            <nav className="sticky top-8 space-y-2">
              <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">
                Documentation
              </h3>
              <a
                href="/docs/getting-started"
                className="block px-3 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-md"
              >
                Getting Started
              </a>
              <a
                href="/docs/setup-script"
                className="block px-3 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-md"
              >
                Setup Script
              </a>
              <a
                href="/docs/skip-classes"
                className="block px-3 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-md"
              >
                Skip Classes
              </a>
            </nav>
          </aside>

          <div className="lg:col-span-3">{children}</div>
        </div>
      </main>
    </div>
  );
}
