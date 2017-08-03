document.addEventListener('DOMContentLoaded', domloaded, false);

var canvas;
var ctx;
var color;

function domloaded() {

  document.getElementById("pen-color").style.display = 'none';

  canvas = document.getElementById("myCanvas");
  ctx = canvas.getContext("2d");
  var painting = false;
  var px = canvas.offsetLeft;
  var py = canvas.offsetTop;
  var drawing = false;
  document.onmousemove = handleMouseMove;
  document.onmousedown = handleMouseClick;

  function handleMouseMove(e) {
    draw(e.pageX, e.pageY);
  }

  function draw(x, y) {

    if (drawing) {

      ctx.beginPath();
      ctx.moveTo(px - canvas.offsetLeft, py - canvas.offsetTop);
      ctx.lineTo(x - canvas.offsetLeft, y - canvas.offsetTop);
      ctx.stroke();
      ctx.closePath();

      px = x;

      py = y;
    }
  }

  function handleMouseClick(e) {
    drawing = !drawing;
    px = e.pageX;
    py = e.pageY;
  }
}

function colorBarToggle() {
  var colorBar = document.getElementById("pen-color");
  if (colorBar.style.display === 'none') {
    colorBar.style.display = 'block';
  } else {
    colorBar.style.display = 'none';
  }
}

function redPen() {
  ctx.strokeStyle = 'red';
}

function changePenColor(jscolor) {
  ctx.strokeStyle = "#" + jscolor;
}
