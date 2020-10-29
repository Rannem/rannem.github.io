

document.addEventListener('DOMContentLoaded', function () {
    document.body.innerHTML = "Welcome to my version of snake, press start when you are ready ";
    let startButtonNode = document.createElement("button")
    let textNode = document.createTextNode("Start game");

    startButtonNode.appendChild(textNode);
    document.body.appendChild(startButtonNode);
    startButtonNode.addEventListener("click", initBoard);


})
//timer and score vars

let myTimer = 0;
let highscore = 0;

//board size vars
const board = [];
const boardWidth = 26, boardHeight = 16;

//snake vars
let snakeX;
let snakeY;
let snakeDirection;
let snakeLength;
let previousSnakeDirection;

function timerStart() {
    setInterval(function () {
        myTimer++
    }, 1000);
}

function initBoard() {
    document.body.innerHTML = ""

    let startBoardNode = document.createElement("div")
    startBoardNode.id = ("board")
    document.body.appendChild(startBoardNode);
    document.addEventListener(`keypress`, inputSnake)
    initGame()

}

function initGame() {
    // score
    let score = document.createElement("p");
    score.id = "score";
    document.body.appendChild(score)

    let highscore = document.createElement("p");
    highscore.id = "highscore";
    document.body.appendChild(highscore)
    // timer

    let timerNode = document.createElement("p")
    timerNode.id = ("timer")
    timerNode.innerHTML = "You have survied for " + myTimer + " seconds."
    document.body.appendChild(timerNode);

    const boardNode = document.getElementById("board")

    for (let y = 0; y < boardHeight; y++) {
        let row = []
        for (let x = 0; x < boardWidth; x++) {
            let cell = {};

            cell.element = document.createElement("div")
            boardNode.appendChild(cell.element);
            row.push(cell);
        }
        board.push(row);
    }
    timerStart()
    startGame()
    gameLoop()
}

function startGame() {
    let highscoreNode = document.getElementById("highscore")
    highscoreNode.innerHTML = "Highscore: " + (highscore);
    document.body.appendChild(highscoreNode)

    // Default position for the snake in the middle of the board.
    snakeX = Math.floor(boardWidth / 2);
    snakeY = Math.floor(boardHeight / 2);
    snakeLength = 5;
    snakeDirection = 'Up';
    previousSnakeDirection = 'Up';


    //Clear board
    for (var y = 0; y < boardHeight; ++y) {
        for (var x = 0; x < boardWidth; ++x) {
            board[y][x].snake = 0;
            board[y][x].apple = 0;
        }
    }

    // Set the center of the board to contain a snake
    board[snakeY][snakeX].snake = snakeLength;

    // places food
    placeFood()
}

function gameLoop() {
    let score = document.getElementById("score")
    let timer = document.getElementById("timer")

    score.innerHTML = "Score: " + (snakeLength - 5);
    timer.innerHTML = "You have survied for " + myTimer + " seconds."

    //  Direction changer
    switch (snakeDirection) {
        case `Up`:
            snakeY--
            break;
        case 'Down':
            snakeY++
            break;
        case 'Left':
            snakeX--
            break;
        case 'Right':
            snakeX++
            break;
    }

    if (snakeX < 0 || snakeY < 0 || snakeX >= boardWidth || snakeY >= boardHeight) {
        if ((snakeLength - 5)> highscore) {
            highscore = (snakeLength - 5);
        }
        startGame()
    }

    if (board[snakeY][snakeX].snake > 0) {
        if ((snakeLength - 5)  > highscore) {
            highscore = (snakeLength - 5);
        }
        startGame();
    }

    if (board[snakeY][snakeX].apple === 1) {
        snakeLength++;
        board[snakeY][snakeX].apple = 0;
        placeFood()
    }
    // Updates the snake

    board[snakeY][snakeX].snake = snakeLength;

    // Loop over the entire board, and update every cell
    for (let y = 0; y < boardHeight; ++y) {
        for (let x = 0; x < boardWidth; ++x) {
            let cell = board[y][x];

            if (cell.snake > 0) {
                cell.element.className = 'snake';
                cell.snake -= 1;
            } else if (cell.apple === 1) {
                cell.element.className = "apple"
            } else {
                cell.element.className = '';
            }
        }
    }
    setTimeout(gameLoop, 1000 / snakeLength);
}

function inputSnake(keypress) {
    // Update direction depending on key hit
    console.log(keypress.code)
    switch (keypress.code) {
        case `KeyW`:
            //Checks to not selfcrash by mistake direction change
            if (previousSnakeDirection == 'Down') {
                return;
            }

            //changes direction yo up
            snakeDirection = 'Up';
            previousSnakeDirection = 'Up';

            break;

        case `KeyS`:
            //Checks to not selfcrash by mistake direction change
            if (previousSnakeDirection == 'Up') {
                return;
            }

            //changes direction yo down
            snakeDirection = 'Down';
            previousSnakeDirection = 'Down';

            break;

        case `KeyA`:
            //Checks to not selfcrash by mistake direction change
            if (previousSnakeDirection == 'Right') {
                return;
            }

            //changes direction yo left
            snakeDirection = 'Left';
            previousSnakeDirection = 'Left';

            break;

        case `KeyD`:
            //Checks to not selfcrash by mistake direction change
            if (previousSnakeDirection == 'Left') {
                return;
            }

            //changes direction yo up
            snakeDirection = 'Right';
            previousSnakeDirection = 'Right';


            break;

        default: return;
    }
}

function placeFood() {
    let appleX = Math.floor(Math.random() * boardWidth);
    let appleY = Math.floor(Math.random() * boardHeight);

    board[appleY][appleX].apple = 1;
}







