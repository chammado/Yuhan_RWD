var canvas = document.getElementById("GameScreenCanvas");
var ctx = canvas.getContext("2d");


draw();

var radius= 50;

function draw()
{
    
    ctx.beginPath();
    for (var angle = 0; angle < Math.PI * 2; angle += 0.01) {
      var x = 200 + radius * Math.cos(angle);
      var y = 200 + radius * Math.sin(angle);
      ctx.lineTo(x, y);
    }
    ctx.fillStyle = 'blue';
    ctx.fill();
    ctx.closePath();

    requestAnimationFrame(draw);
}
