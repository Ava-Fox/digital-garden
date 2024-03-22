document.addEventListener("mousemove", getMousePosition);
let mousePosition = 0;
let downPressed = false;
let upPressed = false;
let isStill = true;
let speed = 2;

function getMousePosition(event) {
    mousePosition = event.clientY;
}

function onKeyDown(event) {
    if (event.code === "ArrowDown") {
       downPressed = true;
    }
    if (event.code === "ArrowUp") {
        upPressed = true;
    }
}

function onKeyUp(event) {
    if (event.code === "ArrowDown") {
       downPressed = false;
    }
    if (event.code === "ArrowUp") {
        upPressed = false;
    }
}

document.addEventListener("keydown", onKeyDown);
document.addEventListener("keyup", onKeyUp);
let movingDown = true;
let movingUp = false;
let moveLeft  = true;
let moveRight = false;
function game() {
    let ballPos = moveBall();
    let paddlePosition = movePaddle();
    checkCollision(ballPos, paddlePosition);
    setTimeout(game, 17);
}
game()

function checkCollision(ballPos, paddlePosition) {
    let paddlePositionOne = paddlePosition[0];
    let paddlePositionTwo = paddlePosition[1];
    let leftPaddle = paddlePositionOne.right;
    let rightPaddle = paddlePositionTwo.left;
    let leftBall = ballPos.left;
    let rightBall = ballPos.right;

    // hit left paddle
    if (leftBall <= leftPaddle) {
        moveLeft = false;
        moveRight = true;
    }
    if (rightBall >= rightPaddle) {
        moveLeft = true;
        moveRight = false;
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
            ball.style.top = `${topBall + speed}px`
        }
        else {
            movingDown = false;
            movingUp = true;
        }
    }
    else if (movingUp) {
        if (topBall >= 0) {
            ball.style.top = `${topBall - speed}px`
        }
        else {
            movingUp = false;
            movingDown = true;
        }
    }
    if (moveLeft) {
        if (leftBall >= 0) {
            ball.style.left = `${leftBall - speed}px`
        }
        else {
            moveLeft = false;
            moveRight = true;
        }
    }
    else if (moveRight) {
        if (rightBall <= window.innerWidth) {
            ball.style.left = `${leftBall + speed}px`
        }
        else {
            moveRight = false;
            moveLeft = true;
        }
    }
    return ballPos;
}

function movePaddle() {
    let playerOne = document.querySelector(".paddleLeft");
    let playerTwo = document.querySelector(".paddleRight");

    // getting position logic
    let paddlePositionOne = playerOne.getBoundingClientRect();
    let paddlePositionTwo = playerTwo.getBoundingClientRect();
    let topOne = paddlePositionOne.top;
    let bottomOne = paddlePositionOne.bottom;
    let heightOne = paddlePositionOne.height;
    
    // moving logic
    let centerPlayerOne = getCenter(topOne, heightOne);
    
    // moving down
    if (centerPlayerOne < mousePosition && bottomOne <= (window.innerHeight - 20)) {
        playerOne.style.top = `${topOne + speed}px`;
    }
    // moving up
    else if (centerPlayerOne > mousePosition  && topOne >= 20) {
        playerOne.style.top = `${topOne - speed}px`;
    }

    // move player 2
    let topTwo = paddlePositionTwo.top;
    let bottomTwo = paddlePositionTwo.bottom;
    let heightTwo = paddlePositionTwo.height;
    let centerPlayerTwo = getCenter(topTwo, heightTwo);

    if (downPressed && bottomTwo <= (window.innerHeight - 20)) {
        playerTwo.style.top = `${topTwo + speed}px`;
    }
    if (upPressed && topTwo >= 20) {
        playerTwo.style.top = `${topTwo - speed}px`;
    }
    return [paddlePositionOne, paddlePositionTwo];
}

function getCenter (top, height) {
    let center = top + (height / 2);
    return center;
}

// let paddleLeft = document.querySelector(".paddleLeft");
