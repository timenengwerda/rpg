var canvas = null;
var canvasWidth = 0;
var canvasHeight = 0;

var Player = null;
$(document).ready(function () {
	init();
});
var npcs = [];

function init(){
	canvas = getCanvas();
	if (typeof canvas == 'object') {
		canvasWidth = canvas.canvas.clientWidth;
		canvasHeight = canvas.canvas.clientHeight;

		//player with lowercase for new object. I think Player is reserved or something >_<
		npcs.push(new Shop());
		npcs.push(new Barbarian());

		Player = new player();
		Player.addToStage();
		

		startFrameloop();
	} else {
		die(canvas);
	}
}

var looper;
function startFrameloop() {
	window.requestAnimFrame = (function(){
		return  window.requestAnimationFrame       ||
		window.webkitRequestAnimationFrame ||
		window.mozRequestAnimationFrame    ||
		function( callback ){
			window.setTimeout(callback, 1000 / 30);
		};
	})();

	window.cancelRequestAnimFrame = ( function() {
		return window.cancelAnimationFrame          ||
		window.webkitCancelRequestAnimationFrame    ||
		window.mozCancelRequestAnimationFrame       ||
		window.oCancelRequestAnimationFrame     ||
		window.msCancelRequestAnimationFrame        ||
		clearTimeout
	} )();

	(function animloop(){
		looper = requestAnimFrame(animloop);
		refreshLoop();
	})();
}

var i = 0;
function refreshLoop() {
	canvas.draw();
}

function stopLoop() {
	cancelRequestAnimFrame(looper);
}

var drawableObjects = [];
function drawObjectsFromArray() {
	for (var i in drawableObjects) {
		drawableObjects[i].draw();
	}
}

function getCanvas() {
	var error = '';
	var x = document.getElementById('scene');
	if (x != null) {
		var context = x.getContext("2d");
		if (context) {
			context.draw = function (){
				canvas.fillStyle = 'pink';
				canvas.fillRect(0, 0, canvasWidth, canvasHeight);
				
				drawObjectsFromArray();
				//Player.move();
			}
			return context;
		} else {
			error = 'Canvas not found';
		}
	} else {
		error = 'Context not found';
	}

	return error;
}

function die(message) {
	document.getElementById('error').innerHTML = message;
}