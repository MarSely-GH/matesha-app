import mascotUrl from '../assets/matesha-mascot.png'

const VARIANT_CLASS = {
  welcome: 'matesha--welcome',
  welcomeScene: 'matesha--welcome',
  home: 'matesha--home',
  map: 'matesha--map',
  lesson: 'matesha--lesson',
  full: 'matesha--welcome',
  avatar: 'matesha--lesson',
}

/**
 * Главный персонаж: PNG только как маскот (без фона сцены в картинке).
 * Замените файл src/assets/matesha-mascot.png на финальный арт с прозрачным фоном.
 */
export default function MateshaHero({ variant = 'welcome', className = '' }) {
  const v = VARIANT_CLASS[variant] ?? VARIANT_CLASS.welcome

  return (
    <div className={`matesha-stage ${className}`.trim()}>
      <div className={`matesha-wrap matesha-wrap--mascot ${v}`.trim()} role="img" aria-label="Матёша — котозаяц в фиолетовой толстовке">
        <div className="matesha-ring" aria-hidden />
        <div className="matesha-glow" aria-hidden />
        <div className="matesha-portal matesha-portal--mascot">
          <img
            className="matesha-img matesha-img--mascot matesha-img--live"
            src={mascotUrl}
            alt="Матёша — пушистый котозаяц в сиреневой толстовке со звёздочкой, машет лапой"
            loading="lazy"
            decoding="async"
          />
        </div>
        <div className="matesha-mascot-rim" aria-hidden />
        <div className="matesha-shine matesha-shine--mascot" aria-hidden />
      </div>
    </div>
  )
}
