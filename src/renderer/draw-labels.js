import BoundingBox from './bounding-box.js'

const calcPreferredY = (imageHeight, imagePadding, labelPadding, label, labelHeight) => {
  const minY = imagePadding
  const maxY = imageHeight - imagePadding
  const percentage = (label.value / 100) * 100
  const preferredY = ((-0.06 * ((percentage - 50) * (percentage - 50))) / 100) * -imageHeight

  if (preferredY < minY) {
    return minY
  } else if (preferredY > maxY) {
    return maxY
  }

  return preferredY
}

const calcPreferredX = (imageWidth, imagePadding, label, labelWidth) => {
  const percentage = label.value / 100
  const minX = (labelWidth / 2) + (imagePadding / 2)
  const maxX = imageWidth - (labelWidth / 2) - (imagePadding / 2)
  const preferredX = imageWidth * percentage

  if (preferredX < minX) {
    return minX
  } else if (preferredX > maxX) {
    return maxX
  }

  return preferredX
}

const findClosestAvailableBoundingBox = (preferredBoundingBox, boundingBoxes, labelSpacing) => {
  labelSpacing *= -1 // Add to the top first

  while (preferredBoundingBox.collidesAny(boundingBoxes)) {
    if (labelSpacing < 0 && preferredBoundingBox.top - labelSpacing < 0) {
      labelSpacing *= -1 // Add to the bottom later
    }

    preferredBoundingBox = BoundingBox.offset(preferredBoundingBox, 0, labelSpacing)
  }

  return preferredBoundingBox
}

const placeLabel = (ctx, imagePadding, imageWidth, imageHeight, labelPadding, labelSpacing, label, boundingBoxes) => {
  const lineOffset = 5 // Heroku doesn't like to middle-ify the font
  const textHeight = imageHeight / 18
  ctx.font = `bold ${textHeight}px Arial`

  const textWidth = ctx.measureText(label.text).width
  const width = textWidth + (labelPadding * 2)
  const height = textHeight + (labelPadding * 2)

  const preferredX = calcPreferredX(imageWidth, imagePadding, label, width)
  const preferredY = calcPreferredY(imageHeight, imagePadding, labelPadding, label, height)
  const preferredBoundingBox = BoundingBox.fromCenter(preferredX, preferredY, width, height)

  const boundingBox = findClosestAvailableBoundingBox(preferredBoundingBox, boundingBoxes, labelSpacing)
  const boundingBoxCenter = boundingBox.center()

  ctx.fillStyle = label.color
  ctx.fillRect(boundingBox.left, boundingBox.top, boundingBox.width, boundingBox.height - lineOffset)

  ctx.textBaseline = 'middle'
  ctx.fillStyle = 'white'
  ctx.fillText(label.text, boundingBoxCenter.x, boundingBoxCenter.y)

  return boundingBox
}

const drawLabels = (ctx, labels, imagePadding, imageWidth, imageHeight, labelPadding, labelSpacing) => {
  const boundingBoxes = []

  ctx.globalAlpha = 1.0

  labels.forEach((label) => {
    boundingBoxes.push(
      placeLabel(ctx, imagePadding, imageWidth, imageHeight, labelPadding, labelSpacing, label, boundingBoxes)
    )
  })
}

export default drawLabels
