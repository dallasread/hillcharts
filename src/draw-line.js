export default (ctx, padding, width, height, color) => {
  ctx.beginPath()
  ctx.strokeStyle = '#666'
  ctx.lineWidth = 3
  ctx.moveTo(0, height)
  ctx.quadraticCurveTo(
    width / 6, height,
    (width / 3), height / 3
  )
  ctx.stroke()

  ctx.beginPath()
  ctx.strokeStyle = 'red'
  ctx.lineWidth = 3
  ctx.moveTo((width / 3), height / 3)
  ctx.quadraticCurveTo(
    (width / 2), (height / -3),
    width * 2 / 3, height / 3
  )
  ctx.stroke()

  ctx.beginPath()
  ctx.strokeStyle = '#666'
  ctx.lineWidth = 3
  ctx.moveTo(width, height)
  ctx.quadraticCurveTo(
    width * 5 / 6, height,
    width * 2 / 3, height / 3
  )
  ctx.stroke()
}
