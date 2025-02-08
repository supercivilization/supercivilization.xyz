import Hero from "./components/Hero"
import Features from "./components/Features"
import CTA from "./components/CTA"
import styles from "./page.module.css"

export default function Home() {
  return (
    <main className={styles.main}>
      <Hero />
      <Features />
      <CTA />
    </main>
  )
}

