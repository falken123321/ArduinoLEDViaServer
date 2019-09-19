const socket = io();

function setup() {
    createCanvas(400, 400);
    background(225);

    socket.on('positionEvent', newPositionMessage);
  }
  
  function newPositionMessage(posData) {
    console.log('Got: ')
    console.log(posData);
    newPoint(posData);
  }
  
  function draw() {
    
    // line(mouseX,mouseY,0,0);
    // line(mouseX,mouseY,400,0);
    // line(mouseX,mouseY,0,400);
    // line(mouseX,mouseY,400,400);
    // line(mouseX,mouseY,200,0);
    // line(mouseX,mouseY,0,200);
    // line(mouseX,mouseY,400,200);
    // line(mouseX,mouseY,200,400);
    
    // circle(mouseX,mouseY,50);   

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