import Link from "next/link"
import styles from "./CTA.module.css"

export default function CTA() {
  return (
    <section className={styles.cta}>
      <div className={styles.container}>
        <h2 className={styles.title}>Ready to shape the future?</h2>
        <p className={styles.description}>
          Join Supercivilization today and be part of the movement towards a brighter tomorrow.
        </p>
        <Link href="#" className={styles.button}>
          Join Now
        </Link>
      </div>
      <div className={styles.pattern}></div>
    </section>
  )
}

