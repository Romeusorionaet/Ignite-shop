'use client'

import { useEffect, useState } from 'react'

export function useWidthScreen() {
  const [widthScreen, setWidthScreen] = useState<number>()

  useEffect(() => {
    setWidthScreen(window.innerWidth) // for an initial value

    window.onresize = () => {
      setWidthScreen(window.innerWidth)
    }
  }, [widthScreen])

  return widthScreen
}
