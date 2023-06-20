let size = 900;
let gridSize = 3;
let boxSize = 550 / gridSize;
let streetNames = [
  "Peckham Road",
  "Lilford Road",
  "Sydney Road",
  "Warner Road",
  "Loughborough Road",
  "Landor Road",
  "Carew Road",
  "Robsart Street",
  "Clapham High Street"
];
let numberOfTrees = [8, 2, 2, 21, 11, 13, 15, 8, 9];
let soundLevels = [85.7, 71.1, 80.8, 83.2, 79.4, 83.3, 71.1, 77.5, 86.4];

let sounds = [];
let currentlyPlaying = null;


function preload() {
  for (let i = 0; i < streetNames.length; i++) {
    let soundFile = loadSound(`IMG_6005.MP3`); //SOUND OF ME WALKING 1
    sounds.push(soundFile);
  }
}


function setup() {
  createCanvas(windowWidth, windowHeight);
  for (let i = 0; i < sounds.length; i++) {
    sounds[i].setVolume(map(soundLevels[i], 70, 86.4, 0, 1));
  }
}

function draw() {
  background(255);
  
  for (let i = 0; i < gridSize; i++) {
    for (let j = 0; j < gridSize; j++) {
      let x = i * boxSize;
      let y = j * boxSize;
      let streetIndex = i * gridSize + j;
      let length = calculateTreeLength(numberOfTrees[streetIndex]/1.5);
      drawTree(x, y, (boxSize +50), length);
      drawStreetName(x, y, boxSize, streetNames[streetIndex]);
    }
  }

  noLoop();
}


function mouseClicked() {
  let clickedRow = floor(mouseY / boxSize);
  let clickedCol = floor(mouseX / boxSize);
  let streetIndex = clickedRow * gridSize + clickedCol;
  
  if (streetIndex >= 0 && streetIndex < sounds.length) {
    sounds[streetIndex].play();
    currentlyPlaying = sounds[streetIndex];
  }
}


function keyPressed() {
  if (keyCode === 32 && currentlyPlaying !== null && currentlyPlaying.isPlaying()) {
    currentlyPlaying.stop();
  }
}

function drawTree(x, y, boxSize, length) {
  let startPoint = [x + boxSize / 2, y + boxSize];
  let weight = 10;
  strokeWeight(weight);
  //stroke(30);
  let branchAngle = PI / 2;
  branch(startPoint, weight, length, branchAngle);
}

function calculateTreeLength(numTrees) {
  // Adjust this formula to determine the tree length based on the number of trees
  return map(numTrees, 2, 21, 15, 60);
}

function drawStreetName(x, y, boxSize, streetName) {
  textSize(14);
  textAlign(CENTER+0.001);
  fill(0);
  text(streetName, x + boxSize / 2, y + boxSize + 70);
}

function branch(startPoint, weight, length, angle) {
  let x1 = startPoint[0] + length * cos(angle);
  let y1 = startPoint[1] - length * sin(angle);
  let endpoint = [x1, y1];

  strokeWeight(weight);
  line(startPoint[0], startPoint[1], endpoint[0], endpoint[1]);

  let angleMax = angle + (PI / 4);
  let angleMin = angle - PI / 4;
  let angleDiff = randomBetween(0, angleMax - angleMin - (PI / 16));
  let angle1 = angleMax - angleDiff / 2;
  let angle2 = angleMin + angleDiff / 2;
  let newWeight = randomBetween(weight * 0.6, weight * 0.8);
  let newLength = randomBetween(length * 0.73, length * 0.88);

  if (newLength < 3) {
    return;
  }

  branch(endpoint, newWeight, newLength, angle1);
  branch(endpoint, newWeight, newLength, angle2);
}

function randomBetween(low, high) {
  return random(high - low) + low;
}
