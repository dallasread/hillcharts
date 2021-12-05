import express from 'express'
import cors from 'cors'
import canvas from 'canvas'

const app = express()
const port = process.env.PORT || 3000

app.use(cors())

const buildImage = (q) => {
  const image = canvas.createCanvas(200, 200)
  const ctx = image.getContext('2d')

  ctx.font = '30px Times'
  ctx.rotate(0.1)
  ctx.fillText(q, 50, 100)

  const text = ctx.measureText(q)
  ctx.strokeStyle = 'rgba(0,0,0,0.5)'
  ctx.beginPath()
  ctx.lineTo(50, 102)
  ctx.lineTo(50 + text.width, 102)
  ctx.stroke()

  return image.toBuffer()
}

const buildParabola = (width = 1024, height = 350) => {
  const image = canvas.createCanvas(width, height)
  const ctx = image.getContext('2d')

  // drawScaled
  // ctx.setTransform(2, 0, 0, 2, -50, -55)
  // drawAll()

  // without scale
  // ctx.setTransform(1, 0, 0, 1, -50, 0)
  drawAll()

  function drawCurve () {
    const padding = 20

    ctx.beginPath()
    ctx.strokeStyle = '#666'
    ctx.lineWidth = 3
    ctx.moveTo(padding, height - padding)
    // // y = mx + b
    ctx.quadraticCurveTo(
      width / 2, -height + (padding * 2), // controls point sets slope out from start and into center
      width - padding, height - padding // center point
    )
    // // ctx.quadraticCurveTo(
    // //   100 + 30 / 2, 100, // control point sets slope out from center and into last point
    // //   100 + 30, 30 // last point
    // // )
    ctx.stroke()
  }

  function drawAll () {
    // points on curve
    //     drawPoint(100 - 30, 30)
    //     drawPoint(100, 100)
    //     drawPoint(100 + 30, 30)
    //
    //     // Control points
    //     drawPoint(100 - 30 / 2, 100, '#00F')
    //     drawPoint(100 + 30 / 2, 100, '#00F')
    //
    //     // Draw line through all points to show slopes
    //     drawLine(100 - 30, 30, 100 - 30 / 2, 100)
    //     drawLine(100 - 30 / 2, 100, 100, 100)
    //     drawLine(100, 100, 100 + 30 / 2, 100)
    //     drawLine(100 + 30 / 2, 100, 100 + 30, 30)

    // Draw curve
    drawCurve()
  }

  function drawPoint (x, y, col = 'red') {
    ctx.fillStyle = col
    ctx.beginPath()
    ctx.arc(x, y, 2, 0, Math.PI * 2)
    ctx.fill()
  }
  function drawLine (x, y, x1, y1, col = '#0A08') {
    ctx.strokeStyle = col
    ctx.beginPath()
    ctx.lineTo(x, y)
    ctx.lineTo(x1, y1)
    ctx.stroke()
  }

  return image.toBuffer()
}

app.get('/', (req, res) => {
  // const img = buildParabola(req.query.q || 'Nothing supplied')
  const img = buildParabola()

  res.writeHead(200, {
    'Content-Type': 'image/png',
    'Content-Length': img.length
  })
  res.end(img)

  // res.send(buildImage(), 'binary')
  // res.set({ 'Content-Type': 'image/png' })
})

app.listen(port)
