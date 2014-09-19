function player() {
	this.height = 35;
	this.width = 35;

	this.x = 100;
	this.y = canvasHeight-this.height;
	this.color = '#ff0000';

	this.health = 100;

	this.speed = 3;
	this.movement = new Movement();

	this.playerColor = 'red';

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
		canvas.fillText('Health: ' + this.health, this.x, (this.y + this.height) + 10);	

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
		canvas.fillStyle = this.playerColor;
		canvas.fillRect(this.x, this.y, this.width, this.height);

   		if (this.weapon) {
			if (!this.weapon.prototype.isSwinging) {
				this.weapon.prototype.x = (this.x + this.width) - (this.weapon.prototype.width / 2);
			}

			this.weapon.prototype.y = this.y + this.height - (this.weapon.prototype.height + this.weapon.prototype.height * 0.4);
   			
   			this.weapon.prototype.draw();

   		}

   		if (npcs) {
   			this.checkForNPCColission(npcs);
   		}
	}

	this.weapon = null;

	this.addSword = function () {
		this.weapon = new Sword();
	}

	this.addToStage = function () {
		drawableObjects.push(this);
	}

	this.decreaseHealth = function (amount, blinkTimer) {
		this.health -= amount;

		this.setBlinkInterval(blinkTimer);

		if (this.health <= 0) {
			console.log('player is kill');
		}
	}

	this.blinkInterval = null;
	this.setBlinkInterval = function (timeTotal) {
		if (!this.blinkInterval) {
			var timeRan = 0;
			var intvl = 100;
			
			this.blinkInterval = setInterval($.proxy(function () {
				this.playerColor = (this.playerColor == 'red') ? 'blue' : 'red';
				
				timeRan += intvl;
				if (timeRan >= timeTotal) {
					this.stopBlinkInterval();
				}
			}, this), intvl);
			
		}
	}

	this.stopBlinkInterval = function () {
		clearInterval(this.blinkInterval);
		this.blinkInterval = null;
	}

	this.addSword();
}