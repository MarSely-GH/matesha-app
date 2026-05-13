import { useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { useProgress } from '../context/ProgressContext.jsx'
import WelcomeHeroScene from './WelcomeHeroScene.jsx'

export default function WelcomeScreen() {
  const navigate = useNavigate()
  const [params] = useSearchParams()
  const { state, setWelcomeDone } = useProgress()
  const replay = params.get('replay') === '1'

  useEffect(() => {
    if (state.welcomeDone && !replay) navigate('/home', { replace: true })
  }, [navigate, replay, state.welcomeDone])

  function start() {
    setWelcomeDone()
    navigate('/home', { replace: true })
  }

  return (
    <div className="page-enter welcome-layout welcome-layout--game">
      <header className="welcome-layout__brand">
        <p className="pill pill--glass welcome-layout__pill">
          <span aria-hidden>✨</span> Математика как сказка
        </p>
        <h1 className="title-xl welcome-layout__title">Матёша</h1>
        <p className="subtitle welcome-layout__subtitle">5–10 минут тёплого приключения в день</p>
      </header>

      <div className="welcome-layout__hero">
        <WelcomeHeroScene />
        <div className="welcome-dock welcome-dock--premium">
          <p className="welcome-dock__hook">
            Привет! Я <strong>Матёша</strong>! Давай вместе отправимся в математическое приключение! <span aria-hidden>✨</span>
          </p>
          <button type="button" className="btn-primary btn-primary--magical" onClick={start}>
            Начать приключение
            <span aria-hidden>⭐</span>
          </button>
        </div>
      </div>

      <div className="soft-card soft-card--glass welcome-layout__note">
        <p className="welcome-layout__lead">
          На карте ждут дроби, проценты, уравнения и геометрия. Если что-то не получится с первого раза — это нормально: я
          объясню спокойно и без строгости.
        </p>
      </div>
    </div>
  )
}
