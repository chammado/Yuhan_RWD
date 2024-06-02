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

// 스택 생성
var enemyStack = [];

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

// 별의 좌표를 플레이어의 위치에 따라 동적으로 계산하여 그리도록 수정
function drawStar() {
    const size = 10; // 별 크기
    var x = starX - playerX + canvas.width / 2; // 수정: 플레이어의 위치에 따라 x 좌표 계산
    var y = starY - playerY + canvas.height / 2; // 수정: 플레이어의 위치에 따라 y 좌표 계산

    this.ctx.fillStyle = 'yellow';  // 채우기 색상 설정
    this.ctx.strokeStyle = '#000000'; // 테두리 색상을 검은색으로 설정
    this.ctx.beginPath();

    // 별 모양 그리기
    for (let i = 0; i < 5; i++) {
        this.ctx.lineTo(Math.cos((18 + i * 72) * Math.PI / 180) * size + x,
                        -Math.sin((18 + i * 72) * Math.PI / 180) * size + y);
        this.ctx.lineTo(Math.cos((54 + i * 72) * Math.PI / 180) * size / 2 + x,
                        -Math.sin((54 + i * 72) * Math.PI / 180) * size / 2 + y);
    }

    this.ctx.closePath();
    this.ctx.fill();
    this.ctx.stroke(); // 테두리 그리기
}

// 하트를 그리는 함수
function drawHeart() {
    const x = canvas.width / 2;  // 하트 위치
    const y = canvas.height / 2;  // 하트 위치
    const size = 50;  // 하트 크기

    ctx.save(); // 현재 변형 매트릭스를 저장
    ctx.translate(x, y); // 하트의 중심으로 이동
    ctx.rotate(playerAngle); // 플레이어 각도만큼 회전
    ctx.beginPath();
  
    ctx.moveTo(0, -size / 4); // 시작점
  
    // 곡선 좌표 계산
    for (let i = 0; i < 360; i++) {
        const t = i * Math.PI / 180;
        const px = 16 * Math.pow(Math.sin(t), 3);
        const py = - (13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t));
        ctx.lineTo(px, py);
    }
  
    ctx.closePath();
    
    ctx.fillStyle = '#C00000';  // 채우기 색상 설정
    ctx.strokeStyle = '#000000'; // 테두리 색상을 검은색으로 설정
    
    ctx.stroke(); // 테두리 그리기
    ctx.fill();
    ctx.restore(); // 이전에 저장한 변형 매트릭스로 복원
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
    drawHeart(canvas.width / 2, canvas.height / 2, playerAngle);
    drawStar(starX - playerX + canvas.width / 2, starY - playerY + canvas.height / 2);
    drawEnemies();
    drawHUD();
}

function autoRotate() {
    if (!gameEnded) {
        playerAngle += rotationSpeed;
        update();
        animationId = requestAnimationFrame
        (autoRotate);
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

// drawEnemies 함수 내에서 moveTowardsHeart 함수 호출 추가
function drawEnemies() {
    for (var i = 0; i < enemyStack.length; i++) {
        var enemy = enemyStack[i];
        moveTowardsHeart(enemy); // 수정: moveTowardsHeart 함수 호출 추가
        drawCircle(enemy.x - playerX + canvas.width / 2, enemy.y - playerY + canvas.height / 2, enemy.radius, enemy.color);
        if (isColliding(enemy)) {
            enemyStack.splice(i, 1);
            heartHealth--;
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
    var speed = enemy.speed; // 적의 속도를 사용
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
        console.log("플레이어가 별에 내접했습니다!");
    }
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
    startButton.style.display = 'none'; // 시작 버튼 숨김
    restartButton.style.display = 'block'; // 재시작 버튼 표시

    document.getElementById('canvasText02').classList.remove('hidden');
    // canvasContainer 숨김, canvasContainer02 표시
    document.getElementById('canvasContainer').style.display = 'none';
    document.getElementById('canvasContainer02').style.display = 'block'

    // 캔버스의 배경색을 빨간색으로 변경
    document.getElementById('myCanvas02').style.backgroundColor = 'red';   
    
    enemyStack = []; // 스택 초기화
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