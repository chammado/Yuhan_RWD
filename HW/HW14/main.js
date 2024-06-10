var canvas = document.getElementById("MidtermGame");
var ctx = canvas.getContext("2d");

var centerX = canvas.width / 2;
var centerY = canvas.height / 2;
var angle = 0.0;
var click = false;

function drawTriangle() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.save();
    ctx.translate(centerX, centerY);
    ctx.rotate(angle);

    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(200, 0);
    ctx.lineTo(200, -200);
    ctx.closePath();

    if (click) {
        ctx.fillStyle = 'red';
    } else {
        ctx.fillStyle = 'blue';
    }
    ctx.fill();
    ctx.restore();
}

function isPointInTriangle(px, py, x1, y1, x2, y2, x3, y3) 
{
    var areaOrig = Math.abs((x1 * (y2 - y3) + x2 * (y3 - y1) + x3 * (y1 - y2)) / 2.0);
    var area1 = Math.abs((px * (y2 - y3) + x2 * (y3 - py) + x3 * (py - y2)) / 2.0);
    var area2 = Math.abs((x1 * (py - y3) + px * (y3 - y1) + x3 * (y1 - py)) / 2.0);
    var area3 = Math.abs((x1 * (y2 - py) + x2 * (py - y1) + px * (y1 - y2)) / 2.0);
    return (area1 + area2 + area3 == areaOrig);
}

function rotatePoint(px, py, angle) {
    var cos = Math.cos(angle);
    var sin = Math.sin(angle);
    return {
        x: px * cos - py * sin,
        y: px * sin + py * cos
    };
}

canvas.addEventListener("click", function(event) {
    var rect = canvas.getBoundingClientRect();
    var mouseX = event.clientX - rect.left;
    var mouseY = event.clientY - rect.top;

    var transformedX = mouseX - centerX;
    var transformedY = mouseY - centerY;

    var rotatedPoint = rotatePoint(transformedX, transformedY, -angle);

    if (isPointInTriangle(rotatedPoint.x, rotatedPoint.y, 0, 0, 200, 0, 200, -200)) {
        click = !click;
        drawTriangle();
    }
});

function rotateTriangle() {
    angle += Math.PI / 180; 
    drawTriangle();
}

setInterval(rotateTriangle, 10);

drawTriangle();