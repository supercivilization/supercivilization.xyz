import Link from "next/link"

export default function CTA() {
  return (
    <section className="py-20 bg-gradient-to-r from-purple-900 to-indigo-900">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-4xl font-bold mb-8">Ready to shape the future?</h2>
        <p className="text-xl mb-12 max-w-2xl mx-auto">
          Join Supercivilization today and be part of the movement towards a brighter tomorrow.
        </p>
        <Link
          href="#"
          className="bg-white text-black px-8 py-3 rounded-full font-semibold hover:bg-gray-200 transition-colors"
        >
          Join Now
        </Link>
      </div>
    </section>
  )
}

