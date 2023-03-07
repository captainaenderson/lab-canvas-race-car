const canvas = document.querySelector("canvas")
const ctx = canvas.getContext("2d");

  
// Adding the images
const imgRoad = new Image();
imgRoad.src = '/images/road.png'

const imgCar = new Image();
imgCar.src = '/images/car.png'

// Set initial position of the car

let carX = 100;
let carY = 520;

// Move the car to the right

function moveRight() {
  if (carX + imgCar.width < canvas.width +40) { // Check if the car is within the right edge of the road
    carX += 10;
  }
}

// Move the car to the left

function moveLeft() {
  if (carX > 30) { // Check if the car is within the left edge of the road
    carX -= 10;
  }
}

// Adding obstacles

class Walls {
  constructor(ctx, imgRoad) {
    this.x = 10;
    this.y = 0
    this.height = 30;
    this.width = 10;
    this.ctx = ctx;
    this.color = "red";
  }

  draw() {
    this.ctx.fillStyle = this.color;
    this.ctx.fillRect(this.x, this.y, this.width, this.height);
  }

  move() {
    this.y -= 3;
  }
}  

// Creating an array of walls

const walls = [];



// Update the canvas
function updateCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(imgRoad, 0, 0, canvas.width, canvas.height)
  ctx.drawImage(imgCar, carX, carY, 79, 160 );
}

// Loop to continuously update the canvas
function gameLoop() {
  updateCanvas();
  window.requestAnimationFrame(gameLoop);
}

window.onload = () => {
  document.getElementById('start-button').onclick = () => {
    gameLoop(); // start the game loop
  };

  function moveCar() {
    document.addEventListener("keydown", (event) => {
      switch(event.code){
        case "ArrowRight":
        moveRight();
        break;
        case "ArrowLeft":
        moveLeft();
      }
    })

    if (counter % 10 === 0) {
      walls.push(new Walls(ctx, this.y));
    }
    function createWalls() {
      updateCanvas();
    
      // Loop through walls array, draw and move walls, and remove any walls that have moved off the top of the canvas
      if (counter % 90 === 0) {
        walls.push(new Walls(ctx, imgRoad));
      }
      walls.forEach((wall) => {
        wall.draw();
        wall.move();
      
      window.requestAnimationFrame(gameLoop);
      })
    }  
    
}

  function startGame() {
    moveCar(); // add keydown event listener
    createWalls();
  }
  startGame(); // call startGame() to add keydown event listener on load
};

