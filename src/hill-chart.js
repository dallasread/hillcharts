import Label from './label.js'
import ColorGenerator from './color-generator.js'
import canvas from 'canvas'
import drawHill from './renderer/draw-hill.js'
import drawDivider from './renderer/draw-divider.js'
import drawDividerWords from './renderer/draw-divider-words.js'
import drawLabels from './renderer/draw-labels.js'

const SORT_BY_VALUE = (a, b) => {
  if (a.value < b.value) { return -1 }
  if (a.value > b.value) { return 1 }
  return 0
}

class HillChart {
  constructor (labels) {
    this.labels = this.parseLabels(labels, {})
  }

  parseLabels (rawLabels) {
    const labels = []
    const colorGenerator = new ColorGenerator()

    for (const text in rawLabels) {
      labels.push(
        new Label(text, rawLabels[text], colorGenerator.random())
      )
    }

    return labels.sort(SORT_BY_VALUE)
  }

  render (options) {
    const img = canvas.createCanvas(options.imageWidth, options.imageHeight)
    const ctx = img.getContext('2d')

    drawHill(ctx, options.imagePadding, options.imageWidth, options.imageHeight, options.hillColor)
    drawDivider(ctx, options.imagePadding, options.imageWidth, options.imageHeight, options.hillColor, options.dividerAlpha)
    drawDividerWords(ctx, options.imagePadding, options.imageWidth, options.imageHeight, options.hillColor, options.dividerAlpha)
    drawLabels(ctx, this.labels, options.imagePadding, options.imageWidth, options.imageHeight, options.labelPadding, options.labelSpacing)

    return img.toBuffer()
  }
}

export default HillChart
