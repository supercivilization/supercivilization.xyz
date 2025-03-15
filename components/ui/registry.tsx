'use client'

import * as React from 'react'

export function UIRegistry({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  return (
    <div className="contents" suppressHydrationWarning>
      {children}
    </div>
  )
} 