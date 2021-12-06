const colors = ['#35c9f6', '#803bc7']

const getCoordinates = (padding, width, height, value) => {
  if (value === 0) {
    return {
      x: padding,
      y: height - padding,
      align: 'left'
    }
  } else if (value === 25) {
    return {
      x: width / 4,
      y: height / 2,
      align: 'center'
    }
  } else if (value === 50) {
    return {
      x: width / 2,
      y: padding,
      align: 'center'
    }
  } else if (value === 75) {
    return {
      x: width * 3 / 4,
      y: height / 2,
      align: 'center'
    }
  } else {
    return {
      x: 0,
      y: 0,
      align: 'right'
    }
  }
}

const addLabel = (ctx, padding, width, height, labelPadding, text, value, color) => {
  const textHeight = height / 22
  ctx.font = `bold ${textHeight}px`

  const textWidth = ctx.measureText(text).width
  const coords = getCoordinates(padding, width, height, value)

  ctx.textAlign = coords.align
  ctx.textBaseline = 'middle'

  ctx.fillStyle = color
  ctx.fillRect(coords.x - (textWidth / 2) - labelPadding, coords.y - (textHeight / 2) - labelPadding, textWidth + (labelPadding * 2), textHeight + (labelPadding * 2))

  ctx.fillStyle = 'white'
  ctx.fillText(text, coords.x, coords.y)
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
