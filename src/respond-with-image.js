export default (res, img) => {
  const content = img.toBuffer()

  res.writeHead(200, {
    'Content-Type': 'image/png',
    'Content-Length': content.length
  })

  res.end(content)
}
