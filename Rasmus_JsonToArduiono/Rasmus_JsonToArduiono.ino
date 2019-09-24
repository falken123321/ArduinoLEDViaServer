#include <ArduinoJson.h>



// Allocate the JSON document

//

// Inside the brackets, 200 is the capacity of the memory pool in bytes.

// Don't forget to change this value to match your JSON document.

// Use arduinojson.org/v6/assistant to compute the capacity.

//  StaticJsonDocument<200> doc;



// StaticJsonDocument<N> allocates memory on the stack, it can be

// replaced by DynamicJsonDocument which allocates in the heap.

//

DynamicJsonDocument doc(200);



int blinkDelay = 1000;



void setup() {

  // initialize digital pin LED_BUILTIN as an output.

  pinMode(LED_BUILTIN, OUTPUT);



  Serial.begin(9600);

  // wait for serial port to connect. Needed for native USB

  while (!Serial) {

    continue;

  }

  Serial.println("Ready for commands");

}



// test input json

/* 

{"x": 42, "y": 31 }  

 */

 



void loop() {

  myLedControl();

  parseCommands();

}



void parseCommands(){

  // reply only when you receive data:

  if (Serial.available() > 0) {

    // Deserialize the JSON document

    DeserializationError error = deserializeJson(doc, Serial);



    // Test if parsing succeeds.

    if (error) {

      Serial.print(F("deserializeJson() failed: "));

      Serial.println(error.c_str());

      return;

    }



    if(doc["x"]){

      int x = doc["x"];

      Serial.print("got x: ");

      blinkDelay = x;

      Serial.println(x);

    }

    



    Serial.println("I received:");

    serializeJson(doc, Serial);

    Serial.println();

  }

  

}





void myLedControl(){

  // Blink the builtin LED

  digitalWrite(LED_BUILTIN, HIGH);

  delay(blinkDelay);

  digitalWrite(LED_BUILTIN, LOW);

  delay(blinkDelay);

}
