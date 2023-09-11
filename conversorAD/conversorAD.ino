#define requestPin 9
#define ledPin 13
int requestState = 0;
int i = 0;

void setup() {

  pinMode(requestPin, INPUT);
  pinMode(ledPin, OUTPUT);
  Serial.begin(9600);
}

void loop() {
  int pinState = digitalRead(requestPin);

  if (!requestState && pinState) {
    i++;
    Serial.println(i);
    digitalWrite(ledPin, HIGH);
    delay(50);
    digitalWrite(ledPin, LOW);
    requestState = true;
  }

  if (requestState && !pinState) {
    requestState = false;
  }
}
