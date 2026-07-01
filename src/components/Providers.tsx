'use client'

import { createContext, useContext, useEffect, useState } from 'react'

type Theme = 'light' | 'dark'

interface ThemeCtx {
  theme: Theme
  setTheme: (t: Theme) => void
}

const ThemeContext = createContext<ThemeCtx>({ theme: 'light', setTheme: () => {} })

export default function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>('light')

  // init from localStorage or system preference
  useEffect(() => {
    const saved = localStorage.getItem('theme') as Theme | null
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    const initial = saved ?? (prefersDark ? 'dark' : 'light')
    apply(initial)
    setTheme(initial)
  }, [])

  const apply = (t: Theme) => {
    document.documentElement.classList.toggle('dark', t === 'dark')
  }

  const handleSet = (t: Theme) => {
    setTheme(t)
    localStorage.setItem('theme', t)
    apply(t)
  }

  return (
    <ThemeContext.Provider value={{ theme, setTheme: handleSet }}>
      {children}
    </ThemeContext.Provider>
  )
}

export const useTheme = () => useContext(ThemeContext)
