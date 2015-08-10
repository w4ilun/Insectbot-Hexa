#define backServo 2
#define midServo 3
#define frontServo 4

#define stepRange 70
#define frontStartPos 50
#define backStartPos 120
#define midStartPos 45

#include <Servo.h>

Servo myBackServo;
Servo myMidServo;
Servo myFrontServo;

void setup()
{
  myBackServo.attach(backServo);
  myMidServo.attach(midServo);
  myFrontServo.attach(frontServo);
}

void loop()
{
  moveForward();
}

void moveForward()
{
  for(int i=0; i<stepRange; i++)
  {
     myFrontServo.write(frontStartPos + i);
     myBackServo.write(backStartPos - stepRange + i);
     myMidServo.write(midStartPos + (stepRange/1.5) - (i/1.5));
     delay(1);
  }
  delay(100);
  for(int i=0; i<stepRange; i++)
  {
     myFrontServo.write(frontStartPos + stepRange - i);
     myBackServo.write(backStartPos - i);     
     myMidServo.write(midStartPos + (i/1.5));
     delay(1);
  }
  delay(100);  
}
