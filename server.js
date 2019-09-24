const express = require('express')
const app = express()
 
app.use(express.static('public'))


//Initialize port

const SerialPort = require("serialport");
const Readline = require("@serialport/parser-readline");

// const serialPortName = "/dev/tty-usbserial1"
const serialPortName = "/dev/cu.usbmodem14101";
const port = new SerialPort(serialPortName, function(err) {
  if (err) {
    return console.log("Error: ", err.message);
  }
});

// Pipe the data into another stream (like a parser or standard out)
const parser = port.pipe(new Readline({ delimiter: "\r\n" }));
parser.on("data", console.log);


// app.get('/', function (req, res) {
//   res.send('Hej verden din luder')
// })
 
const server = app.listen(1111);



const socket = require('socket.io');
const io = socket(server)

// io.on('connection', () => {
//     console.log('Got connection');
// })

io.on('connection', newConnection);


function newConnection(socket) {
    console.log(`New connection ${socket.id}`)

    // io.on('positionEvent', (data) => {
    //     console.log(data);
    // })



    socket.on('positionEvent', (data) =>{
        console.log(data);
        socket.broadcast.emit('positionEvent', data);
    
    const colorData = {
        f: 2,
        n: 5,
        r: data[0],
        g: data[1],
        b: data[2],
    };


    function sendCommand(command) {
        port.write(command, function(err) {
          if (err) {
            return console.log("Error on write: ", err.message);
          }
          console.log(`command: '${command}' was sent to ${serialPortName}`);
        });
      }
      const jsonStr = JSON.stringify(colorData);
        sendCommand(jsonStr);
    })

    // function mouseMsg(data) {
    //     socket.broadcast.emit('positionEvent',data);
    //     console.log(data);
    // }
}




