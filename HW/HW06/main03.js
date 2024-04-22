class DrawHeart {                 //DrawHeart 클래스 선언

  constructor(canvasId) {   //생성자, 캔버스 요소 불러오기
      this.canvas = document.getElementById(canvasId);
      this.ctx = this.canvas.getContext('2d');
      this.hearts = [];  // 하트 요소 저장 배열
      this.init();    // 마우스 이동 이벤트 추가 함수
  }

  init() {  // 마우스 따라 이동하는 이벤트 추가하고 애니메이션을 시작하는 함수
      this.canvas.addEventListener('mousemove', (event) => {   // 마우스가 이동하면
          const mouseX = event.clientX - this.canvas.getBoundingClientRect().left;  
          const mouseY = event.clientY - this.canvas.getBoundingClientRect().top;
          this.createHeart(mouseX, mouseY);
      });

      this.animate();
  }

  createHeart(x, y) {       // 이벤트가 발생한 마우스 커서의 위치를 전달받아서 하트 생성
      if (this.hearts.length < 100) {     // 100개 미만일 때 생성
          const size = Math.random() * 30 + 10; // 10~40 크기의 사이즈인데 안 먹히는 중
          const color = `rgb(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255})`; // RGB값 0~255 사이의 랜덤 색상
          const speed = Math.random() * 2 + 1; // 랜덤 이동속도
          const rotationSpeed = Math.random() * 0.1 - 0.05; // 랜덤 회전속도
          const directionX = Math.random() < 0.5 ? -1 : 1; // 랜덤 이동방향 X축
          const directionY = Math.random() < 0.5 ? -1 : 1; // 랜덤 이동방향 Y축
          const heart = {
              x,
              y,
              size,
              color,
              speed,
              rotationSpeed,
              directionX,
              directionY
          };
          this.hearts.push(heart);  // 배열 끝에 새로운 하트를 추가하는 코드
      }
  }

  drawHeart(x, y, size, color) {  // 하트 만드는 함수
      this.ctx.fillStyle = color;
      this.ctx.beginPath();

      this.ctx.moveTo(x, y + size / 4); // 시작점

      // 곡선 좌표 계산
      for (let i = 0; i < 360; i++) {
          const t = i * Math.PI / 180;
          const x = 16 * Math.pow(Math.sin(t), 3);
          const y = - (13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t));
          this.ctx.lineTo(x, y);
      }

      this.ctx.fill();
      this.ctx.closePath();
  }

  animate() {
      requestAnimationFrame(() => this.animate());  // 리퀘스트 애니메이션으로 애니메이트 함수 반복 호출
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);  // 캔버스 지워주기

      for (const heart of this.hearts) {
          heart.x += heart.speed * heart.directionX;
          heart.y += heart.speed * heart.directionY;
          heart.rotation += heart.rotationSpeed;  // 하트의 회전에 회전속도를 더하고 x, y에는 스피드와 각각 x, y방향을 곱하여 위치 업데이트
          

          if (heart.x > this.canvas.width + heart.size || heart.x < -heart.size ||
              heart.y > this.canvas.height + heart.size || heart.y < -heart.size) {
              this.hearts.splice(this.hearts.indexOf(heart), 1);
          }     // 하트의 x, y가 캔버스 화면 밖을 벗어나면 배열에서 없애줌

          this.ctx.save(); //저장
          this.ctx.translate(heart.x, heart.y); // 하트 위치식 대입
          this.ctx.rotate(heart.rotation); // 하트 회전식 대입
          this.drawHeart(0, 0, heart.size, heart.color); //저장된 사이즈, 컬러로 하트 그리기
          this.ctx.restore(); //초기화
      }
  }
}

const drawHeart = new DrawHeart("GameScreenCanvas"); // 클래스 코드들을 캔버스에서 실행시킴