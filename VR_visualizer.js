
async function getData(){
	const response = await fetch('/data', {method: "GET"});
	const data = await response.json();
	console.log("india rocks");
	console.log(data);
}
async function saveData(letter, value){
	const response = await fetch('/data', 
		{method: "POST",
		headers: {"Content-Type": "application/json"},
		body: JSON.stringify({letter,value}),
		});
	console.log(data);
}


// variable to hold a reference to our A-Frame world
let world;

// our Leap motion hand sensor controller object (instantiated inside of 'setup');
var leapController;

// finger tip
let finger1sphere;
let finger2sphere;
let finger3sphere;
let finger4sphere;
let finger5sphere;

// proximal phalangeal
let finger1proxIP;
let finger2proxIP;
let finger3proxIP;
let finger4proxIP;
let finger5proxIP;

// knuckles
let finger1knuckle;
let finger2knuckle;
let finger3knuckle;
let finger4knuckle;
let finger5knuckle;

// distal wrist
let finger1distal;
let finger2distal;
let finger3distal;
let finger4distal;
let finger5distal;

let distal_center;

// finger lines to connect each sphere primitive
let finger1line1;
let finger1line2;
let finger1line3;

let finger2line1;
let finger2line2;
let finger2line3;

let finger3line1;
let finger3line2;
let finger3line3;

let finger4line1;
let finger4line2;
let finger4line3;

let finger5line1;
let finger5line2;
let finger5line3;

// measuring displacement
let tip4_displacement;
let proxIP4_displacement;
// measuring finger tip displacement for classifiers
let finger4tipdisplacement_x;
let finger4tipdisplacement_y;
let finger4tipdisplacement_z;
// measuring finger proxIP displacement for classifiers
let finger4pipdisplacement_x;
let finger4pipdisplacement_y;
let finger4pipdisplacement_z;

// training 
let training = true;
let M_val_array = [];
let N_val_array = [];

// testing 
let prediction;
// getData();

function setup() {
	// no canvas needed
	noCanvas();
	getData();
	// saveData("m", -0.3);


	// construct the A-Frame world
	// this function requires a reference to the ID of the 'a-scene' tag in our HTML document
	world = new World('VRScene');
	console.log(world);

	world.setBackground(0,0,0);
	// set up our leap controller
	leapController = new Leap.Controller({
	enableGestures: true
	});

	// every time the Leap provides us with hand data we will ask it to run this function
	leapController.loop( handleHandData );
	createFingerTips();
	createProxIP();
	createKnuckles();
	// console.log("hey")


	createDistalWrist();
	// createWrist();

	// finger line
	// <a-entity id="finger1" line="start: 0 1 0; end: 2 0 -5; color: red"></a-entity>

	// Then you could use JavaScript to update these properties to connect your nodes.  For example:

	// let finger1 = document.querySelector("#finger1")
	// finger1.line1 = `start: ${​x1} ${​y1} ${​z1}; end: ${​x2} ${​y2} ${​z2}; color: red`;

	// btip to mcp
	finger1line1 = document.createElement("a-entity");
	finger1line1.setAttribute("line", "start: 0 1 0; end: 2 0 -5; color: red");
	document.getElementById("VRScene").appendChild(finger1line1);

	finger1line2 = document.createElement("a-entity");
	finger1line2.setAttribute("line", "start: 0 1 0; end: 2 0 -5; color: red");
	document.getElementById("VRScene").appendChild(finger1line2);

	// finger1line3 = document.createElement("a-entity");
	// finger1line3.setAttribute("line", "start: 0 1 0; end: 2 0 -5; color: red");
	// document.getElementById("VRScene").appendChild(finger1line3);

	// finger 2
	finger2line1 = document.createElement("a-entity");
	finger2line1.setAttribute("line", "start: 0 1 0; end: 2 0 -5; color: green");
	document.getElementById("VRScene").appendChild(finger2line1);

	finger2line2 = document.createElement("a-entity");
	finger2line2.setAttribute("line", "start: 0 1 0; end: 2 0 -5; color: green");
	document.getElementById("VRScene").appendChild(finger2line2);

	finger2line3 = document.createElement("a-entity");
	finger2line3.setAttribute("line", "start: 0 1 0; end: 2 0 -5; color: green");
	document.getElementById("VRScene").appendChild(finger2line3);



	// finger 3
	finger3line1 = document.createElement("a-entity");
	finger3line1.setAttribute("line", "start: 0 1 0; end: 2 0 -5; color: blue");
	document.getElementById("VRScene").appendChild(finger3line1);

	finger3line2 = document.createElement("a-entity");
	finger3line2.setAttribute("line", "start: 0 1 0; end: 2 0 -5; color: blue");
	document.getElementById("VRScene").appendChild(finger3line2);

	finger3line3 = document.createElement("a-entity");
	finger3line3.setAttribute("line", "start: 0 1 0; end: 2 0 -5; color: blue");
	document.getElementById("VRScene").appendChild(finger3line3);

	// finger 4
	finger4line1 = document.createElement("a-entity");
	finger4line1.setAttribute("line", "start: 0 1 0; end: 2 0 -5; color: orange");
	document.getElementById("VRScene").appendChild(finger4line1);

	finger4line2 = document.createElement("a-entity");
	finger4line2.setAttribute("line", "start: 0 1 0; end: 2 0 -5; color: orange");
	document.getElementById("VRScene").appendChild(finger4line2);

	finger4line3 = document.createElement("a-entity");
	finger4line3.setAttribute("line", "start: 0 1 0; end: 2 0 -5; color: orange");
	document.getElementById("VRScene").appendChild(finger4line3);


	// finger 5
	finger5line1 = document.createElement("a-entity");
	finger5line1.setAttribute("line", "start: 0 1 0; end: 2 0 -5; color: cyan");
	document.getElementById("VRScene").appendChild(finger5line1);

	finger5line2 = document.createElement("a-entity");
	finger5line2.setAttribute("line", "start: 0 1 0; end: 2 0 -5; color: cyan");
	document.getElementById("VRScene").appendChild(finger5line2);

	finger5line3 = document.createElement("a-entity");
	finger5line3.setAttribute("line", "start: 0 1 0; end: 2 0 -5; color: cyan");
	document.getElementById("VRScene").appendChild(finger5line3);


	
}

function draw() {
	// console.log("hello");

}


function handleHandData(frame) {

  // naming schema is pulled from the leap-0.6.4.js library
  // when there are fingers visible to the camera, record their positions

  if (frame.pointables.length > 0){

  	// finger 1
    let finger1 = frame.pointables[0];
    // console.log(finger1[0] / 100, finger1[1] / 100, finger1[2] / 100);
    finger1sphere.setPosition(finger1.tipPosition[0] / 100, finger1.tipPosition[1] / 100, finger1.tipPosition[2] / 100);
    finger1proxIP.setPosition(finger1.pipPosition[0] / 100, finger1.pipPosition[1] / 100, finger1.pipPosition[2] / 100);
    finger1knuckle.setPosition(finger1.mcpPosition[0] / 100, finger1.mcpPosition[1] / 100, finger1.mcpPosition[2] / 100);
    // finger1distal.setPosition(finger1.carpPosition[0] / 100, finger1.carpPosition[1] / 100, finger1.carpPosition[2] / 100);


    let x1_1 = finger1.tipPosition[0] / 100;
    let y1_1 = finger1.tipPosition[1] / 100;
    let z1_1 = finger1.tipPosition[2] / 100;

    let x2_1 = finger1.pipPosition[0] / 100;
    let y2_1 = finger1.pipPosition[1] / 100;
    let z2_1 = finger1.pipPosition[2] / 100;

    let x3_1 = finger1.mcpPosition[0] / 100;
    let y3_1 = finger1.mcpPosition[1] / 100;
    let z3_1 = finger1.mcpPosition[2] / 100;

	// let x4_1 = finger1.carpPosition[0] / 100;
    // let y4_1 = finger1.carpPosition[1] / 100;
    // let z4_1 = finger1.carpPosition[2] / 100;



	finger1line1.setAttribute("line", "start: "+ x1_1 + " "+ y1_1 + " " + z1_1+ "; end: "
								 + x2_1 + " " + y2_1 + " " + z2_1 + "; color: red");
	finger1line2.setAttribute("line", "start: "+ x2_1 + " "+ y2_1 + " " + z2_1+ "; end: "
								 + x3_1 + " " + y3_1 + " " + z3_1 + "; color: red");
	// finger1line3.setAttribute("line", "start: "+ x3_1 + " " + y3_1 + " " + z3_1+ "; end: "
	// 							 + x4_1 + " " + y4_1 + " " + z4_1 + "; color: red");


    // finger 2
    let finger2 = frame.pointables[1];
    finger2sphere.setPosition(finger2.tipPosition[0] / 100, finger2.tipPosition[1] / 100, finger2.tipPosition[2] / 100);
    finger2proxIP.setPosition(finger2.pipPosition[0] / 100, finger2.pipPosition[1] / 100, finger2.pipPosition[2] / 100);
	finger2knuckle.setPosition(finger2.mcpPosition[0] / 100, finger2.mcpPosition[1] / 100, finger2.mcpPosition[2] / 100);
	finger2distal.setPosition(finger2.carpPosition[0] / 100, finger2.carpPosition[1] / 100, finger2.carpPosition[2] / 100);



    let x1_2 = finger2.tipPosition[0] / 100;
    let y1_2 = finger2.tipPosition[1] / 100;
    let z1_2 = finger2.tipPosition[2] / 100;

    let x2_2 = finger2.pipPosition[0] / 100;
    let y2_2 = finger2.pipPosition[1] / 100;
    let z2_2 = finger2.pipPosition[2] / 100;

    let x3_2 = finger2.mcpPosition[0] / 100;
    let y3_2 = finger2.mcpPosition[1] / 100;
    let z3_2 = finger2.mcpPosition[2] / 100;

	let x4_2 = finger2.carpPosition[0] / 100;
    let y4_2 = finger2.carpPosition[1] / 100;
    let z4_2 = finger2.carpPosition[2] / 100;


	finger2line1.setAttribute("line", "start: "+ x1_2 + " "+ y1_2 + " " + z1_2+ "; end: "
								 + x2_2 + " " + y2_2 + " " + z2_2 + "; color: green");
	finger2line2.setAttribute("line", "start: "+ x2_2 + " "+ y2_2 + " " + z2_2+ "; end: "
								 + x3_2 + " " + y3_2 + " " + z3_2 + "; color: green");
	finger2line3.setAttribute("line", "start: "+ x3_2 + " " + y3_2 + " " + z3_2+ "; end: "
								 + x4_2 + " " + y4_2 + " " + z4_2 + "; color: green");

    // finger 3
    let finger3 = frame.pointables[2];
    finger3sphere.setPosition(finger3.tipPosition[0] / 100, finger3.tipPosition[1] / 100, finger3.tipPosition[2] / 100);
    finger3proxIP.setPosition(finger3.pipPosition[0] / 100, finger3.pipPosition[1] / 100, finger3.pipPosition[2] / 100);
	finger3knuckle.setPosition(finger3.mcpPosition[0] / 100, finger3.mcpPosition[1] / 100, finger3.mcpPosition[2] / 100);
	finger3distal.setPosition(finger3.carpPosition[0] / 100, finger3.carpPosition[1] / 100, finger3.carpPosition[2] / 100);


    let x1_3 = finger3.tipPosition[0] / 100;
    let y1_3 = finger3.tipPosition[1] / 100;
    let z1_3 = finger3.tipPosition[2] / 100;

    let x2_3 = finger3.pipPosition[0] / 100;
    let y2_3 = finger3.pipPosition[1] / 100;
    let z2_3 = finger3.pipPosition[2] / 100;

    let x3_3 = finger3.mcpPosition[0] / 100;
    let y3_3 = finger3.mcpPosition[1] / 100;
    let z3_3 = finger3.mcpPosition[2] / 100;

	let x4_3 = finger3.carpPosition[0] / 100;
    let y4_3 = finger3.carpPosition[1] / 100;
    let z4_3 = finger3.carpPosition[2] / 100;

	finger3line1.setAttribute("line", "start: "+ x1_3 + " "+ y1_3 + " " + z1_3+ "; end: "
								 + x2_3 + " " + y2_3 + " " + z2_3 + "; color: blue");
	finger3line2.setAttribute("line", "start: "+ x2_3 + " "+ y2_3 + " " + z2_3+ "; end: "
								 + x3_3 + " " + y3_3 + " " + z3_3 + "; color: blue");
	finger3line3.setAttribute("line", "start: "+ x3_3 + " " + y3_3 + " " + z3_3+ "; end: "
								 + x4_3 + " " + y4_3 + " " + z4_3 + "; color: blue");


    // finger 4
    let finger4 = frame.pointables[3];
    finger4sphere.setPosition(finger4.tipPosition[0] / 100, finger4.tipPosition[1] / 100, finger4.tipPosition[2] / 100);
    finger4proxIP.setPosition(finger4.pipPosition[0] / 100, finger4.pipPosition[1] / 100, finger4.pipPosition[2] / 100);
	finger4knuckle.setPosition(finger4.mcpPosition[0] / 100, finger4.mcpPosition[1] / 100, finger4.mcpPosition[2] / 100);
	finger4distal.setPosition(finger4.carpPosition[0] / 100, finger4.carpPosition[1] / 100, finger4.carpPosition[2] / 100);


    let x1_4 = finger4.tipPosition[0] / 100;
    let y1_4 = finger4.tipPosition[1] / 100;
    let z1_4 = finger4.tipPosition[2] / 100;

    let x2_4 = finger4.pipPosition[0] / 100;
    let y2_4 = finger4.pipPosition[1] / 100;
    let z2_4 = finger4.pipPosition[2] / 100;

    let x3_4 = finger4.mcpPosition[0] / 100;
    let y3_4 = finger4.mcpPosition[1] / 100;
    let z3_4 = finger4.mcpPosition[2] / 100;

	let x4_4 = finger4.carpPosition[0] / 100;
    let y4_4 = finger4.carpPosition[1] / 100;
    let z4_4 = finger4.carpPosition[2] / 100;

	finger4line1.setAttribute("line", "start: "+ x1_4 + " "+ y1_4 + " " + z1_4+ "; end: "
								 + x2_4 + " " + y2_4 + " " + z2_4 + "; color: orange");
	finger4line2.setAttribute("line", "start: "+ x2_4 + " "+ y2_4 + " " + z2_4+ "; end: "
								 + x3_4 + " " + y3_4 + " " + z3_4 + "; color: orange");
	finger4line3.setAttribute("line", "start: "+ x3_4 + " " + y3_4 + " " + z3_4+ "; end: "
								 + x4_4 + " " + y4_4 + " " + z4_4 + "; color: orange");

 	// finger 5
    let finger5 = frame.pointables[4];
    finger5sphere.setPosition(finger5.tipPosition[0] / 100, finger5.tipPosition[1] / 100, finger5.tipPosition[2] / 100);
    finger5proxIP.setPosition(finger5.pipPosition[0] / 100, finger5.pipPosition[1] / 100, finger5.pipPosition[2] / 100);
	finger5knuckle.setPosition(finger5.mcpPosition[0] / 100, finger5.mcpPosition[1] / 100, finger5.mcpPosition[2] / 100);
	finger5distal.setPosition(finger5.carpPosition[0] / 100, finger5.carpPosition[1] / 100, finger5.carpPosition[2] / 100);

  	
  	let x1_5 = finger5.tipPosition[0] / 100;
    let y1_5 = finger5.tipPosition[1] / 100;
    let z1_5 = finger5.tipPosition[2] / 100;

    let x2_5 = finger5.pipPosition[0] / 100;
    let y2_5 = finger5.pipPosition[1] / 100;
    let z2_5 = finger5.pipPosition[2] / 100;

    let x3_5 = finger5.mcpPosition[0] / 100;
    let y3_5 = finger5.mcpPosition[1] / 100;
    let z3_5 = finger5.mcpPosition[2] / 100;

	let x4_5 = finger5.carpPosition[0] / 100;
    let y4_5 = finger5.carpPosition[1] / 100;
    let z4_5 = finger5.carpPosition[2] / 100;

	finger5line1.setAttribute("line", "start: "+ x1_5 + " "+ y1_5 + " " + z1_5+ "; end: "
								 + x2_5 + " " + y2_5 + " " + z2_5 + "; color: cyan");
	finger5line2.setAttribute("line", "start: "+ x2_5 + " "+ y2_5 + " " + z2_5+ "; end: "
								 + x3_5 + " " + y3_5 + " " + z3_5 + "; color: cyan");
	finger5line3.setAttribute("line", "start: "+ x3_5 + " " + y3_5 + " " + z3_5+ "; end: "
								 + x4_5 + " " + y4_5 + " " + z4_5 + "; color: cyan");

	// creating the distal wrist origin
	// use the average x/y/z values generated from the 4 carpometacarpal 

	let avgx = (x4_2 + x4_3 + x4_4 + x4_5) / 4;
	let avgy = (y4_2 + y4_3 + y4_4 + y4_5) / 4;
	let avgz = (z4_2 + z4_3 + z4_4 + z4_5) / 4;

	// record distance between finger 4 tip and "origin"
	finger4tipdisplacement_x = x1_4 - avgx;
	finger4tipdisplacement_y = y1_4 - avgy;
	finger4tipdisplacement_z = z1_4 - avgz;
	tip4_displacement = handleDisplacement(finger4tipdisplacement_x, finger4tipdisplacement_y, finger4tipdisplacement_z);

	// record distance between finger 4 proxIP and "origin"
	finger4pipdisplacement_x = x2_4 - avgx;
	finger4pipdisplacement_y = y2_4 - avgy;
	finger4pipdisplacement_z = z2_4 - avgz;
	proxIP4_displacement = handleDisplacement(finger4pipdisplacement_x, finger4pipdisplacement_y, finger4pipdisplacement_z);

	distal_center.setPosition(avgx, avgy, avgz);


  }
}

function handleDisplacement(delta_x, delta_y, delta_z){
	// displacement = (Math.abs(delta_x) + Math.abs(delta_y) + Math.abs(delta_z)) 3;
	displacement = delta_x + delta_y + delta_z; 

	return displacement;
}


function createFingerTips(){
	// finger 1
	finger1sphere = new Sphere({
		x:0,
		y:0,
		z:-5,
		red:255,
		green:60,
		blue:60,
		radius:0.1
		
	});

	// finger 2
	finger2sphere = new Sphere({
		x:0,
		y:0,
		z:-5,
		red:180,
		green:255,
		blue:100,
		radius:0.1
		
	});

	// finger 3
	finger3sphere = new Sphere({
		x:0,
		y:0,
		z:-5,
		red:79,
		green:156,
		blue:255,
		radius:0.1
		
	});

	// finger 4
	finger4sphere = new Sphere({
		x:0,
		y:0,
		z:-5,
		red:247,
		green:215,
		blue:100,
		radius:0.1
		
	});

	// finger 5
	finger5sphere = new Sphere({
		x:0,
		y:0,
		z:-5,
		red:255,
		green:98,
		blue:187,
		radius:0.1
		
	});

	world.add(finger1sphere);
	world.add(finger2sphere);
	world.add(finger3sphere);
	world.add(finger4sphere);
	world.add(finger5sphere);

}

function createProxIP(){
	finger1proxIP = new Sphere({
		x:0,
		y:0,
		z:-5,
		red:200,
		green:38,
		blue:120,
		radius:0.1
		
	});
	finger2proxIP = new Sphere({
		x:0,
		y:0,
		z:-5,
		red:54,
		green:209,
		blue:56,
		radius:0.1
		
	});
	finger3proxIP = new Sphere({
		x:0,
		y:0,
		z:-5,
		red:44,
		green:119,
		blue:242,
		radius:0.1
		
	});
	finger4proxIP = new Sphere({
		x:0,
		y:0,
		z:-5,
		red:255,
		green:170,
		blue:40,
		radius:0.1
		
	});
	finger5proxIP = new Sphere({
		x:0,
		y:0,
		z:-5,
		red:205,
		green:93,
		blue:232,
		radius:0.1
		
	});

	world.add(finger1proxIP);
	world.add(finger2proxIP);
	world.add(finger3proxIP);
	world.add(finger4proxIP);
	world.add(finger5proxIP);

}

function createKnuckles(){
	finger1knuckle = new Sphere({
		x:0,
		y:0,
		z:-5,
		red:158,
		green:20,
		blue:60,
		radius:0.1
		
	});
	finger2knuckle = new Sphere({
		x:0,
		y:0,
		z:-5,
		red:4,
		green:103,
		blue:28,
		radius:0.1
		
	});
	finger3knuckle = new Sphere({
		x:0,
		y:0,
		z:-5,
		red:50,
		green:50,
		blue:150,
		radius:0.1
		
	});
	finger4knuckle = new Sphere({
		x:0,
		y:0,
		z:-5,
		red:247,
		green:98,
		blue:32,
		radius:0.1
		
	});
	finger5knuckle = new Sphere({
		x:0,
		y:0,
		z:-5,
		red:164,
		green:92,
		blue:219,
		radius:0.1
		
	});

	world.add(finger1knuckle);
	world.add(finger2knuckle);
	world.add(finger3knuckle);
	world.add(finger4knuckle);
	world.add(finger5knuckle);

}

function createDistalWrist(){
	// finger1distal = new Sphere({
	// 	x:0,
	// 	y:0,
	// 	z:-5,
	// 	red:158,
	// 	green:20,
	// 	blue:60,
	// 	radius:0.1
		
	// });
	// console.log(finger2distal);
	finger2distal = new Sphere({
		x:0,
		y:0,
		z:-5,
		red:4,
		green:103,
		blue:28,
		radius:0.1
		
	});
	finger3distal = new Sphere({
		x:0,
		y:0,
		z:-5,
		red:50,
		green:50,
		blue:150,
		radius:0.1
		
	});
	finger4distal = new Sphere({
		x:0,
		y:0,
		z:-5,
		red:247,
		green:98,
		blue:32,
		radius:0.1
		
	});
	finger5distal = new Sphere({
		x:0,
		y:0,
		z:-5,
		red:164,
		green:92,
		blue:219,
		radius:0.1
		
	});
	distal_center = new Sphere({
		x:0,
		y:0,
		z:-5,
		red:255,
		green:255,
		blue:255,
		radius:0.15
		
	});

	// world.add(finger1distal);
	world.add(finger2distal);
	world.add(finger3distal);
	world.add(finger4distal);
	world.add(finger5distal);
	world.add(distal_center);

}

// function compareDisplacement(tip4_displacement, proxIP4_displacement){
// 	console.log("tip: " + tip4_displacement);
// 	console.log("proxip: " + proxIP4_displacement);
// 	// while the finger4 tip is folded in to a fist position
// 	// if ((tip4_displacement > 0.23) && (tip4_displacement < 0.50)){
// 	// 	console.log("fist position");
		
// 	// 	// for categorizing hand signs using the proxIP on finger 4
// 	// 	if ((proxIP4_displacement > 0.28)&&(proxIP4_displacement < 0.35)){
// 	// 		prediction = "N";
// 	// 	}
// 	// 	else if ((proxIP4_displacement > 0.35) && (proxIP4_displacement < 0.41)){
// 	// 		// console.log("M");
// 	// 		prediction = "M";
// 	// 	}
// 	// }
	
// }

function normalize(displacement){
	displacement *= 100;
	// if ((displacement < max) || (displacement > max)){
	// 	return false;
	// }
	return displacement;
}

const median = arr => {
	const mid = Math.floor(arr.length / 2),
	  nums = [...arr].sort((a, b) => a - b);
	return arr.length % 2 !== 0 ? nums[mid] : (nums[mid - 1] + nums[mid]) / 2;
};

function centerData(array, median){
	let deviation = median*0.20; 			//20% deviation on either side
	let min_bound = median - deviation;
	let max_bound = median + deviation;

	for (number in array){
		if ((number < min_bound)||(number > max_bound)){
			// remove value from array
			number = '';
		}
	}
	return array;
}

function predict(m_avg, n_avg, current_distance){
	let m_dist = Math.abs(m_avg - current_distance);
	let n_dist = Math.abs(n_avg - current_distance);

	if (m_dist < n_dist){
		return "M";
	}
	return "N";
}


function keyPressed(){
	// toggle between training and testing
	if (keyIsDown(84)){
		training = !training;
		console.log(training);
	}
	
	if (training){
		// key_pressed = '';
		if (keyIsDown(77)){
			console.log("M");
			let normalized_value = normalize(proxIP4_displacement);
			if (normalized_value){
				// if the value is valid, in range
				saveData("m", normalized_value);
			}
			// saveData("m", proxIP4_displacement);

			
		}
		if (keyIsDown(78)){
			console.log("N");
			let normalized_value = normalize(proxIP4_displacement);
			if (normalized_value){
				// if the value is valid, in range
				saveData("n", normalized_value);
			}		
		}
	}
	
	// console.log("key pressed, screenshot de-activated");
	// print out finger 4 proxIP position relative to the origin

	if (!training){
		if (keyIsDown(32)){
			// press spacebar to get a prediction
			console.log("preparing prediction");
			// data = getData();
			// console.log(data);

			// get arrays
			// m_data = data.m_data;
			// n_data = data.n_data;

			M_AVG_DIST = -38.1054;					//median(m_data);
			M_AVG_DIST = -57.7641;					//median(n_data);

			// remove all entries from array that fall outside of 20% deviation from the avg
			// m_data = centerData(m_data, M_AVG_DIST);
			// m_data = centerData(n_data, N_AVG_DIST);
			let normalized_value = normalize(proxIP4_displacement);
			prediction = predict(M_AVG_DIST, M_AVG_DIST, normalized_value);
			console.log(prediction);



			// find the median of each array
			// compare array values to 

		}
		// while testing, press any key
		// compare recorded value to M values
		// compare recorded value to N values
		// return the letter that corresponds with the closer match
	}
	
	// compareDisplacement(tip4_displacement, proxIP4_displacement)
	// console.log(prediction);
	// prediction = 'none';


	// screenshot - save the content of the canvas
	// document.querySelector('a-scene').components.screenshot.capture('perspective');

}











// end 
