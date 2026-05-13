import MateshaHero from './MateshaHero.jsx'

function Starfield({ count = 18 }) {
  return (
    <div className="welcome-scene__stars" aria-hidden>
      {Array.from({ length: count }, (_, i) => (
        <span
          key={i}
          className="welcome-scene__star"
          style={{
            left: `${(i * 53) % 100}%`,
            top: `${(i * 17 + 7) % 55}%`,
            animationDelay: `${(i % 7) * 0.25}s`,
            transform: `scale(${0.6 + (i % 3) * 0.25})`,
          }}
        />
      ))}
    </div>
  )
}

export default function WelcomeHeroScene() {
  return (
    <section className="welcome-scene" aria-label="Сказочная поляна">
      <div className="welcome-scene__sky" aria-hidden />
      <div className="welcome-scene__warm-fog" aria-hidden />
      <div className="welcome-scene__sun" aria-hidden />
      <div className="welcome-scene__hills" aria-hidden />
      <div className="welcome-scene__orbs" aria-hidden>
        <span className="welcome-scene__orb welcome-scene__orb--a" />
        <span className="welcome-scene__orb welcome-scene__orb--b" />
        <span className="welcome-scene__orb welcome-scene__orb--c" />
      </div>
      <Starfield />
      <div className="welcome-scene__spark-band" aria-hidden />

      <div className="welcome-scene__halo" aria-hidden />
      <div className="welcome-scene__mascot">
        <MateshaHero variant="welcome" />
      </div>
    </section>
  )
}
