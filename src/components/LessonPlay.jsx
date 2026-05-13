import { useCallback, useEffect, useMemo, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useProgress } from '../context/ProgressContext.jsx'
import { getLessonSteps, LESSON_IDS, LESSON_META, pickInitial, pickNextVariant } from '../data/lessons.js'
import MateshaHero from './MateshaHero.jsx'
import MathVisual from './math/MathVisual.jsx'

const SUPPORT = [
  'Ничего страшного 💜 Сейчас разберёмся маленькими шажками.',
  'Ты стараешься — это самое важное. Дальше станет легче.',
  'Математика любит, когда ей уделяют время. Ты молодец, что не сдаёшься.',
  'Дыши. Ошибка — не оценка, а подсказка, куда посмотреть.',
]

export default function LessonPlay() {
  const { lessonId } = useParams()
  const navigate = useNavigate()
  const { isLessonUnlocked, recordLessonFinish } = useProgress()

  const meta = LESSON_META[lessonId]
  const steps = useMemo(() => getLessonSteps(lessonId), [lessonId])
  const unlocked = isLessonUnlocked(lessonId)

  const [stepIndex, setStepIndex] = useState(0)
  const [currentQuestion, setCurrentQuestion] = useState(null)
  const [failedQuestion, setFailedQuestion] = useState(null)
  const [wrongTotal, setWrongTotal] = useState(0)
  const [phase, setPhase] = useState('idle')
  const [picked, setPicked] = useState(null)
  const [finished, setFinished] = useState(false)
  const [showConfetti, setShowConfetti] = useState(false)

  useEffect(() => {
    setStepIndex(0)
    setWrongTotal(0)
    setPhase('idle')
    setPicked(null)
    setFinished(false)
    setShowConfetti(false)
    setFailedQuestion(null)
  }, [lessonId])

  useEffect(() => {
    if (!meta || !LESSON_IDS.includes(lessonId) || !unlocked) {
      navigate('/map', { replace: true })
    }
  }, [lessonId, meta, navigate, unlocked])

  useEffect(() => {
    const step = steps[stepIndex]
    if (step?.bank?.length) {
      setCurrentQuestion(pickInitial(step.bank))
    } else {
      setCurrentQuestion(null)
    }
    setPhase('idle')
    setPicked(null)
    setFailedQuestion(null)
  }, [stepIndex, steps])

  const q = currentQuestion
  const totalSteps = steps.length
  const progress = totalSteps ? ((stepIndex + (phase === 'right' ? 1 : 0)) / totalSteps) * 100 : 0

  const mateHint = useMemo(() => {
    if (stepIndex === 0) return meta?.mateshaIntro ?? ''
    return SUPPORT[(stepIndex + lessonId?.length) % SUPPORT.length]
  }, [meta, stepIndex, lessonId])

  const pick = useCallback(
    (optionIndex) => {
      if (!q || phase !== 'idle') return
      setPicked(optionIndex)
      if (optionIndex === q.correctIndex) {
        setPhase('right')
      } else {
        setWrongTotal((w) => w + 1)
        setFailedQuestion(q)
        setPhase('wrong')
      }
    },
    [phase, q],
  )

  const continueSimilar = useCallback(() => {
    const step = steps[stepIndex]
    if (!step?.bank?.length || !failedQuestion) return
    const next = pickNextVariant(step.bank, failedQuestion.id)
    setCurrentQuestion(next)
    setFailedQuestion(null)
    setPhase('idle')
    setPicked(null)
  }, [failedQuestion, stepIndex, steps])

  const goNext = useCallback(() => {
    setPicked(null)
    setPhase('idle')
    setFailedQuestion(null)
    if (stepIndex + 1 >= totalSteps) {
      recordLessonFinish(lessonId, wrongTotal)
      setFinished(true)
      setShowConfetti(true)
      window.setTimeout(() => setShowConfetti(false), 2600)
    } else {
      setStepIndex((i) => i + 1)
    }
  }, [lessonId, recordLessonFinish, stepIndex, totalSteps, wrongTotal])

  const restartLesson = useCallback(() => {
    setStepIndex(0)
    setWrongTotal(0)
    setPhase('idle')
    setPicked(null)
    setFinished(false)
    setShowConfetti(false)
    setFailedQuestion(null)
    const first = steps[0]?.bank?.length ? pickInitial(steps[0].bank) : null
    setCurrentQuestion(first)
  }, [steps])

  if (!meta || !q) return null

  const starsAward = wrongTotal === 0 ? 3 : wrongTotal <= 2 ? 2 : 1
  const explain = failedQuestion?.wrongHelp

  return (
    <div className="page-enter">
      {showConfetti && <Confetti />}

      <div className="top-bar">
        <Link className="link-back" to="/map">
          ← Карта
        </Link>
        <span className="pill" aria-live="polite">
          {meta.emoji} {meta.short}
        </span>
      </div>

      {!finished ? (
        <>
          <div className="progress-track" aria-hidden>
            <div className="progress-fill" style={{ width: `${Math.min(100, progress)}%` }} />
          </div>

          <div className="lesson-mate-row">
            <MateshaHero variant="lesson" />
            <p className="bubble bubble--lavender lesson-mate-bubble">{mateHint}</p>
          </div>

          {phase !== 'wrong' ? (
            <>
              <div className="soft-card soft-card--glass soft-card--cream question-card" key={q.id}>
                <p className="question-card__step">
                  Шаг {stepIndex + 1} из {totalSteps}
                </p>
                <h2 className="title-lg question-card__prompt">{q.prompt}</h2>
                {q.visual && q.visual.type !== 'none' ? (
                  <div className="question-card__visual">
                    <MathVisual spec={q.visual} />
                  </div>
                ) : null}
              </div>

              <div className="choice-grid" role="group" aria-label="Варианты ответа">
                {q.options.map((label, i) => {
                  let cls = 'choice-btn'
                  if (phase !== 'idle' && picked !== null) {
                    if (i === q.correctIndex) cls += ' choice-btn--correct'
                    else if (i === picked && picked !== q.correctIndex) cls += ' choice-btn--wrong'
                  }
                  return (
                    <button key={`${q.id}-${i}`} type="button" className={cls} disabled={phase !== 'idle'} onClick={() => pick(i)}>
                      {label}
                    </button>
                  )
                })}
              </div>
            </>
          ) : (
            <div className="wrong-panel">
              <div className="wrong-panel__header">
                <MateshaHero variant="lesson" />
                <p className="wrong-panel__title">{explain?.title ?? 'Ничего страшного 💜'}</p>
              </div>
              {failedQuestion?.visual && failedQuestion.visual.type !== 'none' ? (
                <div className="soft-card wrong-panel__visual">
                  <p className="wrong-panel__visual-cap">Смотри на картинку — так проще:</p>
                  <MathVisual spec={failedQuestion.visual} />
                </div>
              ) : null}
              <div className="bubble bubble--lavender wrong-panel__text">
                {(explain?.lines ?? []).map((line, idx) => (
                  <p key={idx} className="wrong-panel__line">
                    {line}
                  </p>
                ))}
                {explain?.miniExample ? (
                  <p className="wrong-panel__example">
                    <strong>Похожий пример:</strong> {explain.miniExample}
                  </p>
                ) : null}
              </div>
              <button type="button" className="btn-primary btn-primary--magical" onClick={continueSimilar}>
                Давай похожий пример
                <span aria-hidden>🌟</span>
              </button>
            </div>
          )}

          {phase === 'right' && (
            <div className="right-panel">
              <div className="bubble" style={{ margin: 0 }}>
                <strong>Ура!</strong> Ты поймала идею. Я горжусь тобой — идём дальше, без спешки.
              </div>
              <button type="button" className="btn-primary btn-primary--magical" onClick={goNext}>
                {stepIndex + 1 >= totalSteps ? 'Забрать награду' : 'Дальше'}
                <span aria-hidden>✨</span>
              </button>
            </div>
          )}
        </>
      ) : (
        <div className="soft-card soft-card--glass" style={{ padding: 24, textAlign: 'center', display: 'grid', gap: 16 }}>
          <MateshaHero variant="home" />
          <h2 className="title-xl" style={{ fontSize: '1.6rem' }}>
            Сокровище получено!
          </h2>
          <p style={{ margin: 0, color: 'var(--text-soft)', fontSize: '1.05rem' }}>
            Ты прошла урок «{meta.title}». Звёзды — за старание, а не за идеальность.
          </p>
          <div className="sparkle-row" style={{ justifyContent: 'center', fontSize: '1.4rem' }} aria-label={`Награда: ${starsAward} звезды`}>
            {'★'.repeat(starsAward)}
            <span style={{ marginLeft: 8 }}>{starsAward === 3 ? 'Блестяще!' : starsAward === 2 ? 'Очень здорово!' : 'Молодец!'}</span>
          </div>
          <Link className="btn-primary btn-primary--magical" to="/map">
            На карту
          </Link>
          <button type="button" className="btn-ghost" onClick={restartLesson}>
            Пройти ещё раз для уверенности
          </button>
        </div>
      )}
    </div>
  )
}

function Confetti() {
  const pieces = useMemo(
    () =>
      Array.from({ length: 42 }, (_, i) => ({
        id: i,
        l: `${(i * 17) % 100}%`,
        d: `${(i % 7) * 0.12}s`,
        bg: ['#f4c14d', '#9b7fd9', '#7c5cbf', '#f5e8dc', '#6ecf8d'][i % 5],
        dur: `${2.2 + (i % 5) * 0.15}s`,
      })),
    [],
  )

  return (
    <div className="confetti" aria-hidden>
      {pieces.map((p) => (
        <span
          key={p.id}
          style={{
            left: p.l,
            animationDelay: p.d,
            animationDuration: p.dur,
            background: p.bg,
          }}
        />
      ))}
    </div>
  )
}
