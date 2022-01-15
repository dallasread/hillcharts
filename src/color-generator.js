const COLORS = [
  '#FF7875',
  '#5ABBCA',
  '#C384C0',
  '#777BB3',
  '#0071BC',
  '#18c694',
  '#ee9c53'
]

class ColorGenerator {
  constructor () {
    this.colorIndex = -1
  }

  random () {
    this.colorIndex++

    if (!COLORS[this.colorIndex]) {
      this.colorIndex = 0
    }

    return COLORS[this.colorIndex]
  }
}

export default ColorGenerator
