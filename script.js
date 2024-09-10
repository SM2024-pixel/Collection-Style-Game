//Move the catcher with the left and right arrow keys to catch the falling objects. 

/* VARIABLES */
let catcher, fallingObject;
let score = 0;
let backgroundImg, catcherImg, fallingObjectImg, themeSong;

/* PRELOAD LOADS FILES */
function preload() {
  backgroundImg = loadImage("assets/Cabbage Man.png");
  catcherImg = loadImage("assets/Waggon.jpg");
  fallingObjectImg = loadImage("assets/Cabbage.jpg");
  themeSong = loadSound("assets/ATLAtheme.mp3");
}

/* SETUP RUNS ONCE */
function setup() {
  createCanvas(400, 600);

  // Play ATLA theme song
  themeSong.play();

  // Resize images
  catcherImg.resize(80, 0);
  fallingObjectImg.resize(28, 0);

  //Create catcher 
  catcher = new Sprite(catcherImg, 200, 480, "k");
  catcher.color = color(95, 158, 160);

  //Create falling object
  fallingObject = new Sprite(fallingObjectImg, 100, 0);
  fallingObject.color = color(0, 128, 128);
  fallingObject.vel.y = 2;
  fallingObject.rotationLock = true;
}

/* DRAW LOOP REPEATS */
function draw() {
  background("white")
  image(backgroundImg, 300, 100, 100, 100);

  // Draw directions to screen
  fill("#013220");
  textSize(12);
  text("Move the \ncatcher with the \nleft and right \narrow keys to \ncatch the falling \ncabbages!", width - 100, 20);

  // If falling object reaches bottom, move back to random position at top
  if (fallingObject.y >= height) {
    fallingObject.y = 0;
    fallingObject.x = random(width);
    fallingObject.vel.y = random(1, 5);
    score = score - 1;
  }

  // Move catcher
  if (kb.pressing("left")) {
    catcher.vel.x = -3;
  } else if (kb.pressing("right")) {
    catcher.vel.x = 3;
  } else {
    catcher.vel.x = 0;
  }

  // Stop catcher at edges of screen
  if (catcher.x < 50) {
    catcher.x = 50;
  } else if (catcher.x > 350) {
    catcher.x = 350;
  }

  // If fallingObject collides with catcher, move back to random position at top
  if (fallingObject.collides(catcher)) {
    fallingObject.y = 0;
    fallingObject.x = random(width);
    fallingObject.vel.y = random(1, 5);
    fallingObject.direction = "down";
    score = score + 1;
  }

  // Draw the score to screen
  fill(0, 128, 128);
  textSize(20);
  text("Score = " + score, 10, 30);

  // allSprites.debug = mouse.pressing();
}

