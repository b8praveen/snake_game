//game constants
let inputDir = { x: 0, y: 0 };
let foodSound = new Audio('music/egg.mp3');
let gameOverSound = new Audio('music/end.mp3');
let moveSound = new Audio('music/move.mp3');
let musicSound = new Audio('music/bg.mp3');
let speed = 10, score = 0, max = 0;
let lastPaintTime = 0;
let snakeArray = [
    { x: 13, y: 15 }
]
food = { x: 6, y: 10 };
musicSound.play();
function main(ctime) {
    window.requestAnimationFrame(main);
    if ((ctime - lastPaintTime) / 1000 < 1 / speed) {
        return;
    }
    lastPaintTime = ctime;
    gameEngine();
}
function isCollide(snake) {
    //if u bump urself 
    for (let i = 1; i < snakeArray.length; i++) {
        if (snake[i].x === snake[0].x && snake[i].y === snake[0].y)
            return true;
    }
    if (snake[0].x <= 0 || snake[0].x >= 18 || snake[0].y <= 0 || snake[0].y >= 18)
        return true;
}
function gameEngine() {
    musicSound.play();
    //update snake array &food  
    if (isCollide(snakeArray)) {
        gameOverSound.play();
        musicSound.pause();
        inputDir = { x: 0, y: 0 };
        alert("game over");
        snakeArray = [{ x: 13, y: 15 }];
        musicSound.play();
        score = 0;
        // hscorebox.innerHTML="High score: "+Math.max(max,score);
    }
    //if food ate reposition food and increase score;
    if (snakeArray[0].y === food.y && snakeArray[0].x === food.x) {
        foodSound.play();
        score++;
        scorebox.innerHTML = "Score :" + score;
        if (score > hiscoreval) {
            hiscoreval = score;
            localStorage.setItem("hiscore", JSON.stringify(hiscoreval));
            hiscoreBox.innerHTML = "High Score:" + hiscoreval;

        }
        // hscorebox.innerHTML="High score: "+Math.max(max,score);
        snakeArray.unshift({ x: snakeArray[0].x + inputDir.x, y: snakeArray[0].y + inputDir.y });
        let a = 2;
        let b = 16;
        food = { x: Math.round(a + (b - a) * Math.random()), y: Math.round(a + (b - a) * Math.random()) };


    }
    //moving the snake
    for (let i = snakeArray.length - 2; i >= 0; i--) {
        // const element=snakeArray[i];
        snakeArray[i + 1] = { ...snakeArray[i] };
    }
    snakeArray[0].x += inputDir.x;
    snakeArray[0].y += inputDir.y;

    //display snake and food

    //display snake
    board.innerHTML = "";
    snakeArray.forEach((e, index) => {
        snakeElement = document.createElement("div");
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;
        if (index === 0) {
            snakeElement.classList.add("head");
        }
        else {
            snakeElement.classList.add("snake");
        }
        board.appendChild(snakeElement);
    });
    //display food
    foodElement = document.createElement("div");
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add("food")
    board.appendChild(foodElement);
}



//main logic

let hiscore = localStorage.getItem("hiscore");
if (hiscore === null) {
    hiscoreval = 0;
    localStorage.setItem("hiscore", JSON.stringify(hiscoreval));
}
else {
    hiscoreval = JSON.parse(hiscore);
    hiscoreBox.innerHTML = "High Score:" + hiscore;
}
window.requestAnimationFrame(main);
window.addEventListener("keydown", e => {
    inputDir = { x: 0, y: 1 }
    moveSound.play();
    switch (e.key) {
        case "ArrowUp":
            console.log("ArrowUp");
            inputDir.x = 0;
            inputDir.y = -1;
            break;
        case "ArrowDown":
            console.log("ArrowDown");
            inputDir.x = 0;
            inputDir.y = 1;
            break;
        case "ArrowRight":
            console.log("ArrowRight");
            inputDir.x = 1;
            inputDir.y = 0;
            break;
        case "ArrowLeft":
            console.log("ArrowLeft");
            inputDir.x = -1;
            inputDir.y = 0;
            break;
        default:
            break;
    }
});