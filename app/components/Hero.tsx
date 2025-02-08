import Link from "next/link"

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center p-8 overflow-hidden">
      <div className="relative z-10 max-w-5xl mx-auto text-center">
        <h1 className="text-6xl md:text-8xl font-bold mb-6">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-500 to-red-500">
            Supercivilization
          </span>
        </h1>
        <p className="text-xl md:text-2xl mb-8 text-gray-300">One worldwide drive to Avolve from Degens into Regens.</p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link
            href="#"
            className="bg-white text-black px-8 py-3 rounded-full font-semibold hover:bg-gray-200 transition-colors"
          >
            Get Started
          </Link>
          <Link
            href="#"
            className="border border-white text-white px-8 py-3 rounded-full font-semibold hover:bg-white hover:text-black transition-colors"
          >
            Learn More
          </Link>
        </div>
      </div>
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900 via-black to-black opacity-75"></div>
      </div>
    </section>
  )
}

