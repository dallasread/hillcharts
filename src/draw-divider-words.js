export default (ctx, padding, width, height, color, alpha) => {
  const placement = Math.PI

  ctx.font = `${height / 20}px Helvetica`
  ctx.fillStyle = color
  ctx.globalAlpha = alpha
  ctx.textAlign = 'center'
  ctx.textBaseline = 'bottom'

  ctx.fillText('Figuring things out', (width / placement), height - padding)
  ctx.fillText('Making things happen', (width * (placement - 1) / placement), height - padding)
}
