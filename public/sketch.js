
const socket = io();

// function setup() {
//     createCanvas(400, 400);
//     background(225);

//     socket.on('positionEvent', newPositionMessage);


//   var fillColor = 0;
//   var fillColor2 = 255;
//   var mapPlacedX = 0;
//   var mapPlacedY = 0;

//     for(var i = 0; i < 200; i++) {
//     fill(fillColor,0,fillColor);
    
//     fillColor += 1.1;
 
    
//     rect(mapPlacedX,mapPlacedY,30,30);
//     mapPlacedX += 30;
//     if (mapPlacedX >= 400) {
//       mapPlacedX = 0;
//       mapPlacedY += 30;
//     }
//  }
// }

let colorPicked;
  
function setup() {
  createCanvas(400,400);
  background(200);
}  

  function newPositionMessage(posData) {
    console.log('Got: ')
    console.log(posData);
    newPoint(posData);
  }


  function preload() {
    img = loadImage("wheel-5-ryb.png");
  }

  function draw() {
    image(img, 0, 0, 400, 400);

    if(mouseIsPressed) {
      colorPicked = get(mouseX,mouseY);
      socket.emit('positionEvent',colorPicked);
      console.log(colorPicked);
  }
  
  }

  // var enemyX = 200;
  // var enemyY = 200;
  // function draw() {
    
  //   for(var i = 0; i < 800; i++) {
  //     noStroke();
  //     fill(0,random(255),random(255));
  //   enemyX += random(-2,2);
  //   enemyY += random(-2,2);
   

  //   if (enemyX > 400) {
  //     enemyX = 0;
  //   } 

  //   if (enemyX < 0) {
  //     enemyX = 400;
  //   }

  //   if (enemyY > 400) {
  //     enemyY = 0;
  //   } 

  //   if (enemyY < 0) {
  //     enemyY = 400;
  //   }
  //   ellipse(enemyX,enemyY,7,7);
  // }
  // }







  // function newPoint(pos) {

  //   fill(255,0,0);
  //   ellipse(pos.x, pos.y, 30,30);
  // }

  // function mouseDragged() {
  //   const y = mouseY;
  //   const x = mouseX;
    
  //   fill(0,255,0);
  //   ellipse(mouseX,mouseY,30 ,30);
 

  //   let pos = {
  //     x: x,
  //     y: y,
  //   }
  //   console.log(pos);
   

  //}