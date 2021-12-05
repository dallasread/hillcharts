export default (ctx, padding, width, height, color) => {
  ctx.lineWidth = 3
  ctx.strokeStyle = color

  const pullDown = height * 5 / 6
  const magnitude = 4

  ctx.moveTo(padding, height - padding)
  ctx.bezierCurveTo(width / magnitude, pullDown, width / magnitude, padding, width / 2, padding)
  ctx.bezierCurveTo(width * (magnitude - 1) / magnitude, padding, width * (magnitude - 1) / magnitude, pullDown, width - padding, height - padding)

  ctx.stroke()
}
