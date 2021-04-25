p5.disableFriendlyErrors = true; // disables FES

var img;
var bgColor = 0;

var xOffset, yOffset; // positioning

// POINTS
var numPoints = 10000;
var points = [];
var pointillize;
var pointSizeStart = 10;      //starting size
var pointSizeEnd = 2;         //ending size
var padding = 150;

var swingMax = 65;
var darkness = 10; // r/g/b value for pixels to skip

// FRAME RATE
var fr = 100; //frameRate
var frRefresh = 1000; // refresh rate in ms
var timer = 0;
var frLog = '';

var artImgUrl;

var pa, pt, a;
var yPa, yPt, yA;


function preload() {

  loadMetArt();



  // Select random image from the list
  let imgs = ['mona.jpg', 'pearl.jpg', 'saturn.jpg', 'creation.jpg', 'galilee.jpg'];
  let path = '../media/' + imgs[floor(random(0,imgs.length))];
  console.log('loading: ' + path);
  img = loadImage(path);

}

function setup() {
  createCanvas(windowWidth, windowHeight);

  img.resize(img.width * 0.8, img.height * 0.8);

  xOffset = (windowWidth - img.width) / 2;
  yOffset = (windowHeight - img.height) / 2;

  var x = xOffset;
  var y = yOffset;

  loadPixels();
  frameRate(fr);
  noStroke();
  textAlign(LEFT, TOP);

  background(bgColor);

  yPa = height - 110;
  yPt = height - 80;
  yPd = height - 60;
  yA = height - 25;

  pa = createP(artist);
  pa.position(20, yPa);
  pa.class('art-title');
  pa.style('color', '#696969');
  pa.style('font-size', '18px');

  pt = createP(title);
  pt.position(20, yPt);
  pt.class('art-title');
  pt.style('color', '#696969');
  pt.style('font-size', '13px');
  pt.style('font-style: italic');

  pd = createP(date);
  pd.position(20, yPd);
  pd.class('art-title');
  pd.style('color', '#696969');
  pd.style('font-size', '12px');

  a = createA(artImgUrl, '[ url ]', '_blank');
  a.position(20, yA);
  a.class('art-title');
  a.style('color', '#696969');
  a.style('font-size', '10px');
  a.style('z-index', '20');

  while(points.length < numPoints){
    calcPoint();
  }
  console.log('Num of points generated: ' + points.length);

}

function draw() {

    background(bgColor);

    renderPoint();

    //frameRateCounter();

}

function windowResized () {
  resizeCanvas(windowWidth, windowHeight);

  xOffset = (windowWidth - img.width) / 2;
  yOffset = (windowHeight - img.height) / 2;

  yPa = height - 90;
  yPt = height - 60;
  yA = height - 25;

  pt.position(20, yPt);
  pa.position(20, yPa);
  a.position(20, yA);
  background(bgColor);


}



function loadMetArt () {
  // Select random image from the MET

  const metUrl = 'https://collectionapi.metmuseum.org/public/collection/v1/search?hasImages=true&medium=Paintings&departmentId=11&q=Painting';

  loadJSON(metUrl, function(metRes) {

    console.log('MET COLLECTION:');
    console.log(metRes);

    // Random number from total number of works
    const max = metRes.total-1;
    console.log("Max: "+max);
    const min = 0;
    const random = Math.floor(Math.random() * (max - min + 1)) + min;
    console.log("Random: "+random);
    // Retrieve the
    const picked = metRes.objectIDs[random];
    console.log("Picked: "+picked);

    const artworkUrl = ('https://collectionapi.metmuseum.org/public/collection/v1/objects/' + picked);
    loadJSON(artworkUrl, function(artworkRes) {
      console.log('ARTWORK:');
      console.log(artworkRes);

      artImgUrl = artworkRes.primaryImageSmall;

      console.log('ART IMG:');
      console.log(artImgUrl);

      artist = artworkRes.artistDisplayName;
      title = artworkRes.title;
      date = artworkRes.objectDate;

      console.log(title + ' by ' + artist);
      //img = loadImage('https://cors-anywhere.herokuapp.com/' + artImgUrl);
      img = loadImage('https://colin-cors-proxy.herokuapp.com/' + artImgUrl);

    });
  });
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

  if (pix[0] > darkness && pix[1] > darkness && pix[2] > darkness) {

    pix[3] = random(80,220);    //random alpha range

    var dx = random(), dy = random(), sx = random(0,8), sy = random(0,8);
    points.push( {x: x, y: y, color: pix, size: pointillize, dx: dx, dy: dy, sx: sx, sy: sy});
    //points.push( {x: x + xOffset, y: y + yOffset, color: pix, size: pointillize, dx: dx, dy: dy, sx: sx, sy: sy});
  }

}

function renderPoint() {
  var xDist = abs(mouseX - width/2); //cursor distance from x center
  var yDist = abs(mouseY - height/2); //cursor distance from y center
  var xSwing = map(xDist, 0, width/2, 0.00, swingMax);
  var ySwing = map(yDist, 0, height/2, 0.00, swingMax);
  //var xSwing = map(xDist, 0, width/2 , 150, 0);
  //var ySwing = map(yDist, 0, height/2, 150, 0);
  //var xSwing = map(mouseX, 0, width, 150, 0)

  var t =  millis() * 0.0001;

  for(var i= 0; i < points.length; i++ ) {
      var p = points[i];
      fill(p.color);
      //fill(p.color[0], p.color[1], p.color[2], 120);
      var x = p.x + sin(PI * p.dx + t * p.sx) * xSwing;
      var y = p.y + sin(PI * p.dy + t * p.sy) * ySwing;
      ellipse(x + xOffset, y + yOffset, p.size, p.size);
      //ellipse(x, y, p.size, p.size);
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
