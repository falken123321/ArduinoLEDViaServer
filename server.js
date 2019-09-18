const express = require('express')
const app = express()
 
app.use(express.static('public'))

// app.get('/', function (req, res) {
//   res.send('Hej verden din luder')
// })
 
const server = app.listen(3000)

const socket = require('socket.io');
const io = socket(server)

// io.on('connection', () => {
//     console.log('Got connection');
// })

io.on('connection', newConnection);


function newConnection(socket) {
    console.log(`New connection ${socket.id}`)
}