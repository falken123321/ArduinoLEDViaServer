
const socket = io();


let colorPicked;
var slider;
var sliderPinNumber;

function setup() {
  createCanvas(600,600);
  background(200);
  image(img, 0, 0, 400, 400);
  slider = createSlider(1, 4, 0, 1);
  slider.position(30,450);
  slider.style('width', '80px');

  sliderPinNumber = createSlider(0, 9, 0, 1);
  sliderPinNumber.position(10,90000);
  sliderPinNumber.style('width', '80px');
}  

  function newPositionMessage(posData) {
    console.log('Got: ')
    console.log(posData);
    newPoint(posData);
  }


  function preload() {
    img = loadImage("wheel-5-ryb.png");
  }

  function mouseClicked() {
    var sliderValue = slider.value();
    var sliderPinNumberValue = sliderPinNumber.value();


    
      colorPicked = get(mouseX,mouseY);
      
      console.log(sliderValue);
      const colorData = {
        f: sliderValue,
        n: sliderPinNumberValue,
        r: colorPicked[0],
        g: colorPicked[1],
        b: colorPicked[2],
    };
      socket.emit('positionEvent',colorData);
      
      console.log(colorPicked);
  }
  
  
  function draw() {
    background(200);
    image(img, 0, 0, 400, 400);
    textSize(15);
    text('Choose function (1-4)', 10, 430);

    text('1 for choosen pin, with color',300,430);
    text('2 for full display',300,450);
    text('3 for random color',300,470);
    text('4 for running display(PICK COLOR)',300,490);
    if(slider.value() == 1) {
      text('Choose pin number', 10, 480);
      sliderPinNumber.position(30,500);
    } else {
      sliderPinNumber.position(-90000,500);
    }
  }
 