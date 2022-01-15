import express from 'express'
import cors from 'cors'
import respondWithImage from './respond-with-image.js'
import HillChart from './hill-chart.js'

const app = express()

app.use(cors())

app.get('/', (req, res) => {
  const hillChart = new HillChart(req.query)

  respondWithImage(res, hillChart.render({
    imageWidth: 1440,
    imageHeight: 480,
    imagePadding: 50,
    labelPadding: 7,
    labelSpacing: 3,
    hillColor: '#666',
    dividerAlpha: 0.65
  }))
})

app.listen(process.env.PORT || 3000)
