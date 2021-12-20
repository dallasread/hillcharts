import roundedLabelValue from './rounded-label-value.js'
import BoundingBox from './bounding-box.js'

const calcPreferredY = (imageHeight, imagePadding, labelPadding, label, labelsWithSimilarValue) => {
  const minY = imagePadding
  const overTheHillMultiplier = label.value > 50 ? -1 : 1
  const exactY = overTheHillMultiplier * (
    (imageHeight - labelPadding) -
         (
           (imageHeight * (
             (label.value ^ 3) * 2) / 100
           )
         )
  )

  return Math.max(exactY, minY)
}

const calcPreferredX = (imageWidth, label) => {
  const percentage = label.value / 100

  return imageWidth * percentage
}

const findClosestAvailableBoundingBox = (preferredBoundingBox, boundingBoxes, spacing, height) => {
  spacing *= -1 // Add to the top first

  while (preferredBoundingBox.collidesAny(boundingBoxes)) {
    if (spacing < 0 && preferredBoundingBox.top - spacing < 0) {
      spacing *= -1 // Add to the bottom later
    }

    preferredBoundingBox = BoundingBox.offset(preferredBoundingBox, 0, spacing)
  }

  return preferredBoundingBox
}

const placeLabel = (ctx, imagePadding, imageWidth, imageHeight, labelPadding, label, boundingBoxes) => {
  const textHeight = imageHeight / 18
  ctx.font = `bold ${textHeight}px Helvetica`

  const textWidth = ctx.measureText(label.text).width
  const width = textWidth + (labelPadding * 2)
  const height = textHeight + (labelPadding * 2)

  const preferredX = calcPreferredX(imageWidth, label)
  const preferredY = calcPreferredY(imageHeight, imagePadding, labelPadding, label)
  const preferredBoundingBox = BoundingBox.fromCenter(preferredX, preferredY, width, height)

  const boundingBox = findClosestAvailableBoundingBox(preferredBoundingBox, boundingBoxes, labelPadding)
  const boundingBoxCenter = boundingBox.center()

  ctx.fillStyle = label.color
  ctx.fillRect(boundingBox.left, boundingBox.top, boundingBox.width, boundingBox.height)

  ctx.textBaseline = 'middle'
  ctx.fillStyle = 'white'
  ctx.fillText(label.text, boundingBoxCenter.x, boundingBoxCenter.y)

  return boundingBox
}

const drawLabels = (ctx, labels, imagePadding, imageWidth, imageHeight, labelPadding) => {
  const boundingBoxes = []

  ctx.globalAlpha = 1.0

  roundedLabelValue(labels).forEach((label) => {
    boundingBoxes.push(
      placeLabel(ctx, imagePadding, imageWidth, imageHeight, labelPadding, label, boundingBoxes)
    )
  })
}

export default drawLabels
