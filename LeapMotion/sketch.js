// our Leap motion hand sensor controller object (instantiated inside of 'setup');
var leapController;

// our output div (see the HTML file);
var outputDiv;

var tipDiv;

function setup() {
  createCanvas(800, 600);
  
  // grab a connection to our output div
  outputDiv = select('#output');
  tipDiv = document.querySelector("#tip_div");

  // set up our leap controller
  leapController = new Leap.Controller({
    enableGestures: true
  });

  // every time the Leap provides us with hand data we will ask it to run this function
  leapController.loop( handleHandData );
}

function draw() {

}

// this function runs every time the leap provides us with hand tracking data
// it is passed a 'frame' object as an argument - we will dig into this object
// and what it contains throughout these tutorials
function handleHandData(frame) {
  
  // dump all the info we know about this frame to an HTML element
  console.log("hey");

  var all_data = outputDiv.html(frame.dump());
  // var tips = document.getElementById('.hands');
  if (frame.pointables.length > 0){
      let finger1 = frame.pointables[0].tipPosition;
      tipDiv.innerHTML = finger1[0];
    // finger1sphere.setPosition(finger1.x, finger1.y, finger1.z)
  }



  // var tipPos = selectAll('btipPosition');
  console.dir(frame.pointables);
  // tipDiv.innerHTML = JSON.stringify(frame.pointables);

  // console.log(tips);

}