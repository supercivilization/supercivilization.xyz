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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
      <Card className="w-full max-w-sm bg-white shadow-lg rounded-lg">
        <CardContent className="p-6 pt-6">
          <h2 className="text-xl font-semibold mb-4 sm:text-2xl">Consent Agreement</h2>
          <p className="text-gray-700 sm:text-base text-sm">
            By joining Supercivilization with your MyGenius.ID, you agree to The Prime Law:
          </p>
          <ul className="list-disc pl-5 my-4 text-gray-700 space-y-2 sm:text-base text-sm">
            <li>No starting fights, scams, or pushing others.</li>
            <li>You can defend yourself.</li>
            <li>These rules don't change.</li>
          </ul>
        </CardContent>
        <CardFooter className="flex justify-center p-6 pt-0">
          <Button onClick={onAgree} className="w-full sm:w-auto">
            Agree
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}

