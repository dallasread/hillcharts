const colors = ['#FF7875', '#5ABBCA', '#C384C0', '#F7C164', '#777BB3']

const getXOffset = (padding, width, height, value) => {
  if (value === 0) {
    return width / 30
  } else if (value === 100) {
    return width / -30
  } else if (value === 50) {
    return 0
  } else {
    return ((value / 100) * width) * 0.02 * (value > 50 ? 1 : -1)
  }
}

const addLabel = (ctx, padding, width, height, labelPadding, text, value, color) => {
  const textHeight = height / 18
  ctx.font = `bold ${textHeight}px Helvetica`

  if (value > 90) {
    value = 90
  } else if (value < 10) {
    value = 10
  }

  const textWidth = ctx.measureText(text).width
  const coords = {
    x: width * (value / 10) / 10,
    y: Math.max((
      (height - labelPadding) - ((height * ((value ^ 3) * 2) / 100))
    ) * (value > 50 ? -1 : 1), padding),
    xOffset: getXOffset(padding, width, height, value) || 0
  }

  ctx.textAlign = coords.align
  ctx.textBaseline = 'middle'

  ctx.fillStyle = color
  ctx.fillRect(coords.x - (textWidth / 2) - labelPadding + coords.xOffset, coords.y - (textHeight / 2) - labelPadding, textWidth + (labelPadding * 2), textHeight + (labelPadding * 2))

  ctx.fillStyle = 'white'
  ctx.fillText(text, coords.x + coords.xOffset, coords.y)
}

export default (ctx, labels, padding, width, height, labelPadding) => {
  let colorIndex = -1
  const chooseColor = () => {
    colorIndex++
    if (!colors[colorIndex]) colorIndex = 0
    return colors[colorIndex]
  }

  ctx.globalAlpha = 1.0

  for (const label in labels) {
    addLabel(ctx, padding, width, height, labelPadding, label, parseInt(labels[label]), chooseColor())
  }
}
