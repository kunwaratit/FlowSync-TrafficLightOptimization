#define BLYNK_PRINT Serial
#define BLYNK_TEMPLATE_ID "TMPL6lpYtL5DG"
#define BLYNK_TEMPLATE_NAME "Check"

#include <WiFi.h>
#include <BlynkSimpleEsp32.h>

char ssid[] = "NTFiber-A4E9";
char pass[] = "omVF4hsE";
char auth[] = "j5qFQfjs-6ZlD7JnBZafmPu7r63B6GZ6";

// Defining Pin pin numbers & Names
const int yellow1 = 2;
const int red1 = 4;
const int green1 = 5;
const int red2 = 18;
const int yellow2 = 19;
const int green2 = 21;

const int yellow3 = 22; // Additional set of LEDs
const int red3 = 23;
const int green3 = 25;
const int red4 = 26;
const int yellow4 = 27;
const int green4 = 32;

void setup() {
  Serial.begin(9600);
  Blynk.begin(auth, ssid, pass);

  pinMode(red1, OUTPUT);
  pinMode(yellow1, OUTPUT);
  pinMode(green1, OUTPUT);
  pinMode(red2, OUTPUT);
  pinMode(yellow2, OUTPUT);
  pinMode(green2, OUTPUT);
  
  pinMode(red3, OUTPUT);
  pinMode(yellow3, OUTPUT);
  pinMode(green3, OUTPUT);
  pinMode(red4, OUTPUT);
  pinMode(yellow4, OUTPUT);
  pinMode(green4, OUTPUT);
}

// This function will be called every time the button widget is toggled in the app
BLYNK_WRITE(V1) {
  int buttonState = param.asInt(); // Getting the state of the button
  
  if (buttonState == 1) {
    // Sequence for the first set of LEDs
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
    // Turning off all LEDs in the first set
    digitalWrite(red1, LOW);
    digitalWrite(yellow1, LOW);
    digitalWrite(green1, LOW);
    digitalWrite(red2, LOW);
    digitalWrite(yellow2, LOW);
    digitalWrite(green2, LOW);
  }
}

BLYNK_WRITE(V2) {
  int buttonState = param.asInt(); // Getting the state of the button

  if (buttonState == 1) {
    digitalWrite(yellow1, HIGH);
    digitalWrite(yellow2, HIGH);
    digitalWrite(red1, LOW);
    digitalWrite(green1, LOW);
    digitalWrite(green2, LOW);
    digitalWrite(red2, LOW);
  } else {
    digitalWrite(red1, LOW);
    digitalWrite(red2, LOW);
    digitalWrite(green1, LOW);
    digitalWrite(green2, LOW);
    digitalWrite(yellow1, LOW);
    digitalWrite(yellow2, LOW);
  }
}

BLYNK_WRITE(V3) {
  int buttonState = param.asInt(); // Getting the state of the button

  if (buttonState == 1) {
    digitalWrite(red1, HIGH);
    digitalWrite(red2, HIGH);
    digitalWrite(yellow1, LOW);
    digitalWrite(green1, LOW);
    digitalWrite(green2, LOW);
    digitalWrite(yellow2, LOW);
  } else {
    digitalWrite(red1, LOW);
    digitalWrite(red2, LOW);
    digitalWrite(green1, LOW);
    digitalWrite(green2, LOW);
    digitalWrite(yellow1, LOW);
    digitalWrite(yellow2, LOW);
  }
}

// This function will be called every time the button widget is toggled in the app for the second set of LEDs
BLYNK_WRITE(V4) {
  int buttonState = param.asInt(); // Getting the state of the button

  if (buttonState == 1) {
    // Sequence for the second set of LEDs
    digitalWrite(red3, HIGH);
    digitalWrite(green4, HIGH);
    digitalWrite(yellow3, LOW);
    digitalWrite(green3, LOW);
    digitalWrite(red4, LOW);
    digitalWrite(yellow4, LOW);
    delay(2000);

    digitalWrite(yellow3, HIGH);
    digitalWrite(yellow4, HIGH);
    digitalWrite(red3, LOW);
    digitalWrite(green3, LOW);
    digitalWrite(red4, LOW);
    digitalWrite(green4, LOW);
    delay(5000);

    digitalWrite(green3, HIGH);
    digitalWrite(red4, HIGH);
    digitalWrite(red3, LOW);
    digitalWrite(yellow3, LOW);
    digitalWrite(yellow4, LOW);
    digitalWrite(green4, LOW);
    delay(2000);
  } else {
    // Turning off all LEDs in the second set
    digitalWrite(red3, LOW);
    digitalWrite(yellow3, LOW);
    digitalWrite(green3, LOW);
    digitalWrite(red4, LOW);
    digitalWrite(yellow4, LOW);
    digitalWrite(green4, LOW);
  }
}

BLYNK_WRITE(V5) {
  int buttonState = param.asInt(); // Getting the state of the button

  if (buttonState == 1) {
    digitalWrite(yellow3, HIGH);
    digitalWrite(yellow4, HIGH);
    digitalWrite(red3, LOW);
    digitalWrite(green3, LOW);
    digitalWrite(green4, LOW);
    digitalWrite(red4, LOW);
  } else {
    digitalWrite(red3, LOW);
    digitalWrite(red4, LOW);
    digitalWrite(green3, LOW);
    digitalWrite(green4, LOW);
    digitalWrite(yellow3, LOW);
    digitalWrite(yellow4, LOW);
  }
}

BLYNK_WRITE(V6) {
  int buttonState = param.asInt(); // Getting the state of the button

  if (buttonState == 1) {
    digitalWrite(red3, HIGH);
    digitalWrite(red4, HIGH);
    digitalWrite(yellow3, LOW);
    digitalWrite(green3, LOW);
    digitalWrite(green4, LOW);
    digitalWrite(yellow4, LOW);
  } else {
    digitalWrite(red3, LOW);
    digitalWrite(red4, LOW);
    digitalWrite(green3, LOW);
    digitalWrite(green4, LOW);
    digitalWrite(yellow3, LOW);
    digitalWrite(yellow4, LOW);
  }
}

void loop() {
  Blynk.run();
}
