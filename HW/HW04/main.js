var canvas = document.getElementById("GameScreenCanvas");
var ctx = canvas.getContext("2d");

var studentID = 202127073;


function drawNum(num) 
{
    var digits = num.toString().split(''); 
    var startX = 50; 
    var startY = 100; 
    var lineHeight = 150; 
    var digitWidth = 150; 
    var guri = 20; 

    
    for (var i = 0; i < digits.length; i++) 
    {
        var digit = parseInt(digits[i], 10); 
        switch (digit) 
        {
            case 0:
                drawZero(startX, startY, lineHeight, digitWidth);
                break;
            case 1:
                drawOne(startX, startY, lineHeight, digitWidth);
                break;
            case 2:
                drawTwo(startX, startY, lineHeight, digitWidth);
                break;
            case 3:
                drawThree(startX, startY, lineHeight, digitWidth);
                break;
            case 4:
                drawFour(startX, startY, lineHeight, digitWidth);
                break;
            case 5:
                drawFive(startX, startY, lineHeight, digitWidth);
                break;
            case 6:
                drawSix(startX, startY, lineHeight, digitWidth);
                break;
            case 7:
                drawSeven(startX, startY, lineHeight, digitWidth);
                break;
            case 8:
                drawEight(startX, startY, lineHeight, digitWidth);
                break;
            case 9:
                drawNine(startX, startY, lineHeight, digitWidth);
                break;
        }
        startX += digitWidth + guri;
    }
}

function drawZero(x, y, height, width) 
{
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x + width, y);
    ctx.lineTo(x + width, y + height);
    ctx.lineTo(x, y + height);
    ctx.lineTo(x, y);
    ctx.lineTo(x + width, y);
    ctx.lineTo(x , y+width);
    ctx.stroke();
    ctx.closePath();
}

function drawOne(x, y, height, width) 
{
    ctx.beginPath();
    ctx.moveTo(x + width / 2, y);
    ctx.lineTo(x + width / 2, y + height);
    ctx.stroke();
    ctx.closePath();
}

function drawTwo(x, y, height, width) 
{
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x + width, y);
    ctx.lineTo(x + width, y + height / 2);
    ctx.lineTo(x, y + height / 2);
    ctx.lineTo(x, y + height);
    ctx.lineTo(x + width, y + height);
    ctx.stroke();
    ctx.closePath();
}

function drawThree(x, y, height, width) 
{
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x + width, y);
    ctx.lineTo(x + width, y + height);
    ctx.lineTo(x, y + height);
    ctx.stroke();
    ctx.closePath();

    ctx.beginPath();
    ctx.moveTo(x, y + height / 2);
    ctx.lineTo(x + width, y + height / 2);
    ctx.stroke();
    ctx.closePath();
}

function drawFour(x, y, height, width) 
{
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x, y + height / 2);
    ctx.lineTo(x + width, y + height / 2);
    ctx.stroke();
    ctx.closePath();

    ctx.beginPath();
    ctx.moveTo(x + width, y);
    ctx.lineTo(x + width, y + height);
    ctx.stroke();
    ctx.closePath();
}

function drawFive(x, y, height, width) 
{
    ctx.beginPath();
    ctx.moveTo(x + width, y);
    ctx.lineTo(x, y);
    ctx.lineTo(x, y + height / 2);
    ctx.lineTo(x + width, y + height / 2);
    ctx.lineTo(x + width, y + height);
    ctx.lineTo(x, y + height);
    ctx.stroke();
    ctx.closePath();
}

function drawSix(x, y, height, width) 
{
    ctx.beginPath();
    ctx.moveTo(x + width, y);
    ctx.lineTo(x, y);
    ctx.lineTo(x, y + height);
    ctx.lineTo(x + width, y + height);
    ctx.lineTo(x + width, y + height / 2);
    ctx.lineTo(x, y + height / 2);
    ctx.stroke();
    ctx.closePath();
}

function drawSeven(x, y, height, width) 
{
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x + width, y);
    ctx.lineTo(x + width / 2, y + height);
    ctx.stroke();
    ctx.closePath();
}

function drawEight(x, y, height, width) 
{
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x + width, y);
    ctx.lineTo(x + width, y + height);
    ctx.lineTo(x, y + height);
    ctx.lineTo(x, y);
    ctx.stroke();
    ctx.closePath();

    ctx.beginPath();
    ctx.moveTo(x, y + height / 2);
    ctx.lineTo(x + width, y + height / 2);
    ctx.stroke();
    ctx.closePath();
}

function drawNine(x, y, height, width) 
{
    ctx.beginPath();
    ctx.moveTo(x +width, y + height / 2);
    ctx.lineTo(x, y + height / 2);
    ctx.lineTo(x,y);
    ctx.lineTo(x+width, y);
    ctx.lineTo(x+width, y + height/2);
    ctx.lineTo(x + width, y + height);
    ctx.lineTo(x ,y+height)
    ctx.stroke();
    ctx.closePath();
}

drawNum(studentID);