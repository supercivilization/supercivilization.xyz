import styles from "./Features.module.css"

const features = [
  {
    title: "Unlock Superachiever Playbook",
    description: "Further Create Your Success Puzzle Faster as a Superachiever.",
  },
  {
    title: "Unlock Supercivilization Quests",
    description: "Further Co-Create Our Superpuzzle Faster with Superachievers.",
  },
]

export default function Features() {
  return (
    <section className={styles.features}>
      <div className={styles.container}>
        <h2 className={styles.sectionTitle}>Supercivilization Pathways</h2>
        <p className={styles.sectionSubtitle}>
          Let's get the important jobs done that relieve the Degen pains of the Anticivilization and create the Regen gains of the Supercivilization.
        </p>
        <div className={styles.featureGrid}>
          {features.map((feature, index) => (
            <div key={index} className={styles.featureCard}>
              <div className={styles.cardContent}>
                <h3 className={styles.featureTitle}>{feature.title}</h3>
                <p className={styles.featureDescription}>{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

