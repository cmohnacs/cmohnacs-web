
var bgColor = 0;
var bgCircleColor = 156;
var minWin;

var xspacing = 1; // Distance between each horizontal location
var w; // Width of entire wave
var maxwaves = 12; // total # of waves to add together

var theta = 0.0;
var amplitude = new Array(maxwaves); // Height of wave
// Value for incrementing X, to be calculated
// as a function of period and xspacing
var dx = new Array(maxwaves);
// Using an array to store height values
// for the wave (not entirely necessary)
var yvalues;

function setup() {
  createCanvas(windowWidth, windowHeight);
  //frameRate(60);
  colorMode(RGB, 255, 255, 255);
  randomWaves();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  //circleWindow();
  w = width + 16;
  yvalues = new Array(floor(w / xspacing));
}
function draw() {
  background(bgColor);
  //circleWindow();
  //if (frameCount % 50 == 0 ) background(bgColor);
  calcWave();
  renderWave();
}

function circleWindow() {
  background(bgColor);
  ellipseMode(CENTER);
  fill(bgCircleColor);
  minWin = Math.min(windowWidth, windowHeight);
  ellipse(width/2, height/2, minWin, minWin);
}

function randomWaves() {
  w = width + 16;

  for (var i = 0; i < maxwaves; i++) {
    amplitude[i] = random(10, 30);
    var period = random(100, 300); // Num pixels before wave repeats
    dx[i] = (TWO_PI / period) * xspacing;
  }

  yvalues = new Array(floor(w / xspacing));
}

function calcWave() {
  // Increment theta (try different values
  // for 'angular velocity' here
  theta += 0.02;

  // Set all height values to zero
  for (var i = 0; i < yvalues.length; i++) {
    yvalues[i] = 0;
  }

  // Accumulate wave height values
  for (var j = 0; j < maxwaves; j++) {
    var x = theta;
    for (var i = 0; i < yvalues.length; i++) {
      // Every other wave is cosine instead of sine
      if (j % 2 == 0) yvalues[i] += sin(x) * amplitude[j];
      else yvalues[i] += cos(x) * amplitude[j];
      x += dx[j];
    }
  }
}

function renderWave() {
  // A simple way to draw the wave with an ellipse at each location
  //noStroke();
  fill(255);
  //ellipseMode(CENTER);
  stroke(255);
  strokeWeight(10);
  strokeCap(ROUND);
  strokeJoin(ROUND);

  for (var x = 0; x < yvalues.length; x++) {

    /*
    // Change fill inside cirleWindow diameter
    if ((x  > (width/2)-(minWin/2)) && (x  < (width/2)+(minWin/2))) {
      fill(r,g,b,a);
    }
    else fill(255);
    */

    //ellipse(x * xspacing, height/2 + yvalues[x], 4, 4);

    line((x * xspacing) - 1, height/2 + yvalues[x-1], x * xspacing, height/2 + yvalues[x]);
  }
}

function mousePressed() {
  for (var i = 0; i < maxwaves; i++) {
    amplitude[i] = random(10, 30);
    var period = random(70, 300); // Num pixels before wave repeats
    dx[i] = (TWO_PI / period) * xspacing;
  }
}
