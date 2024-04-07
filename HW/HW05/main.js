var canvas = document.getElementById("GameScreenCanvas");
var ctx = canvas.getContext("2d");

draw();

var a = 0; // 태양의 회전 각도
var b = 0; // 지구의 공전 각도
var c = 0; // 달의 공전 각도
var d = 0; // 지구의 자전 각도
var e = 0; // 달의 자전각도

function draw()
{
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // 태양
    a += Math.PI / 100;
    ctx.save();
    ctx.fillStyle= "red";
    ctx.translate(canvas.width / 2, canvas.height / 2);
    ctx.rotate(a);
    ctx.fillRect(-50,-50,100,100);
    ctx.restore();

    // 지구
    b += Math.PI / -200; 
    d += Math.PI / 150; 
    ctx.save();
    ctx.fillStyle= "blue";
    var earthRadius = 250; 
    var earthX = canvas.width / 2 + Math.cos(b) * earthRadius; 
    var earthY = canvas.height / 2 + Math.sin(b) * earthRadius;
    ctx.translate(earthX, earthY);
    ctx.rotate(d); 
    ctx.fillRect(-25,-25,50,50);
    ctx.restore();

    // 달
    c += Math.PI / 100;
    e += Math.PI / 80;
    ctx.save();
    ctx.fillStyle= "gray";
    var moonRadius = 100; 
    var moonX = earthX + Math.cos(c) * moonRadius; 
    var moonY = earthY + Math.sin(c) * moonRadius;
    ctx.translate(moonX, moonY);
    ctx.rotate(e)
    ctx.fillRect(-12.5,-12.5,25,25);
    ctx.restore();

    requestAnimationFrame(draw);
}
