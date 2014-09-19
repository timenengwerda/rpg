function Npc() {
	this.height = 35;
	this.width = 35;

	this.x = 300;
	this.y = 100;
	this.color = '#ffff00';
	this.isSolid = true;
	this.NPCname = '';

	this.draw = function () {
		//Draw the character to the canvas
		canvas.fillStyle = this.color;
		canvas.fillRect(this.x, this.y, this.width, this.height);

		if (this.NPCname != "") {
			canvas.font = "14px Arial";
			canvas.fillStyle = '#000000';
			//canvas.translate((width - len)/2, 0);
			canvas.fillText(this.NPCname, (this.x + this.width) + 10, this.y + (this.height/2));	
		}

	}

	this.addToStage = function () {
		drawableObjects.push(this);
	}

	this.isCollidingWithPlayer = function (player) {

		var NPCstartX = this.x;
		var NPCstartY = this.y;
		var NPCendX = this.x + this.width;
		var NPCendY = this.y + this.height;

		var playerStartX = player.x;
		var playerStartY = player.y;
		var playerEndX = player.x + player.width;
		var playerEndY = player.y + player.height;

		//check for X-collision first. If they collide on X line, check if they collide on Y aswell
		if ((playerStartX > NPCstartX && playerStartX <= NPCendX) || playerEndX > NPCstartX && playerEndX <= NPCendX) {
			if ((playerStartY > NPCstartY && playerStartY <= NPCendY) || playerEndY > NPCstartY && playerEndY <= NPCendY) {
				$(this).trigger('playerCollision');
				return true;
			}
		}

		$(this).trigger('noPlayerCollision');
		return false;
	}
}

function Shop() {

	this.prototype = new Npc(this);
	this.prototype.isSolid = false;
	this.prototype.color = 'blue';
	this.prototype.NPCname = 'Ye ol shoppe';

	$(this.prototype).on('playerCollision', $.proxy(function () {
		this.showTextBubble('Ga eens heel rap wat kopen van mij');
	}, this));

	$(this.prototype).on('noPlayerCollision', $.proxy(function () {
		//this.hideTextBubble();
	}, this));

	this.showTextBubble = function (text) {
		var width = canvas.measureText(text).width;
		canvas.fillStyle = '#ffffff';
		canvas.fillRect(this.prototype.x - 50, this.prototype.y - 50, width + 20, parseInt("14", 10) + 20);

		canvas.font = "14px Arial";
		canvas.fillStyle = '#000000';
		//canvas.translate((width - len)/2, 0);
		canvas.fillText(text, this.prototype.x - 40, this.prototype.y - 30);
	}

	this.prototype.addToStage();
}