import express from 'express'
import cors from 'cors'
import canvas from 'canvas'

const app = express()
const port = process.env.PORT || 3000

app.use(cors())

const buildImage = () => {
  const image = canvas.createCanvas(200, 200)
  const ctx = image.getContext('2d')

  ctx.font = '30px Times'
  ctx.rotate(0.1)
  ctx.fillText('Hillcharts!', 50, 100)

  const text = ctx.measureText('Hillcharts!')
  ctx.strokeStyle = 'rgba(0,0,0,0.5)'
  ctx.beginPath()
  ctx.lineTo(50, 102)
  ctx.lineTo(50 + text.width, 102)
  ctx.stroke()

  return image.toBuffer()
}

app.get('/', (req, res) => {
  const img = buildImage(req.query.q || 'Nothing supplied')

  res.writeHead(200, {
    'Content-Type': 'image/png',
    'Content-Length': img.length
  })
  res.end(img)

  // res.send(buildImage(), 'binary')
  // res.set({ 'Content-Type': 'image/png' })
})

app.listen(port)
