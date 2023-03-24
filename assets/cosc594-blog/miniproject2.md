---
title: "mgProject 2: \"Interactive Input/Output with Low-Tech\""
description: "Brief description here"
date: "2023/03/30"
written: "March 20, 2023"
edited: "March 23, 2023"
status: ""
haslink: false
link: ""
---
### Intro
The goal of this project was to create ... (will fill in when done)

---

### Reference Links
1. [(none yet)](link)

---

#### 03/20/2023
Today, we brainstormed and came up with a list of as many low-tech inputs and outputs as we could, in addition to what functionality our final product might have in general:

<figure class='text-center'>
  <img width='500px' height='500px' src='/images/cosc594-blog/miniproject2/03-20-brainstorm.jpg' class='mx-auto'/>
  <figcaption>Lots of creative ideas.</figcaption>
</figure>

We easily agreed that some kind of shaking box with conductive sides was the low-tech input idea we wanted to explore further, and we will figure out more details later this week. We definitely need to buy something like copper tape and will maybe use a metal ball on a conductive string (attached to the inside of the box) to get a better capacitive reading. Thinking about the prototype, we imagine a 3D-printed box, perhaps with a place to hold the Arduino. Later, we need to also consider what functionality we want to get out of this box.

---

#### 03/21/2023
We explored more design ideas and potential features based around the shaking box input:
* The string can go to the Arduino through a small hole modeled in the top, and we can secure the string with tape on the outside. The Arduino could go outside of the box.
* Functionality ideas:
  * Rhythm game with 4 sides where you make the ball hit the side of the box corresponding to the display on the LED matrix
  * A game involving rotating the box along a different axis such that the ball rests on one of the sides with copper tape, display on LED matrix
  * Making use of the frequency of the shaking:
    * *Flappy Bird* clone game where the frequency of the shaking determines the player's upward velocity, display on LED matrix
    * Musical output where the frequency of the shaking determines the frequency of the pitch

---

#### 03/23/2023
We pitched our main idea of the shaking box along with the two possible output modes we considered ("gravity-powered gyroscope" and "shaking sensor") to our design critique partner group and got some good feedback. They liked the idea and how there is significant movement involved, making it interactive. However, some of our functionality ideas were too game-focused, and we should keep it simple. That way, the product would function without a full game having to be developed again and displayed properly. All of us agreed upon the musical idea being a good output path to explore further, since it's a simple use of the output but gives us more time to refine and iterate on the system as a whole.

As far as prototypes go, we were unable to get a hold of copper tape, so we could not explore some of the other options like paper circuits and start building prototypes in parallel. We *were* able to test the basic string-ball-copper system today with a multimeter though:

<figure class='text-center'>
  <video width='200px' height='200px' class='mx-auto' muted controls>
    <source src='/images/cosc594-blog/miniproject2/03-23-string-test.mov' type='video/mp4'>
  </video>
  <figcaption>Completing the circuit, where the other end is held against the conductive string (out of frame).</figcaption>
</figure>