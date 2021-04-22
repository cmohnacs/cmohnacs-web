var bgColor = 156;

// Symmetry corresponding to the number of reflections.
// Change the number for different number of reflections.
var symmetry = 30;

var angle = 360 / symmetry;
//let saveButton, clearButton, mouseButton, keyboardButton;
//let slider;

function setup() {
  createCanvas(windowWidth, windowHeight);
  angleMode(DEGREES);
  background(bgColor);

  /*
  // Creating the save button for the file
  saveButton = createButton('save');
  saveButton.mousePressed(saveFile);

  // Creating the clear screen button
  clearButton = createButton('clear');
  clearButton.mousePressed(clearScreen);

  // Creating the button for Full Screen
  fullscreenButton = createButton('Full Screen');
  fullscreenButton.mousePressed(screenFull);

  // Setting up the slider for the thickness of the brush
  brushSizeSlider = createButton('Brush Size Slider');
  sizeSlider = createSlider(1, 32, 4, 0.1);
  */
}
/*
// Save File Function
function saveFile() {
  save('design.jpg');
}

// Clear Screen function
function clearScreen() {
  background(127);
}

// Full Screen Function
function screenFull() {
  let fs = fullscreen();
  fullscreen(!fs);
}
*/
function draw() {

  symmetry = map(mouseX, 0, width, 2, 30);
  angle = 360 / symmetry;
  //console.log('SYM = ' + symmetry);
  //console.log('ANG = ' + angle);
  translate(width / 2, height / 2);

  if (mouseX > 0 && mouseX < width && mouseY > 0 && mouseY < height) {
    var mx = mouseX - width / 2;
    var my = mouseY - height / 2;
    var pmx = pmouseX - width / 2;
    var pmy = pmouseY - height / 2;

    if (mouseIsPressed) {
      for (var i = 0; i < symmetry; i++) {
        rotate(angle);
        /*
        let sw = sizeSlider.value();
        strokeWeight(sw);
        */
        line(mx, my, pmx, pmy);
        push();
        scale(1, -1);
        line(mx, my, pmx, pmy);
        pop();
      }
    }
  }
}
