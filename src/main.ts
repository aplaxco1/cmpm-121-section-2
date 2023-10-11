//purposely bad code so students can fix it - can make it worse

// POSSIBLE CHANGES
// [x] Jumps should begin the moment the players mouse button goes down, not when they let it up
// [ ] Movement should start start slow but speed up over time the longer the player can survive
// [ ] It should be possible for more than one cactus or bird to be on the screen at a time
// [x] The smoothness of animation is determined by calls to requestAnimationFrame rather than a fixed timestep scheme

import "./style.css";

const dino = document.getElementById("dino");
const cactus = document.getElementById("cactus");
const bird = document.getElementById("bird");

const scoreText = document.getElementById("scoreText");
let score = 0;
SetText("click to start!");

var isJumping = false;
let gameOver = true;

function Main() {
  if (!gameOver) {
    score = score + 1;
    SetText("Score: " + score);
    CheckGameOver();
  }
  requestAnimationFrame(Main);
}

// start main animation loop
requestAnimationFrame(Main);

document.addEventListener("mousedown", () => jump());

function jump() {
  if (!gameOver && !isJumping) {
    isJumping = true;
    dino?.classList.add("jump");
    setTimeout(RemoveJump, 500);
  } else {
    StartGame();
  }
}

function StartGame() {
  console.log("Game started!");
  gameOver = false;
  score = 0;
  cactus?.classList.add("cactusMove");
  bird?.classList.add("birdMove");
}

setInterval(function () {
  increaseSpeed();
}, 1000);

function increaseSpeed() {
    // increase animation speeds for dino, bird, and cactus
}

function RemoveJump() {
  dino?.classList.remove("jump");
  isJumping = false;
}

function RemoveObstacles() {
  cactus?.classList.remove("cactusMove");
  bird?.classList.remove("birdMove");
}

function CheckGameOver() {
  if (!gameOver && dino && cactus && bird) {
    //get is dinosaur jumping
    let dinoTop = parseInt(
      window.getComputedStyle(dino).getPropertyValue("top")
    );

    //get cactus position
    let cactusLeft = parseInt(
      window.getComputedStyle(cactus).getPropertyValue("left")
    );

    //get bird position
    let birdLeft = parseInt(
      window.getComputedStyle(bird).getPropertyValue("left")
    );

    checkCollision(dinoTop, cactusLeft, birdLeft);
  }
}

function checkCollision(
  dinoTop: number,
  cactusLeft: number,
  birdLeft: number
): void {
  if (dinoTop >= 150 && Math.abs(cactusLeft) < 7) {
    endGame();
  } else if (dinoTop <= 55 && Math.abs(birdLeft) < 11) {
    endGame();
  }
}

function endGame(): void {
  //end game
  console.log("player died!");
  SetText("Final Score: " + score + "! Click To Play Again!");
  gameOver = true;

  //reset player
  RemoveJump();

  //reset cactus
  RemoveObstacles();
}

function SetText(s: string) {
  if (scoreText) {
    scoreText.textContent = s;
  }
}
