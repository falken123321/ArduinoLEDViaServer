
const socket = io();


let colorPicked;
var slider;
var sliderPinNumber;

let centerX;
let centerY;
let mouseClickedX = 0;
let mouseClickedY = 0;
let tempColor;
let colorValue;

function setup() {
  createCanvas(600,600);
  background(200);
  
  slider = createSlider(1, 4, 0, 1);
  slider.position(30,650);
  slider.style('width', '80px');

  sliderPinNumber = createSlider(0, 9, 0, 1);
  sliderPinNumber.position(10,90000);
  sliderPinNumber.style('width', '80px');

  createCanvas(600, 800);
  centerX = 300;
  centerY = 300;
  tempColor = color(255,255,255);

  

}  

  function newPositionMessage(posData) {
    console.log('Got: ')
    console.log(posData);
    newPoint(posData);
  }

  
  
  function draw() {

    let d = int(dist(centerX,centerY,mouseX,mouseY));
  d = constrain(d,0,255);
   translate(width / 2, height / 2);
  let a = atan2(mouseY - height / 2, mouseX - width / 2);
  translate(-width / 2, -height / 2);  
  a *= 180/PI;
  if (a<0) {
    a+= 360;
  }
  
  let saturation = d;
  let brightness = 255;
  colorMode(HSB, 255);
  let hueValue = map(a,0,360,0,255);
  colorValue = color(hueValue, saturation,brightness);
  if(mouseY <= centerY+255) {
    background(220);
    fill(0);
    text(d+" pixels",10,20);
    text(int(a)+"°",10,40);
    text("colorValue",10,60);
    text("Red: " +int(red(colorValue)),10,80);
    text("Green: " +int(green(colorValue)),10,100);
    text("Blue: " +int(blue(colorValue)),10,120);
    //Draw


    fill(colorValue);
    line(centerX,centerY,mouseX,mouseY);
    ellipse(mouseX,mouseY,50,50);
    //mouse last Clicked
    fill(tempColor);
    line(mouseClickedX,mouseClickedY,centerX,centerY);
    ellipse(centerX,centerY,25,25); 
    ellipse(mouseClickedX,mouseClickedY,25,25);
    rect(width-70,20,50,50);
    fill(255);
    textSize(15);
    text('Choose function (1-4)', 10, 640);
    text('1 for choosen pin, with color',300,630);
    text('2 for full display',300,650);
    text('3 for random color',300,670);
    text('4 for running display(PICK COLOR)',300,690);


  }
  if(slider.value() == 1) {
    text('Choose pin number', 10, 690);
    sliderPinNumber.position(30,700);
  } else {
    sliderPinNumber.position(-90000,500);
  }
  fill(255,0);
  circle(300,300,255*2,255*2);
  }

  function mouseClicked() {
    if(mouseY <= centerY+300) {
      mouseClickedX = mouseX;
      mouseClickedY = mouseY;
      tempColor = colorValue;
    }

    var sliderValue = slider.value();
    var sliderPinNumberValue = sliderPinNumber.value();



    
      console.log(sliderValue);
      const colorData = {
        f: sliderValue,
        n: sliderPinNumberValue,
        r: red(colorValue),
        g: green(colorValue),
        b: blue(colorValue),
    };
      socket.emit('positionEvent',colorData);

      
  }
 