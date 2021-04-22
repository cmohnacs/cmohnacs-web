var bgColor = 156;
var fadeRate = 1;

var mic;
var amp;
var scl = 1.0;

function setup() {

  // Mimics the autoplay policy
  getAudioContext().suspend();

  createCanvas(windowWidth, windowHeight);
  background(bgColor);

  // Create an audio input and start it
  mic = new p5.AudioIn();
  mic.start();

  // Create a new amplitude analyzer and patch into input
  amp = new p5.Amplitude();
  amp.setInput(mic);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function mousePressed() {
  userStartAudio();
}

function draw() {
  // Background fades to black
  background(bgColor);
  bgColor -= fadeRate;

  // The getLevel() method returns values between 0 and 1,
  // so map() is used to convert the values to larger numbers
  scl = map(amp.getLevel(), 0, 1.0, 10, width);
  //console.log('Mic amplitude = ' + amp.getLevel());

  // Draw the circle based on the volume
  fill(255);
  noStroke();
  ellipse(width / 2, height / 2, scl, scl);
}
