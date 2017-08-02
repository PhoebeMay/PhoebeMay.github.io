document.addEventListener('DOMContentLoaded',domloaded,false);
function domloaded(){

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
	var x = canvas.width/2 - squaresWidth/2;
	var y = canvas.height/2 - squaresWidth/2;
	var dx = 4;
	var dy = 4;

	var rightPressed = false;
	var leftPressed = false;
	var upPressed = false;
	var downPressed = false;

	var attackers = [];
	var attackersCount = 0;

	var drawAnimation;

	function draw() {

		//drawAnimation = requestAnimationFrame(draw);

	    ctx.clearRect(0, 0, canvas.width, canvas.height);


	    ctx.fillStyle = "grey";
		ctx.fillText(attackersCount,10,30);

	    drawMe();

	    drawAttackers();

	    collisionDetection();

	    moveMe();

	    moveAttackers();






	}

	function moveAttackers(){

		for(i=0; i<attackers.length; i++) {

			if(attackers[i].x  + squaresWidth> canvas.width || attackers[i].x < 0) {
				    attackers[i].dx = -attackers[i].dx;
			}

			if(attackers[i].y  + squaresWidth > canvas.height || attackers[i].y < 0) {
				    attackers[i].dy = -attackers[i].dy;
			}

			attackers[i].x += attackers[i].dx;
			attackers[i].y += attackers[i].dy;
		}
	}

	function drawAttackers() {
		for(i=0; i<attackers.length; i++) {
			ctx.beginPath();
		    ctx.rect(attackers[i].x, attackers[i].y, squaresWidth, squaresWidth);
		    ctx.fillStyle = attackers[i].color;
		    ctx.fill();
		    ctx.closePath();

		}
	}

	function moveMe(){

		if(rightPressed && x + squaresWidth < canvas.width) {
		    x += dx;
		}

		if(leftPressed && x>0) {
		    x -= dx;
		}

		if (upPressed && y>0) {
			y = y - dy;
		}

		if (downPressed && y + squaresWidth < canvas.height) {
			y = y + dy;
		}
	}

	function drawMe() {
	    ctx.beginPath();
	    ctx.rect(x, y, squaresWidth, squaresWidth);
	    ctx.fillStyle = "red";
	    ctx.fill();
	    ctx.closePath();
	}

	function spawnAttacker() {
		var newSquare = {x: Math.random()*(canvas.width - squaresWidth), y: canvas.height - squaresWidth, dx: (Math.random()-0.5)*2, dy: (Math.random()-0.5)*2, color: '#'+(Math.random()*0xFFFFFF<<0).toString(16)};
		attackers.push(newSquare);
		attackersCount++;
	}


	function keyDownHandler(e) {

		switch(e.keyCode) {
		    case 37:
		        leftPressed = true;
		        break;
		    case 38:
		        upPressed = true;
		        break;
		    case 39:
		     	rightPressed = true;
		     	break;
		    case 40:
		    	downPressed = true;
		    	break;
		    default:
		        break;
		}
	}

	function keyUpHandler(e) {
		switch(e.keyCode) {
		    case 37:
		        leftPressed = false;
		        break;
		    case 38:
		        upPressed = false;
		        break;
		    case 39:
		     	rightPressed = false;
		     	break;
		    case 40:
		    	downPressed = false;
		    	break;
		    default:
		        break;
		}
	}

	function collisionDetection() {
		for(i=0; i<attackers.length; i++) {
			if (x + squaresWidth >= attackers[i].x && x<attackers[i].x + squaresWidth && y + squaresWidth >= attackers[i].y && y < attackers[i].y + squaresWidth){
				gameOver();
			}
		}
	}

	function gameOver() {
				clearInterval(drawInterval);
				//cancelAnimationFrame(drawAnimation);
				clearInterval(spawnInterval);
		        ctx.fillStyle = "red";
		        ctx.textAlign = 'center';
		        ctx.font = '40px' + ' ' + fontArgs[fontArgs.length - 1];
				ctx.fillText("Game Over :(",canvas.width/2,canvas.height/2 -20);
				ctx.fillStyle = 'grey';
				ctx.font = '30px' + ' ' + fontArgs[fontArgs.length - 1];
				ctx.fillText("Your score was " + attackersCount ,canvas.width/2,canvas.height/2 +20);
				ctx.textAlign = 'start';
	}


	document.addEventListener("keydown", keyDownHandler, false);
	document.addEventListener("keyup", keyUpHandler, false);
	drawInterval = setInterval(draw, 10);

	//draw();

	spawnInterval = setInterval(spawnAttacker, 1000);


}

window.addEventListener('resize', function(e) {
	if ($(window).height() <= 760) {
		document.getElementById("header").style.display = 'none';
	}
	else {
		document.getElementById("header").style.display = 'block';
	}
}, false);

function newGame(){
		document.location.reload();
		button1.style.display = 'none';
}
