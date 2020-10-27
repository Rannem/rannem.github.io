

document.addEventListener('DOMContentLoaded', function () {
    document.body.innerHTML = "Welcome to my version of snake, press start when you are ready ";
    let startButtonNode = document.createElement("button")
    let textNode = document.createTextNode("Start game");

    startButtonNode.appendChild(textNode);
    document.body.appendChild(startButtonNode);
    startButtonNode.addEventListener("click", initSnake);
    startButtonNode.addEventListener("click", timerStart);

})

let score = 0;
let myTimer = 0;
function timerStart() {
    setInterval(function () {
        myTimer++
        console.log(myTimer)

    }, 1000);
}







function initSnake() {
    document.body.innerHTML = "Snake";
    let playBoxNode = document.createElement("div")
    playBoxNode.classList.add("playbox")

    let playerNode = document.createElement("div")
    playerNode.classList.add("player")

    let timerNode = document.createElement("div")
    timerNode.classList.add("timer")
    timerNode.innerHTML = myTimer
    setInterval(function () { timerNode.innerHTML = myTimer; }, 1000)


    let scoreNode = document.createElement("div")
    scoreNode.classList.add("score")
    scoreNode.innerHTML = "0";


    let playerPosX = 0;
    let playerPosY = 0;

    document.addEventListener('keypress', keyInput);
    let speed = 10;
    setInterval(function () {
        speed = speed + (myTimer % 10)
    }, 1000)


    function keyInput(keypress) {
        console.log(keypress.code)

        switch (keypress.code) {

            case `KeyA`:
                up = false
                down = false
                left = true
                right = false
                return;

            case `KeyD`:
                up = false
                down = false
                left = false
                right = true
                return;
            case `KeyW`:
                up = true
                down = false
                left = false
                right = false
                return;
            case `KeyS`:
                up = false
                down = true
                left = false
                right = false
                return;
        }
    }

    setInterval(function () {
        if (left == true) {
            playerNode.style.left = (playerPosX = (playerPosX + -speed)) + `px`;
        }

        if (right == true) {
            playerNode.style.left = (playerPosX = (playerPosX + speed)) + `px`;
        }

        if (up == true) {
            playerNode.style.top = (playerPosY = (playerPosY + -speed)) + `px`;
        }

        if (down == true) {
            playerNode.style.top = (playerPosY = (playerPosY + speed)) + `px`;
        }


    }, 100);

    playBoxNode.appendChild(playerNode)
    document.body.appendChild(playBoxNode);
    document.body.appendChild(timerNode);
    document.body.appendChild(scoreNode);
}
