import Link from "next/link"
import styles from "./Hero.module.css"

export default function Hero() {
  return (
    <section className={styles.hero}>
      <div className={styles.content}>
        <h1 className={styles.title}>
          <span className={styles.gradientText}>Supercivilization</span>
        </h1>
        <p className={styles.subtitle}>One worldwide drive to Avolve from Degens into Regens.</p>
        <div className={styles.buttonGroup}>
          <Link href="#" className={styles.primaryButton}>
            Get Started
          </Link>
          <Link href="#" className={styles.secondaryButton}>
            Learn More
          </Link>
        </div>
      </div>
      <div className={styles.pattern}></div>
    </section>
  )
}

