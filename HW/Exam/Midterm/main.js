class HeartCanvas {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        this.ctx = this.canvas.getContext('2d');
        this.canvas.width = 600;
        this.canvas.height = 800;

        this.heartX = this.canvas.width / 2;
        this.heartY = this.canvas.height / 2;

        this.starX = Math.random() * this.canvas.width;
        this.starY = Math.random() * this.canvas.height;
        this.heartAngle = 0; // 하트 회전 각도

        this.drawHeart();
        this.drawStar();

        // 키보드 이벤트 리스너 추가
        document.addEventListener('keydown', (event) => this.handleKeyDown(event));
    }

    drawHeart() {
        const x = this.heartX;  // 하트 위치
        const y = this.heartY;  // 하트 위치
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
                this.starY -= moveDistance;
                break;
            case 'ArrowDown':
                this.starY += moveDistance;
                break;
            case 'ArrowLeft':
                this.starX -= moveDistance;
                break;
            case 'ArrowRight':
                this.starX += moveDistance;
                break;
        }

        // 캔버스 지우고 다시 그리기
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.drawHeart();
        this.drawStar();
    }

    rotateHeart() {
        this.ctx.save();
        this.ctx.translate(this.heartX, this.heartY); // 하트의 중심으로 이동
        this.ctx.rotate(this.heartAngle);
        this.ctx.translate(-this.heartX, -this.heartY); // 원래 위치로 이동
        this.drawHeart();
        this.ctx.restore();

        this.heartAngle += Math.PI / 100;
    }
}

const heartCanvas = new HeartCanvas('myCanvas');

function animate() {
    heartCanvas.ctx.clearRect(0, 0, heartCanvas.canvas.width, heartCanvas.canvas.height);
    heartCanvas.drawStar();
    heartCanvas.rotateHeart();
    requestAnimationFrame(animate);
}

animate();