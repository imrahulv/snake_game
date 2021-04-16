console.log('snake');
const cvs = document.getElementById('snake');
const ctx = cvs.getContext("2d");
//get context method returns and object that provides method and properties for drawing on the canvas

//create the unit
const box = 32;

//load image 
const ground = new Image();
ground.src = "ground.png";

const foodImg = new Image();
foodImg.src = "food.png";

//create snake with some initail position with index zero as head and its x and y position as below
let snake = [];
snake[0] = {
    x: 9 * box,
    y: 10 * box
};

//create the food
let food = {
    x: Math.floor(Math.random() * 17 + 1) * box,
    y: Math.floor(Math.random() * 15 + 3) * box
}

//create the score variable
let score = 0;

//control the snake 
let d;

document.addEventListener("keydown", direction);
//console.log('keydown has called');

function direction(event) {
    let key = event.keyCode;
    if( key == 37 && d != "RIGHT"){
        d = "LEFT";
        //left.play();
    }else if(key == 38 && d != "DOWN"){
        d = "UP";
        //up.play();
    }else if(key == 39 && d != "LEFT"){
        d = "RIGHT";
        //right.play();
    }else if(key == 40 && d != "UP"){
        d = "DOWN";
        //down.play();
    }
}


// cheack collision function
function collision(head,array){
    for(let i = 0; i < array.length; i++){
        if(head.x == array[i].x && head.y == array[i].y){
            return true;
        }
    }
    return false;
}



//create everything to canvas using draw function
function draw() {
    ctx.drawImage(ground, 0, 0);

    for (i = 0; i < snake.length; i++) {
        ctx.fillStyle = (i == 0) ? "green" : "white";
        ctx.fillRect(snake[i].x, snake[i].y, box, box);

        ctx.strokeStyle = "red";
        ctx.strokeRect(snake[i].x, snake[i].y, box, box);
    }

    ctx.drawImage(foodImg, food.x, food.y);

    //snake old head position

    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    //remove the tail
    // snake.pop();



    //which direction sanke move
    if (d == "LEFT") snakeX -= box;
    if (d == "UP") snakeY -= box;
    if (d == "RIGHT") snakeX += box;
    if (d == "DOWN") snakeY += box;

    //if snake eats the food then increse the size
    if (snakeX == food.x && snakeY == food.y) {
        score++;
        food = {
            x: Math.floor(Math.random() * 17 + 1) * box,
            y: Math.floor(Math.random() * 15 + 3) * box
        }
    } else {
        snake.pop();
    }
    let newHead = {
        x: snakeX,
        y: snakeY
    }

    if(snakeX < box || snakeX > 17 * box || snakeY < 3*box || snakeY > 17*box || collision(newHead,snake)){
        clearInterval(game);

    }


    //add new head

    snake.unshift(newHead);

    cxt.fillStyle = "white";
    cxt.font = "45px Changa one";
    cxt.fillText(score, 2 * box, 1.6 * box);


}
let game = setInterval(draw, 300);