

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

unsigned long previousMillis1 = 0;
unsigned long previousMillis2 = 0;
const long interval1 = 2000; // Interval for the first part
const long interval2 = 5000; // Interval for the second part

int state1 = 0;
int state2 = 0;
bool isButtonPressed = false;

void setup() {
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
BLYNK_WRITE(V1) {
  int buttonState = param.asInt(); // Getting the state of the button
  isButtonPressed = (buttonState == 1);
}

void loop() {
  Blynk.run();

  if (isButtonPressed) {
    unsigned long currentMillis = millis();

    // Program for red1 and green1
    if (currentMillis - previousMillis1 >= interval1) {
      previousMillis1 = currentMillis;
      state1 = (state1 + 1) % 3;

      switch (state1) {
        case 0:
          digitalWrite(red1, HIGH);
          digitalWrite(green1, LOW);
          digitalWrite(yellow1, LOW);
          break;
        case 1:
          digitalWrite(yellow1, HIGH);
          digitalWrite(red1, LOW);
          digitalWrite(green1, LOW);
          break;
        case 2:
          digitalWrite(green1, HIGH);
          digitalWrite(red1, LOW);
          digitalWrite(yellow1, LOW);
          break;
      }
    }

    // Program for green2 and red2
    if (currentMillis - previousMillis2 >= interval2) {
      previousMillis2 = currentMillis;
      state2 = (state2 + 1) % 3;

      switch (state2) {
        case 0:
          digitalWrite(green2, HIGH);
          digitalWrite(red2, LOW);
          digitalWrite(yellow2, LOW);
          break;
        case 1:
          digitalWrite(yellow2, HIGH);
          digitalWrite(green2, LOW);
          digitalWrite(red2, LOW);
          break;
        case 2:
          digitalWrite(red2, HIGH);
          digitalWrite(green2, LOW);
          digitalWrite(yellow2, LOW);
          break;
      }
    }
  } else {
    // Turning off all LEDs when the button is not pressed
    digitalWrite(red1, LOW);
    digitalWrite(yellow1, LOW);
    digitalWrite(green1, LOW);
    digitalWrite(red2, LOW);
    digitalWrite(yellow2, LOW);
    digitalWrite(green2, LOW);
  }
}
