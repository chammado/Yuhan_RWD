var canvas = document.getElementById('myCanvas');
var ctx = canvas.getContext('2d');
var starX, starY;
var playerX = canvas.width / 2;
var playerY = canvas.height / 2;
var playerSpeed = 2;
var starSpeed = 2; // 별의 스피드 값을 10으로 변경
var playerAngle = 0;
var rotationSpeed = 0.1;
var enemies = [];

// 별을 그리는 함수
function drawStar() {
    const size = 10; // 별 크기

    this.ctx.fillStyle = 'yellow';  // 채우기 색상 설정
    this.ctx.strokeStyle = '#000000'; // 테두리 색상을 검은색으로 설정
    this.ctx.beginPath();

    // 별 모양 그리기
    for (let i = 0; i < 5; i++) {
        this.ctx.lineTo(Math.cos((18 + i * 72) * Math.PI / 180) * size + this.starX,
                        -Math.sin((18 + i * 72) * Math.PI / 180) * size + this.starY);
        this.ctx.lineTo(Math.cos((54 + i * 72) * Math.PI / 180) * size / 2 + this.starX,
                        -Math.sin((54 + i * 72) * Math.PI / 180) * size / 2 + this.starY);
    }

    this.ctx.closePath();
    this.ctx.fill();
    this.ctx.stroke(); // 테두리 그리기
}

// 하트를 그리는 함수
function drawHeart(x, y) {
    const size = 50;  // 하트 크기

    ctx.save(); // 현재 변형 매트릭스를 저장
    ctx.translate(x, y); // 하트의 위치를 매개변수로 받은 위치로 설정
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


// 캔버스 클리어 함수
function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

// 화면 갱신 함수
// 화면 갱신 함수
function update() {
    // 하트의 위치를 플레이어의 위치로 설정
    var heartX = playerX - 25; // 하트의 가로 크기의 절반을 빼서 중앙 정렬
    var heartY = playerY - 25; // 하트의 세로 크기의 절반을 빼서 중앙 정렬

    // 캔버스를 지우고 다시 그립니다.
    clearCanvas();

    // 캔버스를 이동하여 하트가 화면의 중심에 위치하도록 합니다.
    var offsetX = canvas.width / 2 - heartX;
    var offsetY = canvas.height / 2 - heartY;
    ctx.translate(offsetX, offsetY);

    drawStar(starX, starY);
    drawEnemies(); // 적 그리기
    drawHeart(heartX, heartY); // 하트 그리기

    // 변형 매트릭스를 원래대로 복원합니다.
    ctx.setTransform(1, 0, 0, 1, 0, 0);
}

// 자동 회전 함수
function autoRotate() {
    playerAngle += rotationSpeed;
    update();
    requestAnimationFrame(autoRotate); // 다음 프레임 요청
}

// 시작 버튼 이벤트 처리
var startButton = document.getElementById('startButton');
startButton.addEventListener('click', function() {
    startButton.style.display = 'none'; // 버튼 숨기기
    document.getElementById('canvasContainer').style.border = 'none'; // 테두리 없애기
    document.getElementById('canvasText').classList.add('hidden'); // 텍스트 숨기기
    var enemyCount = Math.floor(Math.random() * 11) + 5; // 5에서 15개의 적을 생성
    for (var i = 0; i < enemyCount; i++) {
        createEnemy();
    }
    drawRandomStar(); // 별 그리기 함수 호출
    autoRotate(); // 자동 회전 시작
    // 게임 시작 후 1초마다 새로운 적 생성
    setInterval(function() {
        createEnemy();
    }, 1000);
});

// 별을 랜덤한 위치에 그리기
function drawRandomStar() {
    starX = Math.random() * canvas.width;
    starY = Math.random() * canvas.height;
    update();
}

// 적 생성 함수
function createEnemy() {
    // 랜덤한 방향으로 이동하기 위해 랜덤한 각도 설정
    var angle = Math.random() * Math.PI * 2;
    // 적의 초기 위치를 캔버스의 외부로 설정
    var startX = Math.random() < 0.5 ? -100 : canvas.width + 100;
    var startY = Math.random() * canvas.height;
    var speed = Math.random() * 0.5 + 0.5; // 1에서 4 사이의 랜덤한 속도값 설정
    var enemy = {
        x: startX, // 캔버스 외부에서 생성
        y: startY, // 캔버스 외부에서 생성
        radius: Math.random() * 10 + 5, // 반지름을 5에서 15 사이의 랜덤값으로 설정
        color: getRandomColor(), // 랜덤한 색상을 설정
        speed: speed // 랜덤한 속도 할당
    };
    // 적의 x축과 y축 속도 설정
    enemy.speedX = Math.cos(angle) * enemy.speed;
    enemy.speedY = Math.sin(angle) * enemy.speed;
    enemies.push(enemy);
}

// 적 그리기 함수
function drawEnemies() {
    for (var i = 0; i < enemies.length; i++) {
        var enemy = enemies[i];
        // 캔버스 범위를 벗어나도 그리기
        moveTowardsHeart(enemy); // 하트 방향으로 이동
        drawCircle(enemy.x, enemy.y, enemy.radius, enemy.color); // 각 적의 고유한 색상으로 원을 그림
        if (isColliding(enemy)) {
            enemies.splice(i, 1); // 하트에 닿으면 제거
            i--; // 제거 후 배열이 재정렬되므로 인덱스 감소
        }
    }
}

// 적을 중앙으로 이동시키는 함수
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

// 하트와 적이 충돌하는지 확인하는 함수
function isColliding(enemy) {
    var dx = playerX - enemy.x;
    var dy = playerY - enemy.y;
    var distance = Math.sqrt(dx * dx + dy * dy);
    return distance < enemy.radius + 15; // 하트 반지름과 적의 반지름의 합이 충돌 거리보다 작으면 충돌로 판정
}

// 랜덤한 색상을 반환하는 함수
function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

// 원을 그리는 함수
function drawCircle(x, y, radius, color) {
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.fillStyle = color; // 각 적의 고유한 색상 적용
    ctx.fill();
    ctx.closePath();
}

function handleKeyDown(event) {
    const moveDistance = 10;

    switch (event.key) {
        case 'ArrowUp':
            playerY -= moveDistance;
            break;
        case 'ArrowDown':
            playerY += moveDistance;
            break;
        case 'ArrowLeft':
            playerX -= moveDistance;
            break;
        case 'ArrowRight':
            playerX += moveDistance;
            break;
    }

    // 캔버스를 지우고 다시 그립니다.
    update();
}

// 키보드 이벤트 리스너 등록
document.addEventListener('keydown', handleKeyDown);

