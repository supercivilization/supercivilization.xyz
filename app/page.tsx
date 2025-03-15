import Hero from "@/components/hero"
import FeaturedCards from "@/components/featured-cards"

export default function Home() {
  return (
    <div className="relative flex min-h-screen flex-col">
      <main className="flex-1">
        <div className="relative">
          <Hero />
          <FeaturedCards />
        </div>
      </main>
    </div>
  )
}

