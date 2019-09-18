import { fips } from "crypto";

const socket = io();

function setup() {
    createCanvas(400, 400);
  
  }
  
 
  
  function draw() {
    background(220);    
    
    fill(random(255),random(255),random(255))
    
    line(mouseX,mouseY,0,0);
    line(mouseX,mouseY,400,0);
    line(mouseX,mouseY,0,400);
    line(mouseX,mouseY,400,400);
    line(mouseX,mouseY,200,0);
    line(mouseX,mouseY,0,200);
    line(mouseX,mouseY,400,200);
    line(mouseX,mouseY,200,400);
    circle(mouseX,mouseY,50);    

  }