var canvas = document.getElementById('myCanvas');
var ctx = canvas.getContext('2d');
var starX, starY;
var playerX = canvas.width / 2;
var playerY = canvas.height / 2;
var playerSpeed = 2;
var starSpeed = 2;
var playerAngle = 0;
var rotationSpeed = 0.1;
var enemies = [];
var heartHealth = 3;
var animationId;
var intervalId;
var gameEnded = false;
var keys = {};
var restartButton = document.getElementById('restartButton');
restartButton.addEventListener('click', startGame);

var enemyStack = [];
var shieldActive = false; // 쉴드 활성화 여부
var shieldDuration = 5000; // 쉴드 지속 시간 (5초)

document.addEventListener('keydown', function(event) {
    keys[event.code] = true;
});

document.addEventListener('keyup', function(event) {
    keys[event.code] = false;
});

function movePlayer() {
    if (keys['ArrowUp'] || keys['KeyW']) {
        playerY -= playerSpeed;
    }
    if (keys['ArrowDown'] || keys['KeyS']) {
        playerY += playerSpeed;
    }
    if (keys['ArrowLeft'] || keys['KeyA']) {
        playerX -= playerSpeed;
    }
    if (keys['ArrowRight'] || keys['KeyD']) {
        playerX += playerSpeed;
    }
}

function drawStar() {
    const size = 10;
    var x = starX - playerX + canvas.width / 2;
    var y = starY - playerY + canvas.height / 2;

    ctx.fillStyle = 'yellow';
    ctx.strokeStyle = '#000000';
    ctx.beginPath();

    for (let i = 0; i < 5; i++) {
        ctx.lineTo(Math.cos((18 + i * 72) * Math.PI / 180) * size + x,
            -Math.sin((18 + i * 72) * Math.PI / 180) * size + y);
        ctx.lineTo(Math.cos((54 + i * 72) * Math.PI / 180) * size / 2 + x,
            -Math.sin((54 + i * 72) * Math.PI / 180) * size / 2 + y);
    }

    ctx.closePath();
    ctx.fill();
    ctx.stroke();
}

function drawHeart() {
    const x = canvas.width / 2;
    const y = canvas.height / 2;
    const size = 50;

    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(playerAngle);
    ctx.beginPath();

    ctx.moveTo(0, -size / 4);

    for (let i = 0; i < 360; i++) {
        const t = i * Math.PI / 180;
        const px = 16 * Math.pow(Math.sin(t), 3);
        const py = -(13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t));
        ctx.lineTo(px, py);
    }

    ctx.closePath();
    ctx.fillStyle = '#C00000';
    ctx.strokeStyle = '#000000';
    ctx.stroke();
    ctx.fill();
    ctx.restore();
}

function drawShield() {
    const x = canvas.width / 2;
    const y = canvas.height / 2;
    const size = 70;

    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(playerAngle);
    ctx.beginPath();

    ctx.moveTo(0, -size / 4);

    for (let i = 0; i < 360; i++) {
        const t = i * Math.PI / 180;
        const px = 16 * Math.pow(Math.sin(t), 3) * 5.5; // 쉴드 크기 조정
        const py = -(13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t)) * 5.5;
        ctx.lineTo(px, py);
    }

    ctx.closePath();
    ctx.strokeStyle = 'rgba(0, 255, 0, 0.7)'; // 테두리 색상 변경
    ctx.lineWidth = 3;
    ctx.stroke();
    ctx.restore();
}

function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function drawHUD() {
    ctx.font = '24px Arial';
    ctx.fillStyle = 'white';
    ctx.fillText('HP: ' + heartHealth, 20, 40);
}

function update() {
    clearCanvas();
    movePlayer();
    checkPlayerCollisionWithStar();
    drawHeart();
    drawStar();
    drawEnemies();
    drawHUD();
    if (shieldActive) {
        drawShield();
    }
}

function autoRotate() {
    if (!gameEnded) {
        playerAngle += rotationSpeed;
        update();
        animationId = requestAnimationFrame(autoRotate);
    }
}

var startButton = document.getElementById('startButton');
startButton.addEventListener('click', function() {
    startButton.style.display = 'none';
    document.getElementById('canvasContainer').style.border = 'none';
    document.getElementById('canvasText').classList.add('hidden');
    var enemyCount = Math.floor(Math.random() * 11) + 5;
    for (var i = 0; i < enemyCount; i++) {
        createEnemy();
    }
    drawRandomStar();
    autoRotate();
    intervalId = setInterval(function() {
        createEnemy();
    }, 1000);
});

function drawRandomStar() {
    var margin = 40;
    starX = Math.random() * (canvas.width - 2 * margin) + margin;
    starY = Math.random() * (canvas.height - 2 * margin) + margin;
    update();
}

function createEnemy() {
    var angle = Math.random() * Math.PI * 2;
    var startX = Math.random() * canvas.width;
    var startY = Math.random() * canvas.height;

    if (Math.random() < 0.5) {
        startX = Math.random() < 0.5 ? -canvas.width : canvas.width * 1.5;
    } else {
        startY = Math.random() < 0.5 ? -canvas.height : canvas.height * 1.5;
    }
    var speed = Math.random() * 1 + 0.5; // 더 낮은 속도로 조절
    var enemy = {
        x: startX,
        y: startY,
        radius: Math.random() * 10 + 5,
        color: getRandomColor(),
        speed: speed,
        speedX: Math.cos(angle) * speed, // 수정: speedX 및 speedY 추가
        speedY: Math.sin(angle) * speed
    };
    enemyStack.push(enemy);
}

function drawEnemies() {
    for (var i = 0; i < enemyStack.length; i++) {
        var enemy = enemyStack[i];
        moveTowardsHeart(enemy);
        drawCircle(enemy.x - playerX + canvas.width / 2, enemy.y - playerY + canvas.height / 2, enemy.radius, enemy.color);
        if (isColliding(enemy)) {
            enemyStack.splice(i, 1);
            if (shieldActive) {
                heartHealth--; // 쉴드 활성화 중에는 하트 감소 없음
            } else {
                heartHealth--;
            }
            if (heartHealth <= 0) {
                endGame();
            }
            i--;
        }
    }
}

function moveTowardsHeart(enemy) {
    var dx = playerX - enemy.x;
    var dy = playerY - enemy.y;
    var distance = Math.sqrt(dx * dx + dy * dy);
    var speed = enemy.speed;
    if (distance > 1) {
        enemy.x += dx / distance * speed;
        enemy.y += dy / distance * speed;
    }
}

function isColliding(enemy) {
    var dx = playerX - enemy.x;
    var dy = playerY - enemy.y;
    var distance = Math.sqrt(dx * dx + dy * dy);
    return distance < enemy.radius;
}

function checkPlayerCollisionWithStar() {
    var dx = playerX - starX;
    var dy = playerY - starY;
    var distance = Math.sqrt(dx * dx + dy * dy);
    var playerRadius = 30;
    var starRadius = 40;

    if (distance < playerRadius + starRadius) {
        console.log("플레이어가 별에 닿았습니다!");
        drawRandomStar();
        activateShield(); // 별에 닿으면 쉴드 활성화
    }
}

function activateShield() {
    shieldActive = true;
    setTimeout(deactivateShield, shieldDuration); // 일정 시간 후 쉴드 비활성화
}

function deactivateShield() {
    shieldActive = false;
}

function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

function drawCircle(x, y, radius, color) {
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.fillStyle = color;
    ctx.fill();
    ctx.closePath();
}

function endGame() {
    clearCanvas();
    gameEnded = true;
    cancelAnimationFrame(animationId);
    clearInterval(intervalId);
    startButton.style.display = 'none';
    restartButton.style.display = 'block';

    document.getElementById('canvasText02').classList.remove('hidden');
    document.getElementById('canvasContainer').style.display = 'none';
    document.getElementById('canvasContainer02').style.display = 'block';
    document.getElementById('myCanvas02').style.backgroundColor = 'red';

    enemyStack = [];
    heartHealth = 3;
    restartButton.addEventListener('click', startGame);
}

function startGame() {
    gameEnded = false;
    restartButton.style.display = 'none';
    document.getElementById('canvasText02').classList.add('hidden');
    var enemyCount = Math.floor(Math.random() * 11) + 5;
    for (var i = 0; i < enemyCount; i++) {
        createEnemy();
    }
    drawRandomStar();
    autoRotate();
    intervalId = setInterval(function() {
        createEnemy();
    }, 1000);

    document.getElementById('canvasContainer02').style.display = 'none';
    document.getElementById('canvasContainer').style.display = 'block';

    restartButton.removeEventListener('click', startGame);
}