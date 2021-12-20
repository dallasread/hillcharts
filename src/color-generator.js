const COLORS = ['#FF7875', '#5ABBCA', '#C384C0', '#F7C164', '#777BB3']

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
