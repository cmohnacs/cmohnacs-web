var bgColor = 156;
var fadeRate = 1;

var gridSize = 35;

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(bgColor);
  noStroke();
}

function draw() {

  // Background fades to black
  background(bgColor);
  bgColor -= fadeRate;

  for (var x = gridSize; x <= width - gridSize; x += gridSize) {
    for (var y = gridSize; y <= height - gridSize; y += gridSize) {
      noStroke();
      fill(255);
      rect(x - 1, y - 1, 3, 3);
      stroke(255, 50);
      line(x, y, mouseX, mouseY);
    }
  }
}
