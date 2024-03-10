let inputdir = { x: 0, y: 0 };
let board = document.querySelector(".board");
let food = { x: 5, y: 6 };
let score = 0;
let highScore = 0;
let scoreboard = document.querySelector(".game-detail");

let snakeArr = [{ x: 13, y: 15 }];
const targetFPS = 9;
const frameInterval = 1000 / targetFPS;
let lastFrameTime = 0;

function timedGameLoop(timestamp) {
    const elapsed = timestamp - lastFrameTime;
    if (elapsed > frameInterval) {
        lastFrameTime = timestamp - (elapsed % frameInterval);
        gameEngine();
        requestAnimationFrame(timedGameLoop);
    } else {
        requestAnimationFrame(timedGameLoop);
    }
}
function gameLoop() {
    requestAnimationFrame(gameLoop);
}

const iscollide = () => {
  if (
    snakeArr[0].x === 30 ||
    snakeArr[0].y === 30 ||
    snakeArr[0].x === 0 ||
    snakeArr[0].y === 0
  ) {
    return true;
  }
  for (let i = 2; i < snakeArr.length; i++) {
    if (snakeArr[0].x === snakeArr[i].x && snakeArr[0].y === snakeArr[i].y) {
      return true;
    }
  }
};

const gameEngine = () => {
  if (iscollide()) {
    alert("game over");
    snakeArr = snakeArr = [{ x: 13, y: 15 }];
    inputdir = { x: 0, y: 0 };
    highScore = Math.max(highScore, score);
    score = 0;
  }
  //snake mover
  for (let i = snakeArr.length - 2; i >= 0; i--) {
    snakeArr[i + 1] = { ...snakeArr[i] };
  }
  snakeArr[0].x += inputdir.x;
  snakeArr[0].y += inputdir.y;

  //food eaten by the snake
  if (snakeArr[0].x === food.x && snakeArr[0].y === food.y) {
    snakeArr.unshift(snakeArr[0]);
    food.x = Math.floor(Math.random() * 30 );
    food.y = Math.floor(Math.random() * 30 + 1);
    score++;
  }

  //display snake
  board.innerHTML = "";
  snakeArr.forEach((e, index) => {
    snakeElement = document.createElement("div");

    snakeElement.style.gridRowStart = e.y;
    snakeElement.style.gridColumnStart = e.x;
    snakeElement.classList.add("head");
    board.appendChild(snakeElement);
  });

  //display foodElement
  foodElement = document.createElement("div");
  foodElement.style.gridRowStart = food.y;
  foodElement.style.gridColumnStart = food.x;
  foodElement.classList.add("food");
  board.appendChild(foodElement);
  //display scores;
  scoreboard.firstElementChild.innerText = "Score:" + score;
  scoreboard.lastElementChild.innerHTML = `<span>High Score:${highScore}</span>`;
};
//game loop
requestAnimationFrame(timedGameLoop);

// eventlistner
window.addEventListener("keydown", (e) => {
  if (e.key === "ArrowUp") {
    inputdir.x = 0;
    if (inputdir.y != 1) {
      inputdir.y = -1;
    }
  } else if (e.key === "ArrowDown") {
    inputdir.x = 0;
    if (inputdir.y != -1) {
      inputdir.y = 1;
    }
  } else if (e.key === "ArrowLeft") {
    if (inputdir.x != 1) {
      inputdir.x = -1;
    }
    inputdir.y = 0;
  } else if (e.key === "ArrowRight") {
    if (inputdir.x != -1) {
      inputdir.x = 1;
    }
    inputdir.y = 0;
  }
});

