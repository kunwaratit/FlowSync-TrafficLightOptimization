#define BLYNK_PRINT Serial
#define BLYNK_TEMPLATE_ID "TMPL6lpYtL5DG"
#define BLYNK_TEMPLATE_NAME "Check"

#include <WiFi.h>
#include <BlynkSimpleEsp32.h>


char ssid[] = "manjit@vianet";
char pass[] = "manjit459011";


char auth[] = "j5qFQfjs-6ZlD7JnBZafmPu7r63B6GZ6";

// Defining Pin  pin numbers & Name
const int yellow1 = 2;
const int red1 = 4;
const int green1 = 5;
const int red2 = 18;
const int yellow2 = 19;
const int green2 = 21;

void setup()
{

  Serial.begin(9600);

  Blynk.begin(auth, ssid, pass);


  pinMode(red1, OUTPUT);
  pinMode(yellow1, OUTPUT);
  pinMode(green1, OUTPUT);
  pinMode(red2, OUTPUT);
  pinMode(yellow2, OUTPUT);
  pinMode(green2, OUTPUT);
}

// This function will be called every time the button widget is toggled in the app
BLYNK_WRITE(V1)
{
  int buttonState = param.asInt(); // Getting the state of the button

  
  if (buttonState == 1) {
    // Turning on all LEDs
    digitalWrite(red1, HIGH);
    digitalWrite(green2, HIGH);
    digitalWrite(yellow1, LOW);
    digitalWrite(green1, LOW);
    digitalWrite(red2, LOW);
    digitalWrite(yellow2, LOW);
    delay(2000);

    digitalWrite(yellow1, HIGH);
    digitalWrite(yellow2, HIGH);
    digitalWrite(red1, LOW);
    digitalWrite(green1, LOW);
    digitalWrite(red2, LOW);
    digitalWrite(green2, LOW);
    delay(5000);

    digitalWrite(green1, HIGH);
    digitalWrite(red2, HIGH);
    digitalWrite(red1, LOW);
    digitalWrite(yellow1, LOW);
    digitalWrite(yellow2, LOW);
    digitalWrite(green2, LOW);
    delay(2000);

  } else {
    // Turning off all LEDs
    digitalWrite(red1, LOW);
    digitalWrite(yellow1, LOW);
    digitalWrite(green1, LOW);
    digitalWrite(red2, LOW);
    digitalWrite(yellow2, LOW);
    digitalWrite(green2, LOW);
  }
}

BLYNK_WRITE(V2){
  int buttonState = param.asInt(); // Getting the state of the button

  if(buttonState ==1){
    digitalWrite(yellow1, HIGH);
    digitalWrite(yellow2, HIGH);
    digitalWrite(red1, LOW);
    digitalWrite(green1, LOW);
    digitalWrite(green2, LOW);
    digitalWrite(red2, LOW);
  }
  else{
    digitalWrite(red1,LOW);
    digitalWrite(red2,LOW);
    digitalWrite(green1,LOW);
    digitalWrite(green2,LOW);
    digitalWrite(yellow1,LOW);
    digitalWrite(yellow2,LOW);
  }
}

BLYNK_WRITE(V3){
  int buttonState = param.asInt(); // Getting the state of the button

  if(buttonState ==1){
    digitalWrite(red1, HIGH);
    digitalWrite(red2, HIGH);
    digitalWrite(yellow1, LOW);
    digitalWrite(green1, LOW);
    digitalWrite(green2, LOW);
    digitalWrite(yellow2, LOW);
  }
   else{
    digitalWrite(red1,LOW);
    digitalWrite(red2,LOW);
    digitalWrite(green1,LOW);
    digitalWrite(green2,LOW);
    digitalWrite(yellow1,LOW);
    digitalWrite(yellow2,LOW);
  }
}

void loop()
{
  Blynk.run();
}
