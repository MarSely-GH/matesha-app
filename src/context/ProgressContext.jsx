import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { LESSON_IDS } from '../data/lessons.js'

const STORAGE_KEY = 'matesha-progress-v1'

const defaultState = () => ({
  welcomeDone: false,
  lessons: Object.fromEntries(LESSON_IDS.map((id) => [id, { completed: false, stars: 0, wrongTotal: 0 }])),
  sparklePoints: 0,
})

function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return defaultState()
    const parsed = JSON.parse(raw)
    const base = defaultState()
    return {
      welcomeDone: Boolean(parsed.welcomeDone),
      lessons: { ...base.lessons, ...parsed.lessons },
      sparklePoints: typeof parsed.sparklePoints === 'number' ? parsed.sparklePoints : 0,
    }
  } catch {
    return defaultState()
  }
}

const ProgressContext = createContext(null)

export function ProgressProvider({ children }) {
  const [state, setState] = useState(() => loadState())

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
  }, [state])

  const setWelcomeDone = useCallback(() => {
    setState((s) => ({ ...s, welcomeDone: true }))
  }, [])

  const isLessonUnlocked = useCallback(
    (lessonId) => {
      const idx = LESSON_IDS.indexOf(lessonId)
      if (idx <= 0) return true
      const prev = LESSON_IDS[idx - 1]
      return state.lessons[prev]?.completed === true
    },
    [state.lessons],
  )

  const recordLessonFinish = useCallback((lessonId, wrongInRun) => {
    setState((s) => {
      const prev = s.lessons[lessonId] ?? { completed: false, stars: 0, wrongTotal: 0 }
      const newStars = wrongInRun === 0 ? 3 : wrongInRun <= 2 ? 2 : 1
      const stars = Math.max(prev.stars ?? 0, newStars)
      const bonus = prev.completed ? 4 + newStars : 6 + newStars * 3
      return {
        ...s,
        sparklePoints: s.sparklePoints + bonus,
        lessons: {
          ...s.lessons,
          [lessonId]: {
            completed: true,
            stars,
            wrongTotal: (prev.wrongTotal ?? 0) + wrongInRun,
          },
        },
      }
    })
  }, [])

  const value = useMemo(
    () => ({
      state,
      setWelcomeDone,
      isLessonUnlocked,
      recordLessonFinish,
    }),
    [state, setWelcomeDone, isLessonUnlocked, recordLessonFinish],
  )

  return <ProgressContext.Provider value={value}>{children}</ProgressContext.Provider>
}

export function useProgress() {
  const ctx = useContext(ProgressContext)
  if (!ctx) throw new Error('useProgress вне ProgressProvider')
  return ctx
}
