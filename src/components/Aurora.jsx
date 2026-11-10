import './Aurora.css'



// CURTAIN

const folds = [0, 720, 1440, 2160]

const edge = 'M0 150 ' + folds.map(x => `C${x + 120} 150, ${x + 200} 95, ${x + 360} 105 C${x + 520} 115, ${x + 600} 150, ${x + 720} 150`).join(' ')

const top = [...folds].reverse().map(x => `C${x + 600} 70, ${x + 520} 35, ${x + 360} 25 C${x + 200} 15, ${x + 120} 70, ${x} 70`).join(' ')

const curtain = `${edge} L2880 70 ${top} Z`



// AURORA

function Aurora() {
  return (
    <div className="aurora" aria-hidden="true">
      <svg viewBox="0 0 2880 200" preserveAspectRatio="none">
        <defs>
          <linearGradient id="violet-glow" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#8f86d6" stopOpacity="0" />
            <stop offset="1" stopColor="#8f86d6" stopOpacity="0.3" />
          </linearGradient>
        </defs>
        <path d={curtain} fill="url(#violet-glow)" />
      </svg>

      <svg viewBox="0 0 2880 200" preserveAspectRatio="none">
        <defs>
          <linearGradient id="teal-glow" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="var(--teal)" stopOpacity="0" />
            <stop offset="0.6" stopColor="var(--teal)" stopOpacity="0.18" />
            <stop offset="1" stopColor="var(--teal)" stopOpacity="0.45" />
          </linearGradient>
        </defs>
        <path d={curtain} fill="url(#teal-glow)" />
        <path d={edge} fill="none" stroke="var(--teal)" strokeWidth="2" opacity="0.5" vectorEffect="non-scaling-stroke" />
      </svg>
    </div>
  )
}

export default Aurora
