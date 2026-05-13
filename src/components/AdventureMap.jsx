import { Link } from 'react-router-dom'
import { useProgress } from '../context/ProgressContext.jsx'
import { LESSON_IDS, LESSON_META } from '../data/lessons.js'
import MateshaHero from './MateshaHero.jsx'

function Stars({ n }) {
  return (
    <div className="stars-row" aria-label={`Звёзды: ${n} из 3`}>
      {[0, 1, 2].map((i) => (
        <span key={i} className={`star ${i < n ? '' : 'star--dim'}`} aria-hidden>
          ★
        </span>
      ))}
    </div>
  )
}

export default function AdventureMap() {
  const { state, isLessonUnlocked } = useProgress()

  return (
    <div className="page-enter screen-world screen-world--game screen-world--map">
      <div className="screen-world__ambient screen-world__ambient--map" aria-hidden />
      <div className="top-bar">
        <Link className="link-back" to="/home">
          ← Домой
        </Link>
        <div className="pill pill--glass">
          <span aria-hidden>✨</span>
          {state.sparklePoints}
        </div>
      </div>

      <div className="screen-mascot screen-mascot--compact">
        <MateshaHero variant="map" />
      </div>

      <div className="map-intro glass-block">
        <h1 className="title-xl map-intro__title">Карта приключения</h1>
        <p className="subtitle map-intro__text">
          Каждая остановка — маленький квест. Следующая открывается, когда ты готова к ней.
        </p>
        <p className="map-intro__matesha">Я проведу по маршруту — выбирай шаг, я рядом.</p>
      </div>

      <div className="map-path">
        {LESSON_IDS.map((id, index) => {
          const meta = LESSON_META[id]
          const unlocked = isLessonUnlocked(id)
          const lessonState = state.lessons[id]
          const completed = lessonState?.completed
          const active = unlocked && !completed
          const stars = lessonState?.stars ?? 0

          return (
            <div
              key={id}
              className={['soft-card soft-card--glass map-node', !unlocked ? 'map-node--locked' : '', active ? 'map-node--active' : '']
                .filter(Boolean)
                .join(' ')}
            >
              <div className="map-node-badge" aria-hidden>
                {unlocked ? meta.emoji : '🔒'}
              </div>
              <div style={{ flex: 1, position: 'relative', zIndex: 1 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', gap: 8, alignItems: 'start' }}>
                  <div>
                    <h2 className="title-lg map-node__title">
                      {index + 1}. {meta.title}
                    </h2>
                    <p className="map-node__line">{meta.mapLine}</p>
                  </div>
                  {completed && <Stars n={stars} />}
                </div>

                <div className="map-node__actions">
                  {unlocked ? (
                    <Link to={`/lesson/${id}`} className="btn-primary btn-primary--compact btn-primary--magical">
                      {completed ? 'Повторить мягко' : 'Играть'}
                    </Link>
                  ) : (
                    <button type="button" className="btn-ghost" disabled style={{ cursor: 'not-allowed', opacity: 0.7 }}>
                      Скоро откроется
                    </button>
                  )}
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
