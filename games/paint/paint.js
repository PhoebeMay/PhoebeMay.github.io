document.addEventListener('DOMContentLoaded',domloaded,false);

function domloaded(){

	console.log($(window).height());
	if ($(window).height() <= 760) {
		document.getElementById("header").style.display = 'none';
	}

	var canvas = document.getElementById("myCanvas");
	var ctx = canvas.getContext("2d");
	var painting = false;
	var px = canvas.offsetLeft;
	var py = canvas.offsetTop;
	var drawing = false;
	document.onmousemove = handleMouseMove;
	document.onmousedown = handleMouseClick;

	function handleMouseMove(e){
		draw(e.pageX, e.pageY);
	}


	function draw(x, y){

		if (drawing) {

			ctx.beginPath();
			ctx.moveTo(px - canvas.offsetLeft ,py - canvas.offsetTop);
			ctx.lineTo(x - canvas.offsetLeft ,y - canvas.offsetTop);
			ctx.stroke();
			ctx.closePath();

			px = x;

			py = y;
		}
	}

	function handleMouseClick(e){
		drawing = !drawing ;
		px = e.pageX;
		py = e.pageY;
	}
}

window.addEventListener('resize', function(e) {
	if ($(window).height() <= 760) {
		document.getElementById("header").style.display = 'none';
	}
	else {
		document.getElementById("header").style.display = 'block';
	}
}, false);
