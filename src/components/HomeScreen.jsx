import { Link } from 'react-router-dom'
import { useProgress } from '../context/ProgressContext.jsx'
import { LESSON_IDS } from '../data/lessons.js'
import MateshaHero from './MateshaHero.jsx'

export default function HomeScreen() {
  const { state } = useProgress()
  const doneCount = LESSON_IDS.filter((id) => state.lessons[id]?.completed).length

  return (
    <div className="page-enter screen-world screen-world--game screen-world--hub">
      <div className="screen-world__ambient" aria-hidden />
      <div className="top-bar">
        <Link className="link-back" to="/welcome?replay=1">
          ← Обо мне
        </Link>
        <div className="pill pill--glass" title="Светлячки за задания">
          <span aria-hidden>✨</span>
          {state.sparklePoints}
        </div>
      </div>

      <div className="screen-mascot">
        <MateshaHero variant="home" />
      </div>

      <div className="world-card">
        <h1 className="title-lg world-card__title">С возвращением!</h1>
        <p className="subtitle">Пройдено остановок: {doneCount} из {LESSON_IDS.length}</p>
      </div>

      <div className="soft-card soft-card--glass world-panel">
        <p className="bubble bubble--magic" style={{ margin: 0 }}>
          Сегодня можно сделать чуть-чуть — и уже победа. Выбери маршрут на карте: я приготовила задания-карточки.
        </p>
        <Link to="/map" className="btn-primary btn-primary--magical" style={{ textAlign: 'center' }}>
          Карта приключения
          <span aria-hidden>🗺️</span>
        </Link>
        <p className="world-panel__hint">Без спешки. Без оценок. Только ты, математика и чуть-чуть магии.</p>
      </div>
    </div>
  )
}
