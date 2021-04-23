var img;
var bgColor = 0;

var xOffset, yOffset; // positioning

// POINTS
var numPoints = 6000;
var points = [];
var pointillize;
var pointSizeStart = 30;      //starting size
var pointSizeEnd = 2;         //ending size
var padding = 150;


// FRAME RATE
var fr = 100; //frameRate
var frRefresh = 1000; // refresh rate in ms
var timer = 0;
var frLog = '';

var imgs = ['mona.jpg', 'pearl.jpg', 'saturn.jpg'];

function preload() {
    console.log('loading: ../media/' + imgs[floor(random(0,imgs.length))]);
    img = loadImage('../media/' + imgs[floor(random(0,imgs.length))]);
}

function setup() {
    var cvn = createCanvas(windowWidth, windowHeight);

    xOffset = (windowWidth - img.width) / 2;
    yOffset = (windowHeight - img.height) / 2;

    var x = xOffset;
    var y = yOffset;

    frameRate(fr);
    textAlign(LEFT, TOP);
    noStroke();
    background(bgColor);

    loadPixels();

    //var iRandom = random()

    //for (var i = 0; i < numPoints; i++){
    while(points.length < numPoints){
      calcPoint();
    }
    console.log('Num of points generated: ' + points.length);
}

function draw() {

    background(bgColor);

    renderPoint();

    frameRateCounter();

}

function calcPoint() {
  // Random point size
  //var pointillize = random(pointSizeStart, pointSizeEnd);
  // Reduce point size with count
  pointillize = map(points.length, 0, numPoints, pointSizeStart, pointSizeEnd);

  // Random x, y coordinate
  var x = random(img.width), y = random(img.height);

  // Random from array of pixels


  // get a pixel info
  var pix = img.get(x, y);

  //img.set(x,y, 0);

  if (pix[0] > 20 && pix[1] > 20 && pix[2] > 20) {

    // Modify pixel info, pop art
    //pix[2] = random(0,120);   //random blue range
    //pix[iRandom] = cRandom;
    pix[3] = random(80,220);    //random alpha range

    var dx = random(), dy = random(), sx = random(0,18), sy = random(0,18);
    points.push( {x: x, y: y, color: pix, size: pointillize, dx: dx, dy: dy, sx: sx, sy: sy});
  }

}

function renderPoint() {
  var xDist = abs(mouseX - width/2); //cursor distance from x center
  var yDist = abs(mouseY - height/2); //cursor distance from y center
  var xSwing = map(xDist, 0, width/2, 0.00, 25);
  var ySwing = map(yDist, 0, height/2, 0.00, 25);
  //var xSwing = map(xDist, 0, width/2 , 150, 0);
  //var ySwing = map(yDist, 0, height/2, 150, 0);
  //var xSwing = map(mouseX, 0, width, 150, 0)

  var t =  millis() * 0.0001;

  /*
  var xTintMap = map(xDist, 0, img.width/4, 50, 0);
  var yTintMap = map(yDist, 0, img.width/4, 50, 0);
  var tintMap = xTintMap + yTintMap;
  tint(255, tintMap);

  if (millis() < 10000) {
    milMap = map(millis(), 0, 10000, 0, 1);
    tint(255, tintMap * milMap);
  }
  image(img, xOffset, yOffset);
  */

  for(var i= 0; i < points.length; i++ ) {
      var p = points[i];
      fill(p.color);
      //fill(p.color[0], p.color[1], p.color[2], 120);
      var x = p.x + sin(PI * p.dx + t * p.sx) * xSwing;
      var y = p.y + sin(PI * p.dy + t * p.sy) * ySwing;
      ellipse(x + xOffset, y + yOffset, p.size, p.size);
  }
}

function frameRateCounter () {

  if (millis() >= frRefresh + timer) {
    frLog = floor(frameRate());
    timer = millis();
  }
  // display FPS counter
  fill(156);
  text('FPS: ' + frLog, 10, 10);
}
