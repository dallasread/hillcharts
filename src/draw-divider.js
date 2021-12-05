export default (ctx, padding, width, height, color, alpha) => {
  ctx.beginPath()
  ctx.strokeStyle = color
  ctx.lineWidth = 2
  ctx.setLineDash([5, 15])
  ctx.moveTo(width / 2, padding)
  ctx.lineTo(width / 2, height - padding)
  ctx.globalAlpha = alpha
  ctx.stroke()
}
