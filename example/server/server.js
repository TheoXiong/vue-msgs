const express = require('express')
const app = express()
const path = require('path')

app.use(express.static(path.resolve(__dirname, '../public/')))

const server = app.listen('8081', () => {
  const host = server.address().address
  const port = server.address().port
  console.log('访问地址为 http://%s:%s', host, port)
})
