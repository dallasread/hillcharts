export default (ctx, padding, imageWidth, imageHeight, color, alpha) => {
  const placement = Math.PI

  ctx.font = `${imageHeight / 20}px Arial`
  ctx.fillStyle = color
  ctx.globalAlpha = alpha
  ctx.textAlign = 'center'
  ctx.textBaseline = 'bottom'

  ctx.fillText('Figuring things out', (imageWidth / placement), imageHeight - padding)
  ctx.fillText('Making things happen', (imageWidth * (placement - 1) / placement), imageHeight - padding)
}
