import express from 'express'
import cors from 'cors'
import canvas from 'canvas'
import respondWithImage from './respond-with-image.js'
import drawHill from './draw-hill.js'
import drawDivider from './draw-divider.js'
import drawDividerWords from './draw-divider-words.js'
import drawLabels from './draw-labels.js'

const app = express()

app.use(cors())

app.get('/', (req, res) => {
  const width = 1024
  const height = 350
  const padding = 50
  const color = '#666'
  const dividerAlpha = 0.65

  const img = canvas.createCanvas(width, height)
  const ctx = img.getContext('2d')

  drawHill(ctx, padding, width, height, color)
  drawDivider(ctx, padding, width, height, color, dividerAlpha)
  drawDividerWords(ctx, padding, width, height, color, dividerAlpha)
  drawLabels(req.query)

  respondWithImage(res, img)
})

app.listen(process.env.PORT || 3000)
