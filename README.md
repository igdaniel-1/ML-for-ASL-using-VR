# capstoneJS
## Introduction
Learning American Sign Language can be challenging, especially for those who are unable to learn
from an in-person instructor. Although photos and videos of hand signs can help to illustrate
hand shape, 2D media often falls into the pitfalls of partial concealment. By mapping out hand
signs in a 3-dimensional space, users will be able to view each component of a hand sign while
mitigating concealment produced by overlapping fingers, a rotated palm, or other forms of disrupt.
In this work, I address the following question: How can we improve the efficacy of current ASL
Translation technology.<br />
<br />
To answer this question, I first considered what current gaps there were in existing ASL trans-
lation technologies. Many iterations feature a silhouette reading system that uses the shape of the
overall hand as the basis for its input. This form of modelling raised issues when multiple signs
shared similar hand shapes. The two that were most frequently confused were those featuring a
fist-shaped hand shape.<br />
<br />
Once a gap had been found, I analyzed how I could find a solution. Since the silhouette-style
reading system obscured finger positions in front of the palm, due to them being blocked by the
overall shadow, I strove to distinguish the positioning of fingers in front of the palm. My solution:
read the input in 3 dimensions.<br />
<br />
In VR Support for Learning the American Sign Language, I have developed a Virtual Reality
Visualizer to map out a user’s hand in a 3-dimensional VR environment. With this tool built, I
have mapped specific hand positions to hand signs representing two different letters that often
are difficult to distinguish. The letters M and N have been confused with each other in previous
iterations of ASL translators due to factors including finger overlap and similar hand shape. Using
3D input, my system provides more accurate sign distinctions between these letters. This closes
a pre-existing accuracy gap in the field of ASL translation.<br />

## Process
The contributions of my work can be summarized as follows:
* I have developed a Virtual Reality environment using the UltraLeap hardware system in
which my hand’s real-time position can be rendered.
* I have created a back-end for my VR Environment’s web page that stores finger tip positions
while the application is training its data set.
* I have created a classification system for the hand signs stored in my database that returns
the best-matched letter to the front-end.

## Contents
* Visualizer.js : contains the code to set up the VR Visualizer, add/fetch hand data from the back-end, and return the resultant sign determined by the ML Algorithm.
* server.js : passes hand data captured by the visualizer to the MongoDB back-end.
* db.js : holds hand sign data in a MongoDB database which is then used in the ML Algo's training set.

## Set-Up 
This project is relient on the hardware used to capture hand positions. 
The hardware that I used was the UltraLeap camera system. Learn more about this system through it's 
[website](https://www.ultraleap.com/).<br />
<br />
With the proper hardware on hand, the set-up proceeds as follows.

### Software Set-up
* Fork this repo
* Open up your favorite web browser to the index.html at [localhost:8080](localhost:8080). 

### Hardware Set-up
* Calibrate UltraLeap : after plugging the camera into your computer, run the Diagnostic Visualizer.
* Open the index.html on localhost:8080 and make sure you can see your hand moving on the screen.
* If not, unplug the camera and repeat these steps until calibration is complete.
* If facing extensive challenges, consult the Leap [website](https://www.ultraleap.com/).

Now you should be able to see your hand move across the screen! <br />
Train and test the system using these key commands:
* T: toggle between Training mode (default) and Testing mode (after pressing T once).
* N: (TRAINING ONLY) while making the N hand sign with your hand, store your current hand position in the letter N training set.
* M: (TRAINING ONLY) same as N but with the letter M.
* Any key: (TESTING ONLY) while making a hand sign, press any key for the ML Alg to make a prediction as to which letter you're signing.

#### Good luck and happy exploring !!

https://github.com/igdaniel-1/capstoneJS
