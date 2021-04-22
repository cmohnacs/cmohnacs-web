var bgColor = 156;

var angle = 0.0;
var offsetX = 0;
var offsetY = 0;
var scalar = 30;
var speed = 0.05;
var count = 1;

function setup() {
  createCanvas(windowWidth, windowHeight);
  offsetX = windowWidth / 25;
  offsetY = windowHeight / 12;
  background(bgColor);
}

function draw() {
  var x = offsetX + cos(angle) * scalar;
  var y = offsetY + sin(angle) * scalar;
  for (var i = 1; i < width - offsetX; i += offsetX) {
    for (var j = 1; j < height - offsetY; j += offsetY) {
      if (count % 2 == 0) {
        fill(150, 150, 150, 40);
      } else if (count % 3 == 0) {
        fill(0, 150, 240, 40);
      } else {
        fill(255, 150, 240, 40);
      }
      //console.log(count);
      ellipse(x + i, y + j, 40, 40);
      count += 1;
    }
  }
  if (keyIsPressed) {
    angle += speed;
  } else {
    angle += speed * -1;
  }
}
