console.log("hello world");

document.addEventListener("mousemove", getMousePosition);
let mousePosition = 0;
let downPressed = false;
let upPressed = false;

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

function movePaddle() {
    let playerOne = document.querySelector(".paddleLeft");
    let playerTwo = document.querySelector(".paddleRight");
    // bunch of logic
    // if paddle Left above, move down

    // getting position logic
    let paddlePositionOne = playerOne.getBoundingClientRect();
    let paddlePositionTwo = playerTwo.getBoundingClientRect();
    let topOne = paddlePositionOne.top;
    let heightOne = paddlePositionOne.height;
    
    // moving logic
    let centerPlayerOne = getCenter(topOne, heightOne);
    
    // moving down
    if (centerPlayerOne < mousePosition) {
        playerOne.style.top = `${topOne + 1}px`;
    }
    // moving up
    else if (centerPlayerOne > mousePosition  && topOne >= 0) {
        playerOne.style.top = `${topOne - 1}px`;
    }

    // move player 2
    let topTwo = paddlePositionTwo.top;
    let bottomTwo = paddlePositionTwo.bottom;
    let heightTwo = paddlePositionTwo.height;
    let centerPlayerTwo = getCenter(topTwo, heightTwo);
    console.log(centerPlayerTwo);

    if (downPressed && bottomTwo <= window.innerHeight) {
        playerTwo.style.top = `${topTwo + 1}px`;
    }
    if (upPressed && topTwo >= 0) {
        playerTwo.style.top = `${topTwo - 1}px`;
    }
    
    setTimeout(movePaddle, 17)
}
movePaddle()

function getCenter (top, height) {
    let center = top + (height / 2);
    return center;
}

// let paddleLeft = document.querySelector(".paddleLeft");
