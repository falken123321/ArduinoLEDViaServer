#include <Adafruit_NeoPixel.h>
#include <ArduinoJson.h>


// Test input Json
/* 

{"f": 1,"n": 5, "r": 255, "b": 255, "g": 255 } 

*/


// Which pin on the Arduino is connected to the NeoPixels?
// On a Trinket or Gemma we suggest changing this to 1:
#define LED_PIN   5

// How many NeoPixels are attached to the Arduino?
#define LED_COUNT 10

Adafruit_NeoPixel strip(LED_COUNT, LED_PIN, NEO_GRB + NEO_KHZ800);

DynamicJsonDocument doc(1000);

int RColor;
int GColor;
int BColor;
int pinNumber;
int choosenFunction;
int pinCount;


void setup() {
  Serial.begin(9600);
  Serial.println("Type f: 1/2, to chose your function - 2 Light every light - 1 for lighting one light");
  Serial.println("Type n: 0-9 to choose your pin");
  Serial.println("And type R,b,g: 0-255, to choose your color");
  Serial.println("Ready for commands");
  strip.begin(); 
  strip.setBrightness(255);
}

void loop() {

  
  parseCommands();
  
  if (choosenFunction == 4) {
    strip.clear();
    strip.setPixelColor(pinCount,RColor,GColor,BColor); 
    delay(20); 
    pinCount++;
    if(pinCount >= 10) {
      pinCount = 0;
    }    
    strip.show();
  }
  
  if(choosenFunction == 1) {
    strip.clear();
    strip.setPixelColor(pinNumber,RColor,GColor,BColor);  
  }
  
  if(choosenFunction == 2) {
    strip.fill(strip.Color(RColor,GColor,BColor));
  }
  
  if(choosenFunction == 3) {
    delay(1000);
    strip.setPixelColor(0,random(255),random(255),random(255));
    strip.setPixelColor(1,random(255),random(255),random(255));
    strip.setPixelColor(2,random(255),random(255),random(255));
    strip.setPixelColor(3,random(255),random(255),random(255));
    strip.setPixelColor(4,random(255),random(255),random(255));
    strip.setPixelColor(5,random(255),random(255),random(255));
    strip.setPixelColor(6,random(255),random(255),random(255));
    strip.setPixelColor(7,random(255),random(255),random(255));
    strip.setPixelColor(8,random(255),random(255),random(255));
    strip.setPixelColor(9,random(255),random(255),random(255));
  }
  strip.show();
}

void parseCommands() {
  if (Serial.available() > 0) {
  
    // Deserialize the JSON document
    DeserializationError error = deserializeJson(doc, Serial);
    if(doc["f"]) {
      choosenFunction = doc["f"];
    }
    
    if(doc["n"]) {
      pinNumber = doc["n"];
    }
    
    if(doc["r"] && doc["g"]&& doc["b"]){ 
      RColor = doc["r"];
      GColor = doc["g"];
      BColor = doc["b"];
    }
    
    Serial.print("Got rgb: ");
    serializeJson(doc, Serial);
    Serial.println();
  }

}

 
  

  
 
