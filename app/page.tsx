import Hero from "@/components/hero"
import FeaturedCards from "@/components/featured-cards"

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-zinc-50 via-zinc-100 to-zinc-50 dark:from-zinc-950 dark:via-zinc-900 dark:to-zinc-950">
      <Hero />
      <FeaturedCards />
    </main>
  )
}

