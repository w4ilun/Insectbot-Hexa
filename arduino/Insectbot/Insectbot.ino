//SERVO
#define frontServo 4
#define backServo 2
#define midServo 3

#define stepRange 60
#define frontStartPos 120
#define backStartPos 120
#define midStartPos 60

#include <Servo.h>

Servo myFrontServo;
Servo myBackServo;
Servo myMidServo;

//COMMANDS
static const char FORWARD  = 'W';
static const char BACKWARD = 'S';
static const char LEFT     = 'A';
static const char RIGHT    = 'D';
static const char COMMAND  = '#';

char serialChar;
bool commandMode = false;

void setup() {
    myFrontServo.attach(frontServo);
    myBackServo.attach(backServo);
    myMidServo.attach(midServo);
  
    myFrontServo.write(90);
    myBackServo.write(90);
    myMidServo.write(90);
    
    Serial.begin(115200);
}

void loop()
{
    while(Serial.available() > 0){
      serialChar = Serial.read();
      if(commandMode){
        if(serialChar == COMMAND){
          commandMode = false;
        }else{
          commandHandler(serialChar);
        }
      }
      if(serialChar == COMMAND){
        commandMode = true;
      }
    }
}

void commandHandler(char command){
  if(command == FORWARD){
    Serial.write("FORWARD");
    moveForward();
    moveForward();
  }
  if(command == BACKWARD){
    Serial.write("BACKWARD");
    moveBackward();
    moveBackward();
  }
  if(command == LEFT){
    Serial.write("LEFT");
    moveLeft();
    moveLeft();
  }
  if(command == RIGHT){
    Serial.write("RIGHT");
    moveRight();
    moveRight();
  }      
}

void moveForward(){
  for(int i=0; i<stepRange; i++){
    myMidServo.write(midStartPos + i);
    delay(1);
  } 
  for(int i=0; i<stepRange; i++){
    myFrontServo.write(frontStartPos - i);
    myBackServo.write(backStartPos - i);
    delay(1);
  } 
  delay(100);
  for(int i=0; i<stepRange; i++){
    myMidServo.write(midStartPos + stepRange - i);
    delay(1);
  }    
  for(int i=0; i<stepRange; i++){
    myFrontServo.write(frontStartPos - stepRange + i);
    myBackServo.write(backStartPos - stepRange + i);
    delay(1);
  }
  delay(100);  
}

void moveBackward(){
  for(int i=0; i<stepRange; i++){
    myFrontServo.write(frontStartPos - i);
    myBackServo.write(backStartPos - i);
    delay(1);
  }
  for(int i=0; i<stepRange; i++){
    myMidServo.write(midStartPos + i);
    delay(1);
  }  
  delay(100);
  for(int i=0; i<stepRange; i++){
    myFrontServo.write(frontStartPos - stepRange + i);
    myBackServo.write(backStartPos - stepRange + i);
    delay(1);
  }
  for(int i=0; i<stepRange; i++){
    myMidServo.write(midStartPos + stepRange - i);
    delay(1);
  }  
  delay(100);  
}

void moveLeft(){
  for(int i=0; i<stepRange/2; i++){
    myMidServo.write(midStartPos+stepRange/2 + i);
    delay(1);
  } 
  for(int i=0; i<stepRange; i++){
    myFrontServo.write(frontStartPos - i);
    myBackServo.write(backStartPos - i);
    delay(1);
  } 
  delay(100);
  for(int i=0; i<stepRange/2; i++){
    myMidServo.write(midStartPos + stepRange - i);
    delay(1);
  }    
  for(int i=0; i<stepRange; i++){
    myFrontServo.write(frontStartPos - stepRange + i);
    myBackServo.write(backStartPos - stepRange + i);
    delay(1);
  }
  delay(100);  
}

void moveRight(){
  for(int i=0; i<stepRange/2; i++){
    myMidServo.write(midStartPos + i);
    delay(1);
  } 
  for(int i=0; i<stepRange; i++){
    myFrontServo.write(frontStartPos - i);
    myBackServo.write(backStartPos - i);
    delay(1);
  } 
  delay(100);
  for(int i=0; i<stepRange/2; i++){
    myMidServo.write(midStartPos + stepRange/2 - i);
    delay(1);
  }    
  for(int i=0; i<stepRange; i++){
    myFrontServo.write(frontStartPos - stepRange + i);
    myBackServo.write(backStartPos - stepRange + i);
    delay(1);
  }
  delay(100);  
}