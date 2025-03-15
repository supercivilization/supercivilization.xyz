export function TechStackSection() {
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Technology Stack</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white dark:bg-zinc-800 p-6 rounded-lg border border-zinc-200 dark:border-zinc-700 shadow-sm">
          <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-black dark:text-white"
            >
              <path d="M12 2L2 7l10 5 10-5-10-5z"></path>
              <path d="M2 17l10 5 10-5"></path>
              <path d="M2 12l10 5 10-5"></path>
            </svg>
            Next.js
          </h3>
          <p className="text-zinc-600 dark:text-zinc-400 mb-2">
            The React framework for production, providing server-side rendering, static site generation, and API routes.
          </p>
          <div className="text-sm text-zinc-500 dark:text-zinc-500">Version: 14.x (App Router)</div>
        </div>

        <div className="bg-white dark:bg-zinc-800 p-6 rounded-lg border border-zinc-200 dark:border-zinc-700 shadow-sm">
          <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-sky-500"
            >
              <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
              <line x1="3" y1="6" x2="21" y2="6"></line>
              <path d="M16 10a4 4 0 0 1-8 0"></path>
            </svg>
            Tailwind CSS
          </h3>
          <p className="text-zinc-600 dark:text-zinc-400 mb-2">
            A utility-first CSS framework for rapidly building custom designs without leaving your HTML.
          </p>
          <div className="text-sm text-zinc-500 dark:text-zinc-500">Color Palette: Zinc (monochromatic)</div>
        </div>

        <div className="bg-white dark:bg-zinc-800 p-6 rounded-lg border border-zinc-200 dark:border-zinc-700 shadow-sm">
          <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-green-500"
            >
              <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
              <line x1="3" y1="9" x2="21" y2="9"></line>
              <line x1="9" y1="21" x2="9" y2="9"></line>
            </svg>
            Supabase
          </h3>
          <p className="text-zinc-600 dark:text-zinc-400 mb-2">
            An open-source Firebase alternative providing authentication, database, and storage services.
          </p>
          <div className="text-sm text-zinc-500 dark:text-zinc-500">Native Vercel integration</div>
        </div>

        <div className="bg-white dark:bg-zinc-800 p-6 rounded-lg border border-zinc-200 dark:border-zinc-700 shadow-sm">
          <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-zinc-700 dark:text-zinc-300"
            >
              <path d="M4 9h8"></path>
              <path d="M4 15h16"></path>
              <path d="M12 4v16"></path>
            </svg>
            shadcn/ui
          </h3>
          <p className="text-zinc-600 dark:text-zinc-400 mb-2">
            Beautifully designed components built with Radix UI and Tailwind CSS.
          </p>
          <div className="text-sm text-zinc-500 dark:text-zinc-500">Accessible, customizable components</div>
        </div>

        <div className="bg-white dark:bg-zinc-800 p-6 rounded-lg border border-zinc-200 dark:border-zinc-700 shadow-sm">
          <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-black dark:text-white"
            >
              <path d="M12 2L2 7l10 5 10-5-10-5z"></path>
              <path d="M2 17l10 5 10-5"></path>
              <path d="M2 12l10 5 10-5"></path>
            </svg>
            Vercel
          </h3>
          <p className="text-zinc-600 dark:text-zinc-400 mb-2">
            The platform for frontend developers, providing the speed and reliability innovators need to create at the
            moment of inspiration.
          </p>
          <div className="text-sm text-zinc-500 dark:text-zinc-500">Seamless deployment and scaling</div>
        </div>

        <div className="bg-white dark:bg-zinc-800 p-6 rounded-lg border border-zinc-200 dark:border-zinc-700 shadow-sm">
          <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-zinc-700 dark:text-zinc-300"
            >
              <path d="M4 7V4h16v3"></path>
              <path d="M9 20h6"></path>
              <path d="M12 4v16"></path>
            </svg>
            Inter Font
          </h3>
          <p className="text-zinc-600 dark:text-zinc-400 mb-2">
            A carefully crafted typeface designed for computer screens, providing excellent readability.
          </p>
          <div className="text-sm text-zinc-500 dark:text-zinc-500">Used exclusively throughout the application</div>
        </div>
      </div>

      <div className="bg-zinc-100 dark:bg-zinc-800 p-6 rounded-lg mt-4">
        <h3 className="text-lg font-semibold mb-3">Why This Stack?</h3>
        <p className="text-zinc-600 dark:text-zinc-400">
          We've deliberately chosen technologies that are designed to work together natively, avoiding unnecessary
          dependencies and ensuring optimal performance and maintainability. This stack provides:
        </p>
        <ul className="list-disc pl-5 mt-3 space-y-1 text-zinc-600 dark:text-zinc-400">
          <li>Seamless integration between all components</li>
          <li>Excellent developer experience</li>
          <li>Optimal performance and scalability</li>
          <li>Strong typing and code safety with TypeScript</li>
          <li>Consistent design language with Zinc color palette and Inter font</li>
          <li>Accessibility built-in at every level</li>
        </ul>
      </div>
    </div>
  )
}

