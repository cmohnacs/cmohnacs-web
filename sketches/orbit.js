var bgColor = 156;

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  smooth();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function draw() {
  background(bgColor);

  // lighting
  var locX = mouseX - height / 2;
  var locY = mouseY - width / 2;
  ambientLight(60, 60, 60);
  pointLight(255, 255, 255, locX, locY, 500);

  // material
  ambientMaterial(250);
  fill(250, 0, 0);

  translate(-240, -100, 0);
  push();
  rotation();
  plane(70);
  pop();

  translate(240, 0, 0);
  push();
  rotation();
  box(70, 70, 70);
  pop();

  translate(240, 0, 0);
  push();
  rotation();
  cylinder(30, 200);
  pop();

  translate(-240 * 2, 200, 0);
  push();
  rotation();
  cone(70, 70);
  pop();

  translate(240, 0, 0);
  push();
  rotation();
  torus(70, 20);
  pop();

  translate(240, 0, 0);
  push();
  rotation();
  sphere(70);
  pop();
}

function rotation() {
  rotateZ(frameCount * 0.01);
  rotateX(frameCount * 0.01);
  rotateY(frameCount * 0.01);
}
