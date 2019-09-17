const express = require('express')
const app = express()
 
app.get('/', function (req, res) {
  res.send('Hej verden din luder')
})
 
app.listen(3000)