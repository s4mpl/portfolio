---
title: "mgProject 3: \"IMU, Motors, and such\""
description: "Desc."
date: "2023/03/30"
written: "April 3, 2023"
edited: "April 6, 2023"
status: ""
haslink: false
link: ""
---
### Intro
The goal of this project was to ...

### Reference Links
1. [2D delta robot idea](https://www.hackster.io/RoboticsEveryDay/2-dimensional-delta-robot-with-servo-motor-arduino-478ddb)
2. [IMU Arduino library](https://github.com/sparkfun/SparkFun_ICM-20948_ArduinoLibrary/)

---

#### 04/03/2023
Today, we brainstormed and came up with a bunch of ways we might use the IMU and the motors we have. Reed also mentioned that he has an old webcam we might be able to use, so we considered that as well:

<figure class='text-center'>
  <img width='750px' height='750px' src='/images/cosc594-blog/miniproject3/04-03-brainstorm.jpg' class='mx-auto'/>
  <figcaption></figcaption>
</figure>

We were not immediately sure what direction to take this project, but we came up with a plan for next meeting: successfully get readings from the IMU, since that is crucial to any working prototype. Then we could begin to build some designs in parallel from there.

Later today, I came up with another idea: maybe there could be a camera on a hat on your head that would be recording like a third eye (visible on your phone somehow?), and when you tilted your head, the IMU would tell the motor rotate the camera in that direction.

---

#### 04/04/2023
We couldn't meet today, but we did communicate some more about what to do tomorrow, and Reed came across a blog post about a simple 2D delta robot that we might be able to use for a hand-controlled drawing arm using the IMU. We planned to try building a prototype of this to see how it might function and feel, and perhaps the physical model might inspire some ideas.

---

#### 04/05/2023
We were able to make some great progress today!

First, we tried building a mock-up of the drawing robot arms and tested it by holding down the ends of the arms with our fingers and moving the joints around. However, we discovered that it needed to be quite large to get a decent range of motion, so we discarded that idea and moved on to just trying to get IMU readings into our code. We did discover that these micro servos are quite weak, so in the future we should try building our prototype attachments out of paper, which is low-cost, light, and abundant.

<figure class='text-center'>
  <img width='500px' height='500px' src='/images/cosc594-blog/miniproject3/04-05-robot-prototype.jpg' class='mx-auto'/>
  <figcaption>Getting a feel for how this idea would work.</figcaption>
</figure>

After a bit of reading up on the IMU and its Arduino library, we managed to correctly hook it up to the Arduino (most important detail being that the blue wire goes into A4 and the yellow wire goes into A5) and instantly got readings thanks to the basic tutorial code found [here](https://github.com/sparkfun/SparkFun_ICM-20948_ArduinoLibrary/blob/main/examples/Arduino/Example1_Basics/Example1_Basics.ino). From the output, we learned that it is capable of providing *change in rotation* (measured in degrees per second, DPS) rather than just a "current angle" kind of reading. This is fine, since we can just keep track of the overall net angle in a variable, and this grants us more flexibility should we actually want the actual change directly.

For prototypes, we considered a device that uses a self-balancing motor by taping the IMU to the end of it such that it tries to maintain a target angle relative to the world using a feedback loop to counteract rotation. The first idea that came to mind was something like a cup holder that you could wear on your wrist. We need to keep it lightweight, so it will probably be made out of paper with the "liquid" being crumpled paper or aluminum foil balls to visualize spillage for testing/demo purposes.

---

#### 04/06/2023
We did not meet today, but we each began building our own prototypes separately. Reed chose to bring our self-balancing cup holder idea to life, and I chose to do something with hand controls. Reed shared this base code with me (a simplified version of the tutorial code):

```c
#include "ICM_20948.h"

ICM_20948_I2C myICM;

void setup() {
  Serial.begin(115200);
  while (!Serial) {}

  Wire.begin();
  Wire.setClock(400000);

  while (1) {
    myICM.begin(Wire, 1);
    Serial.print("IMU Status: ");
    Serial.println(myICM.statusString());
    if (myICM.status == ICM_20948_Stat_Ok) {
      break;
    }
  }
}

void loop() {
  if (myICM.dataReady()) {
    myICM.getAGMT();
    Serial.print("Z: ");
    printFormattedFloat(myICM.gyrZ(), 3, 3);
    Serial.println();
  } else {
    Serial.println("No data");
  }
  delay(30);
}

void printFormattedFloat(float val, uint8_t leading, uint8_t decimals) {
  float aval = abs(val);
  if (val < 0)
    Serial.print("-");
  else
    Serial.print(" ");
  for (uint8_t indi = 0; indi < leading; indi++) {
    uint32_t tenpow = 0;
    if (indi < (leading - 1))
      tenpow = 1;
    for (uint8_t c = 0; c < (leading - 1 - indi); c++)
      tenpow *= 10;
    if (aval < tenpow)
      Serial.print("0");
    else
      break;
  }
  if (val < 0)
    Serial.print(-val, decimals);
  else
    Serial.print(val, decimals);
}
```

From here, we both went our separate ways and would share results and insights as we got them.

Reed noticed the gyro seems to be capped at 250 DPS, so when testing his intermediate result, it could get offset when rotating too fast simply because the rotational velocity was getting cut off and not matching the actual change in rotation. Despite this, he got something working decently well:

<figure class='text-center'>
  <video width='400px' height='400px' class='mx-auto' muted controls>
    <source src='/images/cosc594-blog/miniproject3/04-06-balance.mp4' type='video/mp4'>
  </video>
  <figcaption></figcaption>
</figure>

Meanwhile, I got my high-tech glove working:

<figure class='text-center'>
  <video width='750px' height='750px' class='mx-auto' muted controls>
    <source src='/images/cosc594-blog/miniproject3/04-06-glove.mov' type='video/mp4'>
  </video>
  <figcaption>Short wires are annoying.</figcaption>
</figure>

At first it was completely out of control when I was trying to add the raw change directly to my angle&mdash;the *smallest* movements would cause it to rotate way too much:

<figure class='text-center'>
  <video width='400px' height='400px' class='mx-auto' muted controls>
    <source src='/images/cosc594-blog/miniproject3/04-06-raw.mov' type='video/mp4'>
  </video>
  <figcaption>High DPI gaming.</figcaption>
</figure>

```c
void loop() {
  if (myICM.dataReady()) {
    myICM.getAGMT();
    reading = myICM.gyrX();
    Serial.print("X: ");
    printFormattedFloat(reading, 3, 3);
    Serial.println();

    curAngle += reading;
    if(curAngle > 180) curAngle = 180;
    if(curAngle < 0) curAngle = 0;

    angle(curAngle);
  } else {
    Serial.println("No data");
  }
  delay(30);
}
```

I added a deadzone so that sensor fluctuations and tiny movements wouldn't affect the angle, and I scaled down the amount that the DPS contributed to the angle, since it was actually quite a large number. After that, the result was *much* better:

<figure class='text-center'>
  <video width='400px' height='400px' class='mx-auto' muted controls>
    <source src='/images/cosc594-blog/miniproject3/04-06-normalized.mov' type='video/mp4'>
  </video>
  <figcaption></figcaption>
</figure>

```c
void loop() {
  if (myICM.dataReady()) {
    myICM.getAGMT();
    reading = myICM.gyrX();
    Serial.print("X: ");
    printFormattedFloat(reading, 3, 3);
    Serial.println();

    if(fabs(reading) > 30)
      curAngle += reading / 20;
    if(curAngle > 180) curAngle = 180;
    if(curAngle < 0) curAngle = 0;

    angle(curAngle);
  } else {
    Serial.println("No data");
  }
  delay(30);
}
```

However, there are many minor issues with this in its current state. As long as you rotate the IMU at a "normal," consistent speed, it feels natural. Since I'm just using the rate of change, for slower movements the servo won't move as far even though it may have rotated the same amount. You can also still physically rotate out of bounds and that would cause the range of rotation angles that move the servo to shift. But overall, this was a good start and mainly just to help me generate some ideas and use cases. The code can be refined later.

Finally, back to Reed. He got a more complete prototype put together with far more sophisticated code (converting from DPS to degrees like you probably should):

<figure class='text-center'>
  <video width='400px' height='400px' class='mx-auto' muted controls>
    <source src='/images/cosc594-blog/miniproject3/04-06-cup-holder-proto.mp4' type='video/mp4'>
  </video>
  <figcaption></figcaption>
</figure>

> &#10077; What abomination have I brought upon this planet&#10078;  
> \- Reed

```c
#include <Servo.h>
#include "ICM_20948.h"

ICM_20948_I2C myICM;
Servo servo;

void setup() {
  Serial.begin(115200);
  while (!Serial) {}
  Wire.begin();
  Wire.setClock(400000);
  while (1) {
    myICM.begin(Wire, 1);
    Serial.print("IMU Status: ");
    Serial.println(myICM.statusString());
    if (myICM.status == ICM_20948_Stat_Ok) {
      break;
    }
  }
  servo.attach(5);
  servo.write(90);
  delay(1000);
}

unsigned long uptime = 0;
float z_pos = 0.0f;
int servo_angle = 90;

void loop() {
  if (myICM.dataReady()) {
    myICM.getAGMT();
    unsigned long currentTime = millis();
    Serial.print("Z: ");
    float scaled_offset = (currentTime - uptime) / 1000.0f * myICM.gyrZ();
    z_pos += scaled_offset;
    uptime = currentTime;

    printFormattedFloat(z_pos, 4, 2);

    if (z_pos > 2.0f) {
      servo_angle -= 2;
    }
    if (z_pos < -2.0f) {
      servo_angle += 2;
    }

    servo.write(servo_angle);
    Serial.println();
  } else {
    Serial.println("No data");
  }
  delay(15);
}
```
