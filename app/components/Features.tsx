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
    <section className="py-20 bg-gray-900">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12">Supercivilization Pathways</h2>
        <div className="grid md:grid-cols-2 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="bg-gray-800 p-6 rounded-lg">
              <h3 className="text-2xl font-semibold mb-4">{feature.title}</h3>
              <p className="text-gray-400">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

