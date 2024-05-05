document.addEventListener("DOMContentLoaded", function() {
    const rotateButton = document.getElementById("myButton");
    const title = document.getElementById("title");
    const heartCanvas = new HeartCanvas('myCanvas'); // 클래스 인스턴스 생성

    // 초기에는 버튼만 보이도록 설정
    rotateButton.style.display = "block";
    title.style.display = "block";
    heartCanvas.hideShapes(); // 하트와 별 가리기

    // 버튼 클릭 이벤트 리스너
    rotateButton.addEventListener("click", function() {
        // 버튼 숨기기
        rotateButton.style.display = "none";
        // 제목 숨기기
        title.style.display = "none";
        // 애니메이션 실행
        animate();
    });

    // 애니메이션 함수 호출
    function animate() {
        // 하트와 별 가리기
        heartCanvas.hideShapes();
        // 애니메이션 실행
        function animateCanvas() {
            heartCanvas.ctx.clearRect(0, 0, heartCanvas.canvas.width, heartCanvas.canvas.height);
            heartCanvas.drawStar();
            heartCanvas.rotateHeart();
            requestAnimationFrame(animateCanvas);
        }
        animateCanvas(); // 애니메이션 실행
    }

    // 버튼 위로 마우스를 올리면 색상 변경
    rotateButton.addEventListener("mouseover", function() {
        rotateButton.style.backgroundColor = "green";
    });

    // 마우스가 버튼을 벗어나면 색상 원래대로 변경
    rotateButton.addEventListener("mouseout", function() {
        rotateButton.style.backgroundColor = "";
    });

    // 마우스 다운 이벤트가 발생하면 색상 변경
    rotateButton.addEventListener("mousedown", function() {
        rotateButton.style.backgroundColor = "blue";
    });

    // 마우스 업 이벤트가 발생하면 색상 원래대로 변경
    rotateButton.addEventListener("mouseup", function() {
        rotateButton.style.backgroundColor = "";
    });
});

class HeartCanvas {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        this.ctx = this.canvas.getContext('2d');
        this.canvas.width = 600;
        this.canvas.height = 800;

        this.starX = Math.random() * this.canvas.width;
        this.starY = Math.random() * this.canvas.height;
        this.heartAngle = 0; // 하트 회전 각도

        this.drawHeart();
        this.drawStar();

        // 키보드 이벤트 리스너 추가
        document.addEventListener('keydown', (event) => this.handleKeyDown(event));
    }

    drawHeart() {
        const x = this.canvas.width / 2;  // 하트 위치
        const y = this.canvas.height / 2;  // 하트 위치
        const size = 50;  // 하트 크기
    
        this.ctx.fillStyle = '#C00000';  // 채우기 색상 설정
        this.ctx.strokeStyle = '#000000'; // 테두리 색상을 검은색으로 설정
        this.ctx.beginPath();
      
        this.ctx.moveTo(x, y + size / 4); // 시작점
      
        // 곡선 좌표 계산
        for (let i = 0; i < 360; i++) {
            const t = i * Math.PI / 180;
            const px = 16 * Math.pow(Math.sin(t), 3);
            const py = - (13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t));
            this.ctx.lineTo(px + x, py + y);
        }
      
        this.ctx.closePath();
        
        this.ctx.stroke(); // 테두리 그리기
        this.ctx.fill();
    }

    drawStar() {
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

    handleKeyDown(event) {
        console.log('Key down:', event.key);

        const moveDistance = 10;

        switch (event.key) {
            case 'ArrowUp':
                this.starY += moveDistance;
                break;
            case 'ArrowDown':
                this.starY -= moveDistance;
                break;
            case 'ArrowLeft':
                this.starX += moveDistance;
                break;
            case 'ArrowRight':
                this.starX -= moveDistance;
                break;
        }

        // 캔버스 지우고 다시 그리기
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.drawHeart();
        this.drawStar();
    }

    rotateHeart() {
        const x = this.canvas.width / 2;
        const y = this.canvas.height / 2;

        this.ctx.save();
        this.ctx.translate(x, y); // 하트의 중심으로 이동
        this.ctx.rotate(this.heartAngle);
        this.ctx.translate(-x, -y); // 원래 위치로 이동
        this.drawHeart();
        this.ctx.restore();

        this.heartAngle += Math.PI / 100;
    }

    hideShapes() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
}