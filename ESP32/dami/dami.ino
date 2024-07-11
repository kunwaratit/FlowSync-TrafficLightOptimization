#include <WiFi.h>
#include <HTTPClient.h>
#define BLYNK_PRINT Serial
#define BLYNK_TEMPLATE_ID "TMPL6lpYtL5DG"
#define BLYNK_TEMPLATE_NAME "Check"

#include <ArduinoJson.h>
#include <BlynkSimpleEsp32.h>

char ssid[] = "manjit@vianet";
char pass[] = "manjit459011";
char auth[] = "j5qFQfjs-6ZlD7JnBZafmPu7r63B6GZ6";

const char* serverName = "http://192.168.1.17:5000/timers"; // Replace with your Flask server IP

const int yellow1 = 2;
const int red1 = 4;
const int green1 = 5;
const int red2 = 18;
const int yellow2 = 19;
const int green2 = 21;
const int yellow_time = 1500;
unsigned long greenOnTime;

void setup() {
  Serial.begin(9600);
  pinMode(red1, OUTPUT);
  pinMode(yellow1, OUTPUT);
  pinMode(green1, OUTPUT);
  pinMode(red2, OUTPUT);
  pinMode(yellow2, OUTPUT);
  pinMode(green2, OUTPUT);

  WiFi.begin(ssid, pass);
  while (WiFi.status() != WL_CONNECTED) {
    delay(1000);
    Serial.println("Connecting to WiFi...");
  }
  Serial.println("Connected to WiFi");

  Blynk.begin(auth, ssid, pass);
}

void fetchTimers() {
  if (WiFi.status() == WL_CONNECTED) {
    HTTPClient http;
    http.begin(serverName);
    int httpResponseCode = http.GET();

    if (httpResponseCode > 0) {
      String payload = http.getString();
      Serial.println(httpResponseCode);
      Serial.println(payload);

      StaticJsonDocument<1024> doc;
      DeserializationError error = deserializeJson(doc, payload);

      if (!error) {
        JsonObject obj = doc.as<JsonObject>();
        
        greenOnTime = obj["green_on_time"].as<unsigned long>();

        Serial.println("Fetched timer values:");
        Serial.print("Green On Time: "); Serial.println(greenOnTime);
      } else {
        Serial.print("deserializeJson() failed: ");
        Serial.println(error.f_str());
      }
    } else {
      Serial.print("Error on HTTP request: ");
      Serial.println(httpResponseCode);
    }
    http.end();
  }
}

BLYNK_WRITE(V1) {
  int buttonState = param.asInt();
  if (buttonState == 1) {
    while(true) {
      fetchTimers(); // Fetch timers before using them
      Serial.println(greenOnTime);
      
      digitalWrite(red1, HIGH);
      digitalWrite(green1, LOW);
      digitalWrite(yellow1, LOW);
      digitalWrite(red2, LOW);
      digitalWrite(green2, HIGH);
      digitalWrite(yellow2, LOW);
      delay(greenOnTime - yellow_time);

      digitalWrite(red1, HIGH);
      digitalWrite(green1, LOW);
      digitalWrite(yellow1, LOW);
      digitalWrite(red2, LOW);
      digitalWrite(green2, LOW);
      digitalWrite(yellow2, HIGH);
      delay(yellow_time);

      // 2nd lane
      digitalWrite(green1, HIGH);
      digitalWrite(red1, LOW);
      digitalWrite(yellow1, LOW);
      digitalWrite(red2, HIGH);
      digitalWrite(yellow2, LOW);
      digitalWrite(green2, LOW);
      delay(greenOnTime - yellow_time);

      digitalWrite(red2, HIGH);
      digitalWrite(green2, LOW);
      digitalWrite(yellow2, LOW);
      digitalWrite(red1, LOW);
      digitalWrite(green1, LOW);
      digitalWrite(yellow1, HIGH);
      delay(yellow_time);
    }
  } else {
    digitalWrite(red1, LOW);
    digitalWrite(yellow1, LOW);
    digitalWrite(green1, LOW);
  }
}

BLYNK_WRITE(V2)
{
  int buttonState = param.asInt(); // Getting the state of the button

  if (buttonState == 1)
  {
    digitalWrite(yellow1, HIGH);
    digitalWrite(yellow2, HIGH);
    digitalWrite(red1, LOW);
    digitalWrite(green1, LOW);
    digitalWrite(green2, LOW);
    digitalWrite(red2, LOW);
  }
  else
  {
    digitalWrite(red1, LOW);
    digitalWrite(red2, LOW);
    digitalWrite(green1, LOW);
    digitalWrite(green2, LOW);
    digitalWrite(yellow1, LOW);
    digitalWrite(yellow2, LOW);
  }
}
// emergency
BLYNK_WRITE(V3)
{
  int buttonState = param.asInt(); // Getting the state of the button

  if (buttonState == 1)
  {
    digitalWrite(red1, HIGH);
    digitalWrite(red2, HIGH);
    digitalWrite(yellow1, LOW);
    digitalWrite(green1, LOW);
    digitalWrite(green2, LOW);
    digitalWrite(yellow2, LOW);
  }
  else
  {
    digitalWrite(red1, LOW);
    digitalWrite(red2, LOW);
    digitalWrite(green1, LOW);
    digitalWrite(green2, LOW);
    digitalWrite(yellow1, LOW);
    digitalWrite(yellow2, LOW);
  }
}


void loop() {
  Blynk.run();
}
