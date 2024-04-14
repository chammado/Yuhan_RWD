class HeartObject {
    constructor(x, y) {
      this.size = Math.random() * 30 + 10;
      this.color = this.getRandomColor();
      this.speed = Math.random() * 2 + 1;
      this.rotationSpeed = Math.random() * 5 + 1;
      this.direction = Math.random() * 360;
      this.element = this.createHeartElement();
      this.x = x;
      this.y = y;
    }
  
    getRandomColor() {
        const colors = ['#ea2027', '#009432', '#0652DD', '#F79F1F', '#EA2027', '#6F1E51'];
        return colors[Math.floor(Math.random() * colors.length)];
    }
    
  
    createHeartElement() {
        const heart = document.createElement('div');
        heart.className = 'make_heart ' + this.color; // 기본 클래스와 색상 클래스 추가
        document.body.appendChild(heart);
    
        // 배경색 설정
        heart.style.backgroundColor = this.color;
    
        return heart;
    }
    
    
    
  
    move() {
        this.x += this.speed * Math.cos(this.direction * Math.PI / 180);
        this.y += this.speed * Math.sin(this.direction * Math.PI / 180);
        this.element.style.transform = `translate(${this.x}px, ${this.y}px) rotate(${this.rotationSpeed}deg)`;
      }
    
      remove() {
        this.element.remove();
      }
    
    
    
  
    remove() {
      this.element.remove();
    }
  }
  
  const hearts = [];
  
  document.addEventListener('mousemove', (e) => {
    if (hearts.length < 100) {
      const heart = new HeartObject(e.clientX, e.clientY);
      hearts.push(heart);
    }
  });
  
  function animate() {
    for (let i = 0; i < hearts.length; i++) {
      hearts[i].move();
    }
    requestAnimationFrame(animate);
  }
  
  animate();