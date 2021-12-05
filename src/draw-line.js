export default (ctx, padding, width, height, color) => {
  ctx.lineWidth = 3
  ctx.strokeStyle = color

  ctx.moveTo(0, height)

  const pullDown = height * 5 / 6
  ctx.bezierCurveTo(width / 3, pullDown, width / 3, 0, width / 2, 0)
  ctx.bezierCurveTo(width * 2 / 3, 0, width * 2 / 3, pullDown, width, height)

  ctx.stroke()
}
