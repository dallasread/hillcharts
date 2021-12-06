export default (ctx, labels, padding, width, height, labelPadding) => {
  for (const label in labels) {
    const value = labels[label]

    ctx.globalAlpha = 1.0
    const fontsize = height / 20
    ctx.font = `${fontsize}px Helvetica`
    const textWidth = ctx.measureText(label).width
    const textHeight = fontsize * 1.286

    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'

    ctx.fillStyle = 'green'
    ctx.fillRect(100 - (textWidth / 2) - labelPadding, 100 - (textHeight / 2) - labelPadding, textWidth + (labelPadding * 2), textHeight + (labelPadding * 2))

    ctx.fillStyle = 'white'
    ctx.fillText(label, 100, 100)
  }

  //   const image = canvas.createCanvas(200, 200)
  //   const ctx = image.getContext('2d')
  //
  //   ctx.font = '30px Times'
  //   ctx.rotate(0.1)
  //   ctx.fillText(q, 50, 100)
  //
  //   const text = ctx.measureText(q)
  //   ctx.strokeStyle = 'rgba(0,0,0,0.5)'
  //   ctx.beginPath()
  //   ctx.lineTo(50, 102)
  //   ctx.lineTo(50 + text.width, 102)
  //   ctx.stroke()
  //
  //   return image.toBuffer()

  // #35c9f6
  // #803bc7
}
