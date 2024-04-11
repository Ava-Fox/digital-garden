document.addEventListener("keydown", onKeyDown);
document.addEventListener("keyup", onKeyUp);
// document.body.onload = createBricks;

let leftPressed = false;
let rightPressed = false;
let paddleSpeed = 3;
const brickColumn = 3;
const brickRow = 3; 
let bricks = [];

function updateBricks () {
    // Remove all bricks and create again based on True/False in bricks
}

function initBricks() {
    /* create a bunch of divs w/ their lil margins separated
    from each other in big square
    Array of arrays, each element boolean 
    */
   for (let i = 0; i < brickRow; i++) {
        let newRow = []
        for (let j = 0; j < brickColumn; j++) {
            if (i == 0 && j == 0) {
                newRow.push(false);
            }
            else {
                newRow.push(true);
            } 
        }
        bricks.push(newRow);
   }
}
initBricks();

function createBricks() {
    // createElement innerHTML
    // getting brickhouse, creating bricks, appending bricks to house
    let house = document.getElementById("brickHouse");
    let currentX = 0;
    let currentY = 0;
    let brickWidth;
    let brickHeight;
    let margin = 4;
    // create brick, get its shit, remove
    let fakeBrick = document.createElement("div");
    house.appendChild(fakeBrick);
    fakeBrick.setAttribute("class", "brick");
    let rect = fakeBrick.getBoundingClientRect();
    brickWidth = rect.width;
    brickHeight = rect.height;
    house.removeChild(fakeBrick);

    for (let i = 0; i < brickRow; i++) {
        for (let j = 0; j < brickColumn; j++) {
            if (bricks[i][j]) {
            let newBrick = document.createElement("div");
            // GIving newbrick class "brick"
            house.appendChild(newBrick);
            newBrick.setAttribute("class", "brick");
            newBrick.style.left = `${currentX}px`;
            newBrick.style.top = `${currentY}px`;
            
            console.log(`Current X: ${currentX}`);
            console.log(`Current Y: ${currentY}`);
            console.log(brickWidth);
            console.log(brickHeight);
            }
            currentX += brickWidth + margin;
        }
        currentX = 0;
        currentY += brickHeight + margin;
    }
}
createBricks()

function game() {
    movePaddle();
    setTimeout(game, 17);
}
game()

function onKeyDown(event) {
    if (event.code === "ArrowLeft") {
       leftPressed = true;
    }
    if (event.code === "ArrowRight") {
        rightPressed = true;
    }
}

function onKeyUp(event) {
    if (event.code === "ArrowLeft") {
        leftPressed = false;
    }
    if (event.code === "ArrowRight") {
        rightPressed = false;
    }
}

function movePaddle() {
    let paddleEl = document.querySelector(".bPaddle");
    let position = paddleEl.getBoundingClientRect();
    let paddleLeft = position.left;
    let paddleRight = position.right;
    if (leftPressed && paddleLeft >= 20) {
        // move left
        paddleEl.style.left = `${paddleLeft - paddleSpeed}px`;
    }
    else if (rightPressed && paddleRight <= window.innerWidth - 20) {
        // move right
        paddleEl.style.left = `${paddleLeft + paddleSpeed}px`;
    }
}

function moveBall() {
    let ball = document.getElementById("ball");
    let ballPos = ball.getBoundingClientRect();
    let topBall = ballPos.top;
    let bottomBall = ballPos.bottom;
    let leftBall = ballPos.left;
    let rightBall = ballPos.right;
    
    // move down
    if (movingDown) {
        if (bottomBall <= window.innerHeight) {
            ball.style.top = `${topBall + ballSpeed}px`
        }
        else {
            movingDown = false;
            movingUp = true;
        }
    }
    else if (movingUp) {
        if (topBall >= 0) {
            ball.style.top = `${topBall - ballSpeed}px`
        }
        else {
            movingUp = false;
            movingDown = true;
        }
    }
    if (moveLeft) {
        if (leftBall >= 0) {
            ball.style.left = `${leftBall - ballSpeed}px`
        }
        // Hit Left wall
        else {
            moveLeft = false;
            moveRight = true;
            scoreRight++;
            scoreRightEl.innerHTML = scoreRight;
        }
    }
    else if (moveRight) {
        if (rightBall <= window.innerWidth) {
            ball.style.left = `${leftBall + ballSpeed}px`
        }
        // Hit right wall
        else {
            moveRight = false;
            moveLeft = true;
            scoreLeft++;
            scoreLeftEl.innerHTML = scoreLeft;  
        }
    }
    return ballPos;
}

