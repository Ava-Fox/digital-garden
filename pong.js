document.addEventListener("mousemove", getMousePosition);
let mousePosition = 0;
let downPressed = false;
let upPressed = false;
let isStill = true;
let ballSpeed = 2;
let paddleSpeed = 4;

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
    // distance bt rect top to top of screen and distance bt rect bottom to bottom of screen = whitespace/empty
    // collision if it's not in that whitespace
    let paddlePositionOne = paddlePosition[0];
    let paddlePositionTwo = paddlePosition[1];
    
    let leftPaddle = paddlePositionOne.right;
    let rightPaddle = paddlePositionTwo.left;
    let leftBall = ballPos.left;
    let rightBall = ballPos.right;
    let whiteSpaceOne = (ballPos.bottom < paddlePositionOne.top || ballPos.top > paddlePositionOne.bottom)
    let whiteSpaceTwo = ballPos.bottom < paddlePositionTwo.top || ballPos.top > paddlePositionTwo.bottom

    // Check Player One
    if (leftBall <= leftPaddle) {
        if (!whiteSpaceOne) {
            moveLeft = false;
            moveRight = true;
            console.log("Hit Left Paddle");
        }
    }

    // Check Player Two
    if (rightBall >= rightPaddle) {
        if (!whiteSpaceTwo) {
            moveLeft = true;
            moveRight = false;
            console.log("Hit Right Paddle");
        }
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
        else {
            moveLeft = false;
            moveRight = true;
        }
    }
    else if (moveRight) {
        if (rightBall <= window.innerWidth) {
            ball.style.left = `${leftBall + ballSpeed}px`
        }
        else {
            moveRight = false;
            moveLeft = true;
        }
    }
    return ballPos;
}
function movePaddleLeft(playerOne) {
    // moves by mouse
    let paddlePositionOne = playerOne.getBoundingClientRect();
    let topOne = paddlePositionOne.top;
    let bottomOne = paddlePositionOne.bottom;
    let heightOne = paddlePositionOne.height;
    let centerPlayerOne = getCenter(topOne, heightOne);
    // moving down
    if (centerPlayerOne < mousePosition && bottomOne <= (window.innerHeight - 20)) {
        playerOne.style.top = `${topOne + paddleSpeed}px`;
    }
    // moving up
    else if (centerPlayerOne > mousePosition  && topOne >= 20) {
        playerOne.style.top = `${topOne - paddleSpeed}px`;
    }
    return paddlePositionOne;
}
function movePaddleRight(playerTwo) {
    // Moves by arrows
    let paddlePositionTwo = playerTwo.getBoundingClientRect();
    let topTwo = paddlePositionTwo.top;
    let bottomTwo = paddlePositionTwo.bottom;
    if (downPressed && bottomTwo <= (window.innerHeight - 20)) {
        playerTwo.style.top = `${topTwo + paddleSpeed}px`;
    }
    if (upPressed && topTwo >= 20) {
        playerTwo.style.top = `${topTwo - paddleSpeed}px`;
    }
    return paddlePositionTwo;
}
function movePaddle() {
    let playerOne = document.querySelector(".paddleLeft");
    let playerTwo = document.querySelector(".paddleRight");
    let paddlePositionOne = movePaddleLeft(playerOne);
    let paddlePositionTwo = movePaddleRight(playerTwo);
    return [paddlePositionOne, paddlePositionTwo];
}

function getCenter (top, height) {
    let center = top + (height / 2);
    return center;
}

// let paddleLeft = document.querySelector(".paddleLeft");
