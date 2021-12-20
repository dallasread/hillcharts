import Label from '../label.js'

const roundToNearest = (value, near) => {
  // return Math.ceil(parseInt(value) / near) * near
  return parseInt(value)
}

const ensureViewableRange = (value) => {
  if (value > 93) {
    value = 93
  } else if (value < 7) {
    value = 7
  }

  return value
}

export default (labels) => {
  return labels.map((label) => {
    return new Label(label.text, ensureViewableRange(roundToNearest(label.value, 10)), label.color)
  })
}
