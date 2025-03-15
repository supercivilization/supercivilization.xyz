import Link from "next/link"

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <h1 className="text-4xl font-bold">404</h1>
      <p className="text-lg">Page not found</p>
      <Link href="/" className="mt-4 text-blue-500 hover:underline">
        Return home
      </Link>
    </div>
  )
}

