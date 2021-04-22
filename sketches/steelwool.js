p5.disableFriendlyErrors = true; // disables FES

var bgColor = 0;
var bgCircleColor = 156;
var minWin;

var speed = 2;
var diameter = 20;
var initalChunkSize = 100000;
var chunkSize = 125;
var x;
var y;

var run = false;

function setup() {
  createCanvas(windowWidth, windowHeight);

  // Initialize starting point (x,y)
  x = width/2;
  y = height/2;

  circleWindow();
  renderCirclesRandom(initalChunkSize);
}

function draw() {
  checkLoop();
  if (isLooping) {
    renderCirclesActive(chunkSize);
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  circleWindow();
}

function circleWindow() {
  background(bgColor);
  ellipseMode(CENTER);
  fill(bgCircleColor);
  minWin = Math.min(windowWidth, windowHeight);
  ellipse(width/2, height/2, minWin, minWin);
}

function renderCirclesRandom(count) {
  for (var i = 0; i < count; i++) {
    if (i % 15000 == 0) {
      randomFill();
    }
    x += random(-speed, speed);
    y += random(-speed, speed);
    x = constrain(x, 0, width);
    y = constrain(y, 0, height);
    ellipse(x, y, diameter, diameter);
  }
}

function renderCirclesActive(count) {
  for (var i = 0; i < count; i++) {
    x += random(-speed, speed);
    y += random(-speed, speed);
    x = constrain(x, 0, width);
    y = constrain(y, 0, height);
    ellipse(x, y, diameter, diameter);
  }
}

function randomFill() {
  speed = random(1,4);
  r = random(255);
  g = random(255);
  b = random(255);
  a = random(255);
  fill(r,g,b,a);
}

function checkLoop() {
  if (run) {
    loop();
  } else {
    noLoop();
  }
}

function mousePressed() {
  randomFill();
  console.log("changing color...");
}

function keyPressed() {
  if (keyCode == 32) {  // if key is SPACE_BAR
    run = !run;
    if (!run) {
      noLoop();
      //background(bgColor);
      console.log("stopping animation...");
    } else {
      loop();
      //background(bgColor);
      console.log("starting animation...");
    }
  }
}

function touchStarted() {
    run = !run;
    if (!run) {
      noLoop();
      //background(bgColor);
      console.log("stopping animation...");
    } else {
      loop();
      //background(bgColor);
      console.log("starting animation...");
    }
}

function touchEnded() {
  randomFill();
  console.log("changing color...");
}
