export default function AppShell({ children }) {
  return (
    <div className="app-shell">
      <DecorStars />
      {children}
    </div>
  )
}

function DecorStars() {
  const spots = [
    { t: '8%', l: '6%', d: '0s' },
    { t: '14%', l: '88%', d: '0.4s' },
    { t: '42%', l: '4%', d: '0.9s' },
    { t: '68%', l: '90%', d: '0.2s' },
    { t: '88%', l: '12%', d: '1.1s' },
  ]
  return (
    <div className="deco-stars" aria-hidden>
      {spots.map((s, i) => (
        <i key={i} style={{ top: s.t, left: s.l, animationDelay: s.d }} />
      ))}
    </div>
  )
}
