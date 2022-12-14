const express = require('express')
const router = require('./routes/index')
const { name, version } = require('../package.json')

const server = express()

server.use(express.json({ limit: '10mb'}))
server.use(express.urlencoded({ extended: true }))
server.use(router)

server.listen(80, () => {
  console.log(`Starting ${name}:${version}`)
})
