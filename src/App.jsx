import { Routes, Route, Navigate } from 'react-router-dom'
import { useProgress } from './context/ProgressContext.jsx'
import AppShell from './components/AppShell.jsx'
import WelcomeScreen from './components/WelcomeScreen.jsx'
import HomeScreen from './components/HomeScreen.jsx'
import AdventureMap from './components/AdventureMap.jsx'
import LessonPlay from './components/LessonPlay.jsx'

export default function App() {
  const { state } = useProgress()

  return (
    <AppShell>
      <Routes>
        <Route path="/" element={<RootRedirect welcomeDone={state.welcomeDone} />} />
        <Route path="/welcome" element={<WelcomeScreen />} />
        <Route path="/home" element={<HomeScreen />} />
        <Route path="/map" element={<AdventureMap />} />
        <Route path="/lesson/:lessonId" element={<LessonPlay />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </AppShell>
  )
}

function RootRedirect({ welcomeDone }) {
  if (!welcomeDone) return <Navigate to="/welcome" replace />
  return <Navigate to="/home" replace />
}
