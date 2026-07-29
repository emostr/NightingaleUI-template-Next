export default function NSparkline({ points = [], width = 100, height = 32, area = true }) {
  let line = ''
  let fill = ''
  if (points.length >= 2) {
    const min = Math.min(...points)
    const max = Math.max(...points)
    const span = max - min || 1
    const step = width / (points.length - 1)
    const coords = points.map((p, i) => {
      const x = i * step
      const y = height - ((p - min) / span) * (height - 4) - 2
      return [x, y]
    })
    line = coords.map(([x, y], i) => `${i ? 'L' : 'M'}${x.toFixed(1)},${y.toFixed(1)}`).join(' ')
    fill = `${line} L${width},${height} L0,${height} Z`
  }

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      width={width}
      height={height}
      preserveAspectRatio="none"
      className="overflow-visible"
    >
      {area ? <path d={fill} fill="var(--ng-accent)" opacity="0.14" /> : null}
      <path d={line} fill="none" stroke="var(--ng-accent)" strokeWidth="2" vectorEffect="non-scaling-stroke" />
    </svg>
  )
}
