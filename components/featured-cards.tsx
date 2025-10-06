"use client"

import { Button } from "@/components/ui/button"

const cards = [
  {
    title: "Superachiever",
    subtitle: "Create Your Success Puzzle",
    cta: "Unlock Superachiever Playbook",
    bgClass: "from-stone-100 via-stone-50 to-stone-200 dark:from-stone-800 dark:via-stone-900 dark:to-stone-800",
    hoverClass:
      "hover:from-stone-50 hover:via-stone-100 hover:to-stone-200 dark:hover:from-stone-700 dark:hover:via-stone-800 dark:hover:to-stone-700",
    titleClass: "text-stone-800 dark:text-stone-100",
    subtitleClass: "text-stone-600 dark:text-stone-300",
    buttonClass:
      "bg-stone-800 hover:bg-stone-900 text-stone-50 dark:bg-stone-100 dark:hover:bg-stone-50 dark:text-stone-900",
  },
  {
    title: "Superachievers",
    subtitle: "Co-Create Our Superpuzzle",
    cta: "Unlock Supercivilization Quests",
    bgClass: "from-slate-100 via-slate-50 to-slate-200 dark:from-slate-800 dark:via-slate-900 dark:to-slate-800",
    hoverClass:
      "hover:from-slate-50 hover:via-slate-100 hover:to-slate-200 dark:hover:from-slate-700 dark:hover:via-slate-800 dark:hover:to-slate-700",
    titleClass: "text-slate-800 dark:text-slate-100",
    subtitleClass: "text-slate-600 dark:text-slate-300",
    buttonClass:
      "bg-slate-800 hover:bg-slate-900 text-slate-50 dark:bg-slate-100 dark:hover:bg-slate-50 dark:text-slate-900",
  },
]

export default function FeaturedCards() {
  return (
    <section
      id="featured-cards"
      className="py-20 sm:py-24 md:py-28 px-4 md:px-8 bg-gradient-to-b from-zinc-50 to-zinc-100 dark:from-zinc-950 dark:to-zinc-900"
    >
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-10">
        {cards.map((card) => (
          <div
            key={card.title}
            className={`rounded-lg overflow-hidden transition-all duration-300 transform hover:scale-105 hover:z-10`}
          >
            <div
              onClick={() => {
                const url = card.title === "Superachievers" ? "https://www.superachievers.xyz/" : "https://www.superachiever.xyz/"
                window.open(url, "_blank")
              }}
              className={`p-8 sm:p-10 space-y-6 sm:space-y-8 relative z-10 bg-gradient-to-br ${card.bgClass} ${card.hoverClass} transition-all duration-300 flex flex-col items-center text-center cursor-pointer`}
            >
              <h2
                className={`text-3xl sm:text-4xl md:text-5xl font-bold leading-tight tracking-tight ${card.titleClass}`}
              >
                {card.title}
              </h2>
              <p className={`text-xl sm:text-2xl md:text-3xl leading-relaxed ${card.subtitleClass}`}>{card.subtitle}</p>
              <Button
                size="lg"
                className={`${card.buttonClass} transition-all duration-300 transform hover:scale-105 font-semibold px-6 sm:px-8 py-3 text-base sm:text-lg rounded-md mt-4 sm:mt-6 mx-auto`}
                onClick={(e) => {
                  e.stopPropagation()
                  const url = card.title === "Superachievers" ? "https://www.superachievers.xyz/" : "https://www.superachiever.xyz/"
                  window.open(url, "_blank")
                }}
              >
                {card.cta}
              </Button>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

