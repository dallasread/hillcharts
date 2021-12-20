export default (res, content) => {
  res.writeHead(200, {
    'Content-Type': 'image/png',
    'Content-Length': content.length
  })

  res.end(content)
}
