document.addEventListener('DOMContentLoaded', domloaded, false);

function domloaded() {

  console.log($(window).height());
  if ($(window).height() <= 760) {
    document.getElementById("header").style.display = 'none';
  }

  var canvas = document.getElementById("myCanvas");
  var button1 = document.getElementById('button1');
  var refreshIntervalId;
  var ctx = canvas.getContext("2d");
  var cFont = ctx.font;
  var fontArgs = ctx.font.split(' ');
  ctx.font = '30px' + ' ' + fontArgs[fontArgs.length - 1]; /// using the last part

  var squaresWidth = 25;
  var x = canvas.width / 2 - squaresWidth / 2;
  var y = canvas.height / 2 - squaresWidth / 2;
  var dx = (Math.random() - 0.5) * 10;
  var dy = (Math.random() - 0.5) * 10;

  var paddleWidth = 50;
  var paddleHeight = 5;

  ctx.fillStyle = '#595959';

  var p1x = canvas.width / 2;
  var p2x = canvas.width / 2;
  var p1y = 0;
  var p2y = canvas.height - paddleHeight;

  var rightPressed = false;
  var leftPressed = false;

  var aPressed = false;
  var dPressed = false;

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawPut();
    drawPaddles();
    movePut();
    moveP1();
    moveP2();
  }

  function drawPut() {
    ctx.beginPath();
    ctx.rect(x, y, squaresWidth, squaresWidth);
    ctx.fill();
    ctx.closePath();
  }

  function drawPaddles() {
    ctx.beginPath();
    ctx.rect(p1x, p1y, paddleWidth, paddleHeight);
    ctx.fill();
    ctx.closePath();

    ctx.beginPath();
    ctx.rect(p2x, p2y, paddleWidth, paddleHeight);
    ctx.fill();
    ctx.closePath();
  }

  function movePut() {

    //Bounce off sides
    if (x + squaresWidth > canvas.width || x < 0) {
      dx = -dx;
    }

    //Bouncing off paddles or ending game
    if (y + squaresWidth > canvas.height) {

      if (x + squaresWidth > p2x && x < p2x + paddleWidth) {
        dy = -dy
      } else {
        gameOver();
      }
    }

    if (y < 0) {

      if (x + squaresWidth > p1x && x < p1x + paddleWidth) {
        dy = -dy
      } else {
        gameOver();
      }
    }

    y += dy;
    x += dx;
  }

  function moveP1() {
    if (dPressed && p1x + squaresWidth < canvas.width) {
      p1x += 5;
    }

    if (aPressed && p1x > 0) {
      p1x -= 5;
    }
  }

  function moveP2() {
    if (rightPressed && p2x + squaresWidth < canvas.width) {
      p2x += 5;
    }

    if (leftPressed && p2x > 0) {
      p2x -= 5;
    }
  }

  function keyDownHandler(e) {

    switch (e.keyCode) {
      case 37:
        leftPressed = true;
        break;
      case 39:
        rightPressed = true;
        break;
      case 65:
        aPressed = true;
        break;
      case 68:
        dPressed = true;
        break;
      default:
        break;
    }
  }

  function keyUpHandler(e) {
    switch (e.keyCode) {
      case 37:
        leftPressed = false;
        break;
      case 39:
        rightPressed = false;
        break;
      case 65:
        aPressed = false;
        break;
      case 68:
        dPressed = false;
        break;
      default:
        break;
    }
  }

  function gameOver() {
    clearInterval(drawInterval);
    ctx.fillStyle = "red";
    ctx.textAlign = 'center';
    ctx.font = '40px' + ' ' + fontArgs[fontArgs.length - 1];
    ctx.fillText("Game Over :(", canvas.width / 2, canvas.height / 2);
    ctx.textAlign = 'start';
  }

  document.addEventListener("keydown", keyDownHandler, false);
  document.addEventListener("keyup", keyUpHandler, false);
  drawInterval = setInterval(draw, 10);
}

function newGame() {
  document.location.reload();
  button1.style.display = 'none';
}

window.addEventListener('resize', function(e) {
  if ($(window).height() <= 760) {
    document.getElementById("header").style.display = 'none';
  } else {
    document.getElementById("header").style.display = 'block';
  }
}, false);
