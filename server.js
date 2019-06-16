const express = require('express')
const { join } = require('path')
const app = express()
const PORT = process.env.PORT || 3001

app.use(express.static(join(__dirname, 'client', 'build')))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

require('./model')
require('./routes')(app)

require('./config').sync()
.then(_ =>app.listen(PORT))
.catch(e => console.log(e))
