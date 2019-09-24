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
  /*
  for (int i = 0; i <= 10; i++) {
  strip.setPixelColor(i,RColor,BColor,GColor);  
  }
  strip.show();
  */
  
  parseCommands();
  
  if (choosenFunction == 0) {
    pinNumber++;
    if(pinNumber >= 10) {
      pinNumber = 0;
    }    
  }
  
  if(choosenFunction == 2) {
    strip.fill(strip.Color(RColor,GColor,BColor));
  }
  
  if(choosenFunction == 1) {
    strip.clear();
    strip.setPixelColor(pinNumber,RColor,GColor,BColor);  
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

 
  

  
 
