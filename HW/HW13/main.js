var canvas = document.getElementById("MidtermGame");
var ctx = canvas.getContext("2d");

var centerX = canvas.width / 2;
var centerY = canvas.height / 2;
var triangleWidth = 150;
var triangleHeight = 150;
var angle = 0; 
var isRed = false; 

function drawTriangle() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.save();
    ctx.translate(centerX, centerY);
    ctx.rotate(angle);

    ctx.beginPath();
    ctx.moveTo(-triangleWidth / 2, -triangleHeight / 2);
    ctx.lineTo(triangleWidth / 2, -triangleHeight / 2);
    ctx.lineTo(0, triangleHeight / 2);
    ctx.closePath();
    
    if (isRed) 
    {
        ctx.fillStyle = "red";
    } else {
        ctx.fillStyle = "blue";
    }
    ctx.fill();
    
    ctx.restore();
    
    angle += 0.02; 
    
    requestAnimationFrame(drawTriangle);
}


canvas.addEventListener("click", function(event) 
{
    var x = event.clientX - canvas.offsetLeft;
    var y = event.clientY - canvas.offsetTop;
    
    if (x >= centerX - triangleWidth / 2 && x <= centerX + triangleWidth / 2 &&
        y >= centerY - triangleHeight / 2 && y <= centerY + triangleHeight / 2) 
    {
        isRed = true;
    } else 
    {
        isRed = false;
    }
});

drawTriangle();
