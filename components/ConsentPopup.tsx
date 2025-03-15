"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"

interface ConsentPopupProps {
  isOpen?: boolean
  onAgree: () => void
}

export default function ConsentPopup({ isOpen = true, onAgree }: ConsentPopupProps) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <Card
        className="w-full max-w-sm bg-white/95 dark:bg-zinc-800/95 shadow-lg rounded-lg
              border border-zinc-200 dark:border-zinc-700
              transition-all duration-300 animate-fade-in-up"
      >
        <CardContent className="p-6 pt-6">
          <h2 className="text-xl font-semibold mb-4 sm:text-2xl text-zinc-800 dark:text-zinc-100">Consent Agreement</h2>
          <p className="text-zinc-700 dark:text-zinc-300 sm:text-base text-sm">
            By joining Supercivilization with your MyGenius.ID, you agree to The Prime Law:
          </p>
          <ul className="list-disc pl-5 my-4 text-zinc-700 dark:text-zinc-300 space-y-2 sm:text-base text-sm">
            <li>No starting fights, scams, or pushing others.</li>
            <li>You can defend yourself.</li>
            <li>These rules don't change.</li>
          </ul>
        </CardContent>
        <CardFooter className="flex justify-center p-6 pt-0">
          <Button
            onClick={onAgree}
            className="w-full sm:w-auto bg-zinc-800 hover:bg-zinc-900 dark:bg-zinc-700 dark:hover:bg-zinc-600
            text-white font-medium py-2 transition-all duration-300 shadow-md hover:shadow-lg
            hover:shadow-zinc-300/20 dark:hover:shadow-zinc-700/20
            focus:ring-2 focus:ring-zinc-500/50 dark:focus:ring-zinc-400/50 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-zinc-900"
          >
            Agree
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}

