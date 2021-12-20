class BoundingBox {
  constructor (top, right, bottom, left) {
    this.top = top
    this.right = right
    this.bottom = bottom
    this.left = left
    this.width = this.right - this.left
    this.height = this.bottom - this.top
  }

  center () {
    return {
      x: this.left + (this.width / 2),
      y: this.top + (this.height / 2)
    }
  }

  collidesPoint (x, y) {
    const xWithin = this.top <= y && this.bottom >= y
    const yWithin = this.left <= x && this.right >= x

    return xWithin && yWithin
  }

  collides (boundingBox) {
    return (
      this.collidesPoint(boundingBox.right, boundingBox.top) ||
      this.collidesPoint(boundingBox.right, boundingBox.bottom) ||
      this.collidesPoint(boundingBox.left, boundingBox.bottom) ||
      this.collidesPoint(boundingBox.left, boundingBox.top) ||
      boundingBox.collidesPoint(this.right, this.top) ||
      boundingBox.collidesPoint(this.right, this.bottom) ||
      boundingBox.collidesPoint(this.left, this.bottom) ||
      boundingBox.collidesPoint(this.left, this.top)
    )
  }

  collidesAny (boundingBoxes) {
    return boundingBoxes.filter((boundingBox) => this.collides(boundingBox)).length
  }
}

BoundingBox.fromCenter = (centerX, centerY, width, height) => {
  const halfHeight = (height / 2)
  const halfWidth = (width / 2)

  return new BoundingBox(
    centerY - halfHeight,
    centerX + halfWidth,
    centerY + halfHeight,
    centerX - halfWidth
  )
}

BoundingBox.offset = (boundingBox, offsetX, offsetY) => {
  return new BoundingBox(
    boundingBox.top + offsetY,
    boundingBox.right + offsetX,
    boundingBox.bottom + offsetY,
    boundingBox.left + offsetX
  )
}

export default BoundingBox
