import './Aurora.css'



// FOLDS

const tealFolds = [
  { width: 300, depth: 55 },
  { width: 420, depth: 38 },
  { width: 260, depth: 60 },
  { width: 460, depth: 44 },
]

const violetFolds = [
  { width: 380, depth: 40 },
  { width: 240, depth: 58 },
  { width: 500, depth: 35 },
  { width: 320, depth: 50 },
]



// CURTAIN

function curtain(pattern) {
  const folds = []
  let x = 0

  for (let repeat = 0; repeat < 3; repeat++) {
    pattern.forEach(fold => {
      folds.push({ x, ...fold })
      x += fold.width
    })
  }

  const edge = 'M0 150 ' + folds.map(({ x, width: w, depth: d }) => `C${x + w / 6} 150, ${x + w * 0.28} ${150 - d}, ${x + w / 2} ${160 - d} C${x + w * 0.72} ${170 - d}, ${x + w * 5 / 6} 150, ${x + w} 150`).join(' ')

  const top = [...folds].reverse().map(({ x, width: w, depth: d }) => `C${x + w * 5 / 6} 70, ${x + w * 0.72} ${90 - d}, ${x + w / 2} ${80 - d} C${x + w * 0.28} ${70 - d}, ${x + w / 6} 70, ${x} 70`).join(' ')

  return { edge, shape: `${edge} L${x} 70 ${top} Z` }
}

const teal = curtain(tealFolds)
const violet = curtain(violetFolds)



// AURORA

function Aurora() {
  return (
    <div className="aurora" aria-hidden="true">
      <svg viewBox="0 0 4320 200" preserveAspectRatio="none">
        <defs>
          <linearGradient id="violet-glow" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#8f86d6" stopOpacity="0" />
            <stop offset="1" stopColor="#8f86d6" stopOpacity="0.3" />
          </linearGradient>
        </defs>
        <path d={violet.shape} fill="url(#violet-glow)" />
      </svg>

      <svg viewBox="0 0 4320 200" preserveAspectRatio="none">
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
