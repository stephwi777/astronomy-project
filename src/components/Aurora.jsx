import './Aurora.css'



// CURTAIN

function curtain(folds) {
  const width = 2880 / folds
  const starts = Array.from({ length: folds }, (_, i) => i * width)

  const edge = 'M0 150 ' + starts.map(x => `C${x + width / 6} 150, ${x + width * 0.28} 95, ${x + width / 2} 105 C${x + width * 0.72} 115, ${x + width * 5 / 6} 150, ${x + width} 150`).join(' ')

  const top = [...starts].reverse().map(x => `C${x + width * 5 / 6} 70, ${x + width * 0.72} 35, ${x + width / 2} 25 C${x + width * 0.28} 15, ${x + width / 6} 70, ${x} 70`).join(' ')

  return { edge, shape: `${edge} L2880 70 ${top} Z` }
}

const teal = curtain(4)
const violet = curtain(6)



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
        <path d={violet.shape} fill="url(#violet-glow)" />
      </svg>

      <svg viewBox="0 0 2880 200" preserveAspectRatio="none">
        <defs>
          <linearGradient id="teal-glow" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="var(--teal)" stopOpacity="0" />
            <stop offset="0.6" stopColor="var(--teal)" stopOpacity="0.18" />
            <stop offset="1" stopColor="var(--teal)" stopOpacity="0.45" />
          </linearGradient>
        </defs>
        <path d={teal.shape} fill="url(#teal-glow)" />
        <path d={teal.edge} fill="none" stroke="var(--teal)" strokeWidth="2" opacity="0.5" vectorEffect="non-scaling-stroke" />
      </svg>
    </div>
  )
}

export default Aurora
