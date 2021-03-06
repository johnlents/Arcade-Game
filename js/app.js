var lives = 3;
var score = 0;

// Enemies our player must avoid
var Enemy = function(x, y) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.x = x;
    this.y = y;
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.speed = Math.floor((Math.random() * 300) + 200);
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    if (this.x < 500) {
        this.x += this.speed * dt;
    }
    else {
        this.x = -110;
    }

    // Set boundaries for enemies
    this.width = 50;
    this.height = 50;
    this.checkCollisions(player);
};

Enemy.prototype.collision = function() {

    if (this.x < player.x + player.width &&
        this.x + this.width > player.x &&
        this.y < player.y + player.height &&
        this.height + this.y > player.y) {
        return true;
    }
};

Enemy.prototype.checkCollisions = function(player) {
    if (this.collision()) {
            player.resetGame();     
        }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function(x, y) {
    this.x = x;
    this.y = y;
    this.sprite = 'images/char-boy.png';
};

Player.prototype.update = function(dt) {
    //Set boundary for player
    this.width = 50;
    this.height = 50;

    document.getElementById('score').innerHTML = score;
    document.getElementById('lives').innerHTML = lives;
};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};
//Reset game, reduce lives by 1, and checks lives status
Player.prototype.resetGame = function() {
    this.x = 200;
    this.y = 400;
    lives -= 1;
    if (lives === 0) {
        alert("You lose.....");
        lives = 3;
        score = 0;
    }
};
//Resets game, adds to score, checks score status
Player.prototype.winGame = function() {
    this.x = 200;
    this.y = 400;
    score += 100;
    if (score === 500) {
        alert("Good job! You win!");
        score = 0;
        lives = 3;
    }
};

Player.prototype.handleInput = function(keyPressed) {
    if (keyPressed === 'left') {
        if (this.x > 50) {
            this.x -= 101;
        }
    }
    if (keyPressed === 'up') {
        if (this.y > 100) {
            this.y -= 83;
        }
        else {
            this.winGame();
        }
    }
    if (keyPressed === 'right') {
        if (this.x < 350) {
            this.x += 101;
        }
    }
    if (keyPressed === 'down') {
        if (this.y < 400) {
            this.y += 83;
        }
    }
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var enemy1 = new Enemy(-100, 60);
var enemy2 = new Enemy(300, 145);
var enemy3 = new Enemy(200, 225);
var allEnemies = [enemy1, enemy2, enemy3];

var player = new Player(200, 400);

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});