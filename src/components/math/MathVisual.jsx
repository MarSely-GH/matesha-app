import { useId } from 'react'

/**
 * Наглядные подсказки к заданиям (SVG/CSS).
 */
export default function MathVisual({ spec, className = '' }) {
  if (!spec || spec.type === 'none') return null

  return (
    <div className={`math-visual ${className}`.trim()} role="img" aria-label={spec.aria || 'Наглядная подсказка'}>
      {spec.type === 'fracCircle' && <FracCircle num={spec.num} den={spec.den} caption={spec.caption} />}
      {spec.type === 'fracTwo' && <FracTwo left={spec.left} right={spec.right} caption={spec.caption} />}
      {spec.type === 'fracAdd' && <FracAdd left={spec.left} right={spec.right} caption={spec.caption} />}
      {spec.type === 'percent100' && <Percent100 fill={spec.fill} caption={spec.caption} />}
      {spec.type === 'percentBar' && <PercentBar pct={spec.pct} caption={spec.caption} />}
      {spec.type === 'rectArea' && <RectArea w={spec.w} h={spec.h} caption={spec.caption} />}
      {spec.type === 'squarePerim' && <SquarePerim a={spec.a} caption={spec.caption} />}
      {spec.type === 'angleRight' && <AngleRight caption={spec.caption} />}
      {spec.type === 'triangle180' && <Triangle180 caption={spec.caption} />}
      {spec.type === 'parallelLines' && <ParallelLines caption={spec.caption} />}
      {spec.type === 'balance' && <Balance left={spec.left} right={spec.right} caption={spec.caption} />}
    </div>
  )
}

function pieSlices(num, den, r, cx, cy, fillUrl) {
  const slices = []
  for (let i = 0; i < den; i++) {
    const a0 = (-Math.PI / 2) + (i * 2 * Math.PI) / den
    const a1 = (-Math.PI / 2) + ((i + 1) * 2 * Math.PI) / den
    const x0 = cx + r * Math.cos(a0)
    const y0 = cy + r * Math.sin(a0)
    const x1 = cx + r * Math.cos(a1)
    const y1 = cy + r * Math.sin(a1)
    const large = den <= 2 ? 1 : 0
    const fill = i < num ? `url(#${fillUrl})` : '#f1e9ff'
    const stroke = i < num ? '#7c5cbf' : '#c9b6ea'
    slices.push(
      <path
        key={i}
        d={`M ${cx} ${cy} L ${x0} ${y0} A ${r} ${r} 0 ${large} 1 ${x1} ${y1} Z`}
        fill={fill}
        stroke={stroke}
        strokeWidth="2"
      />,
    )
  }
  return slices
}

function FracCircle({ num, den, caption }) {
  const uid = useId().replace(/:/g, '')
  const gid = `mvFill-${uid}`
  const r = 44
  const cx = 52
  const cy = 52
  return (
    <figure className="math-visual__figure">
      <svg viewBox="0 0 104 104" className="math-visual__svg">
        <defs>
          <linearGradient id={gid} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#f4c14d" stopOpacity="0.95" />
            <stop offset="100%" stopColor="#f6a8d7" stopOpacity="0.85" />
          </linearGradient>
        </defs>
        {pieSlices(num, den, r, cx, cy, gid)}
      </svg>
      <figcaption className="math-visual__cap">{caption || `${num} из ${den} частей закрашено`}</figcaption>
      <div className="math-visual__legend">
        <span className="math-visual__tag math-visual__tag--num">верх: {num}</span>
        <span className="math-visual__tag math-visual__tag--den">низ: {den}</span>
      </div>
    </figure>
  )
}

function FracTwo({ left, right, caption }) {
  const uid = useId().replace(/:/g, '')
  const gid = `mvFill2-${uid}`
  const r = 36
  const cx = 44
  const cy = 44
  return (
    <figure className="math-visual__figure math-visual__figure--row">
      <div className="math-visual__row2">
        <svg viewBox="0 0 88 88" className="math-visual__svg math-visual__svg--sm">
          <defs>
            <linearGradient id={gid} x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#f4c14d" />
              <stop offset="100%" stopColor="#9b7fd9" />
            </linearGradient>
          </defs>
          {pieSlices(left[0], left[1], r, cx, cy, gid)}
        </svg>
        <div className="math-visual__vs" aria-hidden>
          ?
        </div>
        <svg viewBox="0 0 88 88" className="math-visual__svg math-visual__svg--sm">
          <defs>
            <linearGradient id={`${gid}-b`} x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#ffd8ef" />
              <stop offset="100%" stopColor="#7c5cbf" />
            </linearGradient>
          </defs>
          {pieSlices(right[0], right[1], r, cx, cy, `${gid}-b`)}
        </svg>
      </div>
      {caption && <figcaption className="math-visual__cap">{caption}</figcaption>}
    </figure>
  )
}

function FracAdd({ left, right, caption }) {
  const uid = useId().replace(/:/g, '')
  const gid = `mvFill3-${uid}`
  const r = 34
  const cx = 42
  const cy = 42
  return (
    <figure className="math-visual__figure math-visual__figure--row">
      <div className="math-visual__row2 math-visual__row2--gap">
        <svg viewBox="0 0 84 84" className="math-visual__svg math-visual__svg--sm">
          <defs>
            <linearGradient id={gid} x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#ffd8ef" />
              <stop offset="100%" stopColor="#f4c14d" />
            </linearGradient>
          </defs>
          {pieSlices(left[0], left[1], r, cx, cy, gid)}
        </svg>
        <div className="math-visual__plus" aria-hidden>
          +
        </div>
        <svg viewBox="0 0 84 84" className="math-visual__svg math-visual__svg--sm">
          <defs>
            <linearGradient id={`${gid}-b`} x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#e8def8" />
              <stop offset="100%" stopColor="#9b7fd9" />
            </linearGradient>
          </defs>
          {pieSlices(right[0], right[1], r, cx, cy, `${gid}-b`)}
        </svg>
      </div>
      {caption && <figcaption className="math-visual__cap">{caption}</figcaption>}
    </figure>
  )
}

function Percent100({ fill, caption }) {
  const cells = []
  const n = Math.max(0, Math.min(100, Math.round(Number(fill) || 0)))
  for (let i = 0; i < 100; i++) {
    cells.push(<div key={i} className={`math-visual__cell ${i < n ? 'math-visual__cell--on' : ''}`} aria-hidden />)
  }
  return (
    <figure className="math-visual__figure">
      <div className="math-visual__grid100" role="presentation">
        {cells}
      </div>
      <figcaption className="math-visual__cap">{caption || `Закрашено ${n} из 100 клеточек — это и есть проценты`}</figcaption>
    </figure>
  )
}

function PercentBar({ pct, caption }) {
  const p = Math.max(0, Math.min(100, Math.round(Number(pct) || 0)))
  return (
    <figure className="math-visual__figure">
      <div className="math-visual__bar" aria-hidden>
        <div className="math-visual__bar-fill" style={{ width: `${p}%` }} />
      </div>
      <figcaption className="math-visual__cap">{caption || `Полоска показывает ${p}% из 100%`}</figcaption>
    </figure>
  )
}

function RectArea({ w, h, caption }) {
  const W = 140
  const H = 90
  return (
    <figure className="math-visual__figure">
      <svg viewBox="0 0 180 120" className="math-visual__svg">
        <rect x="20" y="15" width={W} height={H} rx="12" fill="#fff7ff" stroke="#7c5cbf" strokeWidth="3" />
        <text x="90" y="68" textAnchor="middle" fontSize="18" fontWeight="900" fill="#5b3d9e">
          {w} × {h}
        </text>
        <text x="90" y="12" textAnchor="middle" fontSize="13" fontWeight="800" fill="#9b7fd9">
          ширина {w}
        </text>
        <text x="10" y="72" textAnchor="middle" fontSize="13" fontWeight="800" fill="#9b7fd9" transform="rotate(-90 10 72)">
          высота {h}
        </text>
      </svg>
      <figcaption className="math-visual__cap">{caption || 'Площадь — как посчитать плитки: длина × ширина'}</figcaption>
    </figure>
  )
}

function SquarePerim({ a, caption }) {
  const s = 100
  return (
    <figure className="math-visual__figure">
      <svg viewBox="0 0 160 140" className="math-visual__svg">
        <rect x="30" y="20" width={s} height={s} rx="10" fill="#f6f0ff" stroke="#7c5cbf" strokeWidth="3" />
        <text x="80" y="75" textAnchor="middle" fontSize="18" fontWeight="900" fill="#5b3d9e">
          {a} см
        </text>
        <text x="80" y="8" textAnchor="middle" fontSize="12" fontWeight="800" fill="#9b7fd9">
          {a}
        </text>
        <text x="142" y="78" textAnchor="middle" fontSize="12" fontWeight="800" fill="#9b7fd9">
          {a}
        </text>
        <text x="80" y="138" textAnchor="middle" fontSize="12" fontWeight="800" fill="#9b7fd9">
          {a}
        </text>
        <text x="18" y="78" textAnchor="middle" fontSize="12" fontWeight="800" fill="#9b7fd9">
          {a}
        </text>
      </svg>
      <figcaption className="math-visual__cap">{caption || 'Периметр — обойти квадрат и сложить все стороны'}</figcaption>
    </figure>
  )
}

function Triangle180({ caption }) {
  return (
    <figure className="math-visual__figure">
      <svg viewBox="0 0 140 110" className="math-visual__svg">
        <polygon points="70,18 18,98 122,98" fill="#fff7ff" stroke="#7c5cbf" strokeWidth="3" />
        <text x="70" y="88" textAnchor="middle" fontSize="13" fontWeight="800" fill="#5b3d9e">
          три угла внутри
        </text>
        <text x="70" y="58" textAnchor="middle" fontSize="16" fontWeight="900" fill="#9b7fd9">
          вместе = 180°
        </text>
      </svg>
      <figcaption className="math-visual__cap">{caption || 'В любом треугольнике три угла в сумме дают 180°'}</figcaption>
    </figure>
  )
}

function AngleRight({ caption }) {
  return (
    <figure className="math-visual__figure">
      <svg viewBox="0 0 120 100" className="math-visual__svg">
        <path d="M 20 80 L 100 80 L 20 20 Z" fill="#fff4fb" stroke="#7c5cbf" strokeWidth="3" />
        <rect x="20" y="62" width="18" height="18" fill="#f4c14d" stroke="#e5a91a" strokeWidth="2" rx="2" />
        <text x="52" y="58" fontSize="14" fontWeight="900" fill="#5b3d9e">
          90°
        </text>
      </svg>
      <figcaption className="math-visual__cap">{caption || 'Прямой угол — как угол листа тетрадки'}</figcaption>
    </figure>
  )
}

function ParallelLines({ caption }) {
  return (
    <figure className="math-visual__figure">
      <svg viewBox="0 0 160 90" className="math-visual__svg">
        <line x1="10" y1="25" x2="150" y2="25" stroke="#7c5cbf" strokeWidth="4" strokeLinecap="round" />
        <line x1="10" y1="60" x2="150" y2="60" stroke="#9b7fd9" strokeWidth="4" strokeLinecap="round" />
      </svg>
      <figcaption className="math-visual__cap">{caption || 'Параллельные линии — как рельсы: рядом идут и не встречаются'}</figcaption>
    </figure>
  )
}

function Balance({ left, right, caption }) {
  return (
    <figure className="math-visual__figure">
      <div className="math-visual__balance" role="presentation">
        <div className="math-visual__pan">{left}</div>
        <div className="math-visual__eq">=</div>
        <div className="math-visual__pan">{right}</div>
      </div>
      {caption && <figcaption className="math-visual__cap">{caption}</figcaption>}
    </figure>
  )
}
