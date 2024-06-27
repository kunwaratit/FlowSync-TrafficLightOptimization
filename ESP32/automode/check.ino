https://wokwi.com/projects/401687586009323521

// Define Pin numbers
const int yellow1 = 2;
const int red1 = 4;
const int green1 = 5;
const int red2 = 18;
const int yellow2 = 19;
const int green2 = 21;

void setup()
{
  Serial.begin(9600);

  // Initialize GPIO pins
  pinMode(red1, OUTPUT);
  pinMode(yellow1, OUTPUT);
  pinMode(green1, OUTPUT);
  pinMode(red2, OUTPUT);
  pinMode(yellow2, OUTPUT);
  pinMode(green2, OUTPUT);
}

void loop()
{
  // Example functionality without Blynk
  // Toggle LEDs based on conditions or button presses
  // For demonstration, using a simple delay-based state machine
  
  // Scenario 1: All LEDs on one side green, other side red
  digitalWrite(red1, LOW);
  digitalWrite(yellow1, LOW);
  digitalWrite(green1, HIGH);

  digitalWrite(red2, HIGH);
  digitalWrite(yellow2, LOW);
  digitalWrite(green2, LOW);
  delay(2000);

  // Scenario 2: Yellow on both sides
  digitalWrite(yellow1, HIGH);
  digitalWrite(green1, LOW);

  digitalWrite(red2, LOW);
  digitalWrite(green2, LOW);
  digitalWrite(yellow2, HIGH);
  delay(2000);

  // Scenario 3: All LEDs on one side red, other side green
  digitalWrite(green1, HIGH);
  digitalWrite(red1, LOW);
  digitalWrite(yellow1, LOW);

  digitalWrite(red2, HIGH);
  digitalWrite(yellow2, LOW);
  digitalWrite(green2, LOW);
  delay(2000);

  // Additional scenarios or button-triggered logic can be added here

  // Turn off all LEDs at the end of each loop iteration
  digitalWrite(red1, LOW);
  digitalWrite(yellow1, LOW);
  digitalWrite(green1, LOW);
  digitalWrite(red2, LOW);
  digitalWrite(yellow2, LOW);
  digitalWrite(green2, LOW);

  delay(2000); // Delay between scenarios for clarity
}
