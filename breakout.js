document.addEventListener("keydown", onKeyDown);
document.addEventListener("keyup", onKeyUp);

let leftPressed = false;
let rightPressed = false;
let paddleSpeed = 3;

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

function createBricks() {
    /* create a bunch of divs w/ their lil margins separated
    from each other in big square
    */
}