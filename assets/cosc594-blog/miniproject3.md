---
title: "mgProject 3: \"IMU, Motors, and such\""
description: "Beverage Buddy: A wearable cup holder that keeps your drink upright!"
date: "2023/04/13"
written: "April 3, 2023"
edited: "April 12, 2023"
status: ""
haslink: false
link: ""
---
### Intro
The goal of this project was to use an IMU to digitize a physical interaction and translate it back into a real-world action with simple motors. Reed and I decided to go down the path of creating something auto-stabilizing by having the motor and IMU move together to maintain a target orientation with a feedback loop. We wanted it to be wearable for more user interactivity, and we settled on a simple cup holder concept.

### Reference Links
1. [2D delta robot idea](https://www.hackster.io/RoboticsEveryDay/2-dimensional-delta-robot-with-servo-motor-arduino-478ddb)
2. [IMU Arduino library](https://github.com/sparkfun/SparkFun_ICM-20948_ArduinoLibrary/)
3. [Attitude and heading reference system (AHRS) Arduino library](https://github.com/arduino-libraries/MadgwickAHRS)
4. [More about PID controllers](https://en.wikipedia.org/wiki/PID_controller)
5. [Demo video](https://www.youtube.com/watch?v=WvlqQQe_DnU)

---

#### 04/03/2023
Today, we brainstormed and came up with a bunch of ways we might use the IMU and the motors that we have. Reed also mentioned that he has an old webcam we might be able to use, so we considered that as well:

<figure class='text-center'>
  <img width='750px' height='750px' src='/images/cosc594-blog/miniproject3/04-03-brainstorm.jpg' class='mx-auto'/>
  <figcaption></figcaption>
</figure>

We were not immediately sure what direction to take this project, but we came up with a plan for next meeting: successfully get readings from the IMU since that is crucial for any working prototype. Then, we could begin to build some designs in parallel from there.

Later today, I came up with another idea: maybe there could be a camera on a hat on your head that would be recording like a third eye (visible on your phone somehow?), and when you tilted your head, the IMU would tell the motor rotate the camera in that direction.

---

#### 04/04/2023
We couldn't meet today, but we did communicate some more about what to do tomorrow, and Reed came across a blog post about a simple 2D delta robot that we might be able to use for a hand-controlled drawing arm using the IMU. We planned to try building a prototype of this to see how it might function and feel, and perhaps the physical model might inspire some ideas.

---

#### 04/05/2023
We were able to make some great progress today!

First, we tried building a mock-up of the drawing robot arms and tested it by holding down the ends of the arms with our fingers and moving the joints around. However, we discovered that it needed to be quite large to get a decent range of motion, so we discarded that idea and moved on to just trying to get IMU readings into our code. We did discover that these micro servos are pretty weak, so in the future we should try building our prototype attachments out of paper, which is low-cost, light, and abundant.

<figure class='text-center'>
  <img width='500px' height='500px' src='/images/cosc594-blog/miniproject3/04-05-robot-prototype.jpg' class='mx-auto'/>
  <figcaption>Getting a feel for how this idea would work.</figcaption>
</figure>

After a bit of reading up on the IMU and its Arduino library, we managed to correctly hook it up to the Arduino (most important detail being that the blue wire goes into A4 and the yellow wire goes into A5) and instantly got readings thanks to the basic tutorial code found [here](https://github.com/sparkfun/SparkFun_ICM-20948_ArduinoLibrary/blob/main/examples/Arduino/Example1_Basics/Example1_Basics.ino). From the output, we learned that it is capable of providing *change in rotation* (measured in degrees per second, DPS) rather than just a "current angle" kind of reading. This is fine, since we can just keep track of the overall net angle in a variable, and this grants us more flexibility should we actually want the actual change directly.

For prototypes, we considered a device that uses a self-balancing motor by taping the IMU to the end of it such that it tries to maintain a target angle relative to the world using a feedback loop to counteract rotation. The first idea that came to mind was something like a cup holder that you could wear on your wrist. We need to keep it lightweight, so it will probably be made out of paper with the "liquid" being crumpled paper or aluminum foil balls to visualize spillage for testing/demo purposes.

---

#### 04/06/2023
We did not meet today, but we each began building our own prototypes separately. Reed chose to bring our self-balancing cup holder idea to life, and I chose to do something with hand controls. Reed shared this base code with me (a simplified version of the tutorial code):

```cpp
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

```cpp
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

```cpp
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

However, there are many minor issues with this in its current state. As long as you rotate the IMU at a "normal," consistent speed, it feels natural. Since I'm just using the rate of change directly, for slower movements the servo won't move as far even though it may have rotated the same amount. You can also still physically rotate out of bounds and that would cause the range of rotation angles that move the servo to shift. But overall, this was a good start and mainly just a quick and dirty solution to help me generate some ideas and use cases. The code can be refined later.

Finally, back to Reed. He got a more complete prototype put together with far more sophisticated code (converting from DPS to degrees like you probably should):

<figure class='text-center'>
  <video width='400px' height='400px' class='mx-auto' muted controls>
    <source src='/images/cosc594-blog/miniproject3/04-06-cup-holder-proto.mp4' type='video/mp4'>
  </video>
  <figcaption></figcaption>
</figure>

> &#10077; What abomination have I brought upon this planet&#10078;  
> \- Reed

```cpp
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

---

#### 04/10/2023
Unfortunately I got sick over the weekend, so we couldn't meet today. We briefly discussed next steps and agreed that the cup holder would be Plan A, and I continued trying to iterate on my idea (IMU attached to something not directly connected to the motor) as a backup while at home. I started considering things other than hands/gloves and found some inspiration: I considered attaching the IMU to the user's head to detect when they sneezed. Upon sneezing, the motors would rotate an arm towards the user, pulling a tissue out of a tissue box. However, I didn't really have the materials to prototype it, and I felt that it wasn't as interactive and fun as this project could be.

---

#### 04/11/2023
Reed went to design critique today and demoed his prototype to our peer group. We got some good feedback that reinforced some of our existing plans and pointed us in a good direction to move forward with refining our design. I obtained some paper coffee cups from my apartment for Reed to replace the literal paper on the device. Now the cup holder snugly fits a variety of containers like another paper coffee cup, soda cans, and bottled water. However, due to the limited weight that the servo can support, they need to be filled with something light or a very small amount of liquid&mdash;further testing required.

I talked to a friend in another group, and he told me about [this Arduino library](https://github.com/arduino-libraries/MadgwickAHRS) that filters the IMU data into nice roll, pitch, and yaw angles that&mdash;in theory&mdash;cause fewer problems and correctly accounts for holonomy, which basically means you can't trick the code into thinking the IMU is pointing the wrong way by physically translating it in weird ways without directly rotating it.

While Reed worked on upgrading the prototype, I integrated this new library into the self-balancing code with the help of [this example](https://github.com/arduino-libraries/MadgwickAHRS/blob/master/examples/Visualize101/Visualize101.ino).

This was the result of the first iteration:

<figure class='text-center'>
  <video width='400px' height='400px' class='mx-auto' muted controls>
    <source src='/images/cosc594-blog/miniproject3/04-11-initial-test.mp4' type='video/mp4'>
  </video>
  <figcaption>At least it's upright?</figcaption>
</figure>

```cpp
#include "ICM_20948.h"
#include <Servo.h>
#include <MadgwickAHRS.h>

#define SERVO_PIN 5

ICM_20948_I2C imu;
Servo servo;
Madgwick filter;

unsigned long microsPerReading, microsPrevious, microsNow;
uint16_t servoAngle = 90;
float roll, pitch, yaw;

void setup() {
  servo.attach(SERVO_PIN);
  servo.write(servoAngle);

  Serial.begin(115200);
  while (!Serial) {}

  Wire.begin();
  Wire.setClock(400000);

  while (1) {
    imu.begin(Wire, 1);
    Serial.print("IMU Status: ");
    Serial.println(imu.statusString());
    if (imu.status == ICM_20948_Stat_Ok) {
      break;
    }
  }

  filter.begin(200); // This many samples per second
  // Initialize variables to pace updates to correct rate
  microsPerReading = 1000000 / 200;
  microsPrevious = micros();
}

void loop() {
  // Check if it's time to read data and update the filter
  microsNow = micros();
  if (imu.dataReady() && microsNow - microsPrevious >= microsPerReading) {
    imu.getAGMT();

    filter.updateIMU(imu.gyrX(), imu.gyrY(), imu.gyrZ(), imu.accX(), imu.accY(), imu.accZ());

    roll = filter.getRoll();
    pitch = filter.getPitch();
    yaw = filter.getYaw();

    if (yaw > 180.0f) {
      servoAngle += 2;
    }
    if (yaw < 180.0f) {
      servoAngle -= 2;
    }

    servo.write(servoAngle);

    Serial.print("Roll: ");
    printFormattedFloat(roll, 3, 3);
    Serial.print("  Pitch: ");
    printFormattedFloat(pitch, 3, 3);
    Serial.print("  Yaw: ");
    printFormattedFloat(yaw, 3, 3);
    Serial.println();

    // Increment previous time, so we keep proper pace
    microsPrevious = microsPrevious + microsPerReading;
  } else {
    //Serial.println("No data");
  }
}
```

Not too bad, but clearly very shaky due to hard-coding a value to correct by, making it repeatedly overshoot for small errors. This is where [PID tuning](https://en.wikipedia.org/wiki/PID_controller) comes in. In this case, we tried using a simple "P loop," where we just use a <u>**p**</u>roportion of the current error value as feedback for the next iteration. Smaller errors mean the motors will move much slower to to correct them to prevent overshooting, and the greater the error, the quicker the motor will try to counteract that "incorrect" movement. Now our `loop()` function looks like this:

```cpp
void loop() {
  // Check if it's time to read data and update the filter
  microsNow = micros();
  if (imu.dataReady() && microsNow - microsPrevious >= microsPerReading) {
    imu.getAGMT();

    filter.updateIMU(imu.gyrX(), imu.gyrY(), imu.gyrZ(), imu.accX(), imu.accY(), imu.accZ());

    roll = filter.getRoll();
    pitch = filter.getPitch();
    yaw = filter.getYaw();

    error = yaw - 180.0f;
    // Here, 0.05 is known as the "proportional term" or K_p
    // It is one of the three parameters you can use to tune the system's behavior
    // (K_i and K_d are technically 0 here)
    servoAngle += 0.05 * error;
    // Don't let the angle continue to increase/decrease forever
    servoAngle = constrain(servoAngle, 0, 180);

    servo.write(servoAngle);

    Serial.print("Roll: ");
    printFormattedFloat(roll, 3, 3);
    Serial.print("  Pitch: ");
    printFormattedFloat(pitch, 3, 3);
    Serial.print("  Yaw: ");
    printFormattedFloat(yaw, 3, 3);
    Serial.print("  Angle: ");
    printFormattedFloat(servoAngle, 3, 3);
    Serial.print("  Error: ");
    printFormattedFloat(error, 3, 3);
    Serial.println();

    // Increment previous time, so we keep proper pace
    microsPrevious = microsPrevious + microsPerReading;
  } else {
    //Serial.println("No data");
  }
}
```

The code seemed pretty sound, but we got some interesting results when testing it:

<figure class='text-center'>
  <video width='400px' height='400px' class='mx-auto' muted controls>
    <source src='/images/cosc594-blog/miniproject3/04-11-second-test.mp4' type='video/mp4'>
  </video>
  <figcaption>Hmmm...</figcaption>
</figure>

If it gets "off," it seems to have a hard time correcting itself, but we haven't figured out what exactly causes this. I also tested it on my end and observed its behavior from the serial output. It's hard to tell what exactly is going on, but I noticed some yaw drift from the initial orientation (not moving the IMU), which surely isn't helping. At one point I got this, which didn't seem right either:

<figure class='text-center'>
  <video width='400px' height='400px' class='mx-auto' muted controls>
    <source src='/images/cosc594-blog/miniproject3/04-11-other-test.mov' type='video/mp4'>
  </video>
  <figcaption></figcaption>
</figure>

Reed also seemed to have an issue where the yaw jumps out of nowhere while the IMU is still. We will investigate more during our meeting tomorrow.

---

#### 04/12/2023
We spent a few hours debugging IMU readings and determined that the sensor just wasn't that great. There were all kinds of drifting values despite being left untouched, and we even tried swapping out IMUs. However, we figured out a few ways to minimize the errors we were seeing in the behavior of our motor by using a couple of simple tricks (see the code below). After some tuning of the speed through the `K_p` value, we ended up with a good enough product, and it actually performs pretty consistently provided that the wearer doesn't rotate their arm in unnatural ways and tries to keep rotation within the axis that the one motor can correct against. Check it out:

<figure class='text-center'>
  <iframe width='100%' height='500px' src='https://www.youtube-nocookie.com/embed/WvlqQQe_DnU' class='mx-auto' frameborder='0' allow='accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share' allowfullscreen></iframe>
  <figcaption>Never spill your drink again while on the move with your Beverage Buddy!</figcaption>
</figure>

---

If you're interested, here's all the code. Enjoy!

###### mgP3.ino
```cpp
#include "ICM_20948.h"
#include <Servo.h>
#include <MadgwickAHRS.h>

#define SERVO_PIN 5

ICM_20948_I2C imu;
Servo servo;
Madgwick filter;

unsigned long microsPerReading, microsPrevious, microsNow;
uint16_t servoAngle = 90;
float roll, pitch, yaw, error, actual = 90;

void setup() {
  servo.attach(SERVO_PIN);
  servo.write(servoAngle);
  delay(1000);

  Serial.begin(115200);
  while (!Serial) {}

  Wire.begin();
  Wire.setClock(400000);

  while (1) {
    imu.begin(Wire, 1);
    Serial.print("IMU Status: ");
    Serial.println(imu.statusString());
    if (imu.status == ICM_20948_Stat_Ok) {
      break;
    }
  }

  filter.begin(200); // This many samples per second
  // Initialize variables to pace updates to correct rate
  microsPerReading = 1000000 / 200;
  microsPrevious = micros();
}

void loop() {
  // Check if it's time to read data and update the filter
  microsNow = micros();
  if (imu.dataReady() && microsNow - microsPrevious >= microsPerReading) {
    imu.getAGMT();

    // Tell the filter to just ignore the accelerometer entirely,
    // since it was causing readings to incorrectly drift
    filter.updateIMU(imu.gyrX(), imu.gyrY(), imu.gyrZ(), 0, 0, 0);

    roll = filter.getRoll();
    pitch = filter.getPitch();
    yaw = filter.getYaw();

    error = yaw - 180.0f;
    error = constrain(error, -10.0f, 10.0f); // Seems to keep it stable

    // Here, 0.1 is known as the "proportional term" or K_p
    // It is one of the three parameters you can use to tune the system's behavior
    // (K_i and K_d are technically 0 here)
    actual += 0.1 * error;
    
    // Don't let the angle continue to increase/decrease forever
    actual = constrain(actual, 0.0f, 180.0f);
    servoAngle = actual;

    servo.write(servoAngle);

    Serial.print("Roll: ");
    printFormattedFloat(roll, 3, 3);
    Serial.print("  Pitch: ");
    printFormattedFloat(pitch, 3, 3);
    Serial.print("  Yaw: ");
    printFormattedFloat(yaw, 3, 3);
    Serial.print("  Angle: ");
    printFormattedFloat(actual, 3, 3);
    Serial.print("  Error: ");
    printFormattedFloat(error, 3, 3);
    Serial.println();

    // Increment previous time, so we keep proper pace
    microsPrevious = microsPrevious + microsPerReading;
  } else {
    //Serial.println("No data");
  }
}

void printFormattedFloat(float val, uint8_t leading, uint8_t decimals)
{
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