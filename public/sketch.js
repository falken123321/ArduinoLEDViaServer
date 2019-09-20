const socket = io();

function setup() {
    createCanvas(400, 400);
    background(225);

    socket.on('positionEvent', newPositionMessage);


  var fillColor = 0;
  var mapPlacedX = 0;
  var mapPlacedY = 0;

    for(var i = 0; i < 200; i++) {
    fill(fillColor,0,fillColor);
    fillColor += 1.5;
    noStroke();
    rect(mapPlacedX,mapPlacedY,30,30);
    mapPlacedX += 30;
    if (mapPlacedX >= 400) {
      mapPlacedX = 0;
      mapPlacedY += 30;
    }
 }
}

  
  
  function newPositionMessage(posData) {
    console.log('Got: ')
    console.log(posData);
    newPoint(posData);
  }
  
  function draw() {


  }

  function newPoint(pos) {

    fill(255,0,0);
    circle(pos.x, pos.y, 10);
  }

  function mouseDragged() {
    const y = mouseY;
    const x = mouseX;

    fill(0,255,0);
    circle(mouseX,mouseY,10);
 

    let pos = {
      x: x,
      y: y,
    }
    console.log(pos);
    socket.emit('positionEvent',pos);

  }