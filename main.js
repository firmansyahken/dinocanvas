const canvas = document.querySelector("canvas");
const h1 = document.querySelector("h1");
canvas.width = canvas.scrollWidth;
canvas.height = canvas.scrollHeight;
const ctx = canvas.getContext("2d");
var gameOver = false;
var score = 0;

class Dino {
  constructor() {
    this.width = 100;
    this.height = 70;
    this.x = 100;
    this.y = canvas.height - this.height;
    this.imageDino = new Image();
    this.imageDino.src = "dino.png";
  }

  update() {}

  draw() {
    ctx.fillStyle = "red";
    ctx.drawImage(this.imageDino, this.x, this.y, this.width, this.height);
  }
}

class Obstacle {
  constructor() {
    this.width = 50;
    this.height = 80;
    this.x = canvas.width;
    this.y = canvas.height - this.height;
  }

  update() {
    if (this.x + this.width < 0) {
      score += 1;
      h1.innerText = score;
      return (this.x = canvas.width);
    }
    this.x -= 10;
  }

  draw() {
    ctx.fillStyle = "green";
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }
}

const dino = new Dino();
const obstacle = new Obstacle();

function collision() {
  if (
    dino.x < obstacle.x + obstacle.width &&
    dino.x + dino.width > obstacle.x &&
    dino.y < obstacle.y + obstacle.height &&
    dino.y + dino.height > obstacle.y
  ) {
    gameOver = true;
  }
}

window.addEventListener("keydown", function (event) {
  if (event.keyCode === 32) {
    dino.y -= 120;
    setTimeout(() => {
      dino.y += 120;
    }, 400);
  }
});

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  collision();
  dino.update();
  dino.draw();
  obstacle.update();
  obstacle.draw();
  const animation = requestAnimationFrame(animate);
  if (gameOver) {
    return cancelAnimationFrame(animation);
  }
}

animate();