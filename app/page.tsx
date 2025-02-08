import Hero from "./components/Hero"
import Features from "./components/Features"
import CTA from "./components/CTA"

export default function Home() {
  return (
    <main className="flex flex-col min-h-screen bg-black text-white">
      <Hero />
      <Features />
      <CTA />
    </main>
  )
}

