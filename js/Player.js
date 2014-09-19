function player() {
	this.height = 35;
	this.width = 35;

	this.x = 100;
	this.y = canvasHeight-this.height;
	this.color = '#ff0000';

	this.speed = 3;
	this.movement = new Movement();

	//This is set so it can be reset to the default(given above here)
	this.playerSpeed = this.speed;

	this.checkForNPCColission = function(npcs) {
		for (var i in npcs) {
			npcs[i].prototype.isCollidingWithPlayer(this);
		}
	}

	this.draw = function() {
		canvas.font = "14px Arial";
		canvas.fillStyle = '#000000';
		//canvas.translate((width - len)/2, 0);
		canvas.fillText('Pisvlek', this.x, this.y - 10);	

		if (this.movement.up == true) {
			this.y = this.y-(1*this.speed);
		}
	
		if (this.movement.down == true) {
			this.y = this.y+(1*this.speed);
		}

		//Moving left
		if (this.movement.left == true) {
			this.x = this.x-(1*this.speed);
			//Collission of frame
			if (this.x <= 0) {
				this.x = 0;
			}
		}

		//Moving right
		if (this.movement.right == true) {
			this.x = this.x+(1*this.speed);
			//Collission of frame
			if (this.x >= canvasWidth-this.width) {
				this.x = canvasWidth-this.width;
			}
		}

		//Draw the character to the canvas
		canvas.fillStyle = this.color;
   		canvas.fillRect(this.x, this.y, this.width, this.height);

   		if (npcs) {
   			this.checkForNPCColission(npcs);
   		}
	}

	this.addToStage = function () {
		drawableObjects.push(this);
	}
}