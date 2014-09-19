function Npc() {
	this.height = 35;
	this.width = 35;

	this.x = 300;
	this.y = 100;
	this.color = '#ffff00';
	this.isEnemy = true;
	this.NPCname = '';

	this.draw = function () {
		//Draw the character to the canvas
		canvas.fillStyle = this.color;
		canvas.fillRect(this.x, this.y, this.width, this.height);

		if (this.NPCname != "") {
			canvas.font = "14px Arial";
			canvas.fillStyle = '#000000';
			//canvas.translate((width - len)/2, 0);
			var nameStr = (this.isEnemy) ? this.NPCname + ' - ' + this.health : this.NPCname;
			canvas.fillText(nameStr, (this.x + this.width) + 10, this.y + (this.height/2));	
		}

		if (this.health <= 0) {
			this.die();
		}

	}

	this.showTextBubble = function (text) {
		var width = canvas.measureText(text).width;
		canvas.fillStyle = '#ffffff';
		canvas.fillRect(this.x, this.y - 50, width + 20, parseInt("14", 10) + 20);

		canvas.font = "14px Arial";
		canvas.fillStyle = '#000000';
		//canvas.translate((width - len)/2, 0);
		canvas.fillText(text, this.x + 10, this.y - 30);
	}

	this.die = function () {
		$(this).trigger('death');
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

	this.isCollidingWithEnemy = function (weapon) {

		var NPCstartX = this.x ;
		var NPCstartY = this.y ;
		var NPCendX = this.x + this.width;
		var NPCendY = this.y + this.height;

		var weaponStartX = weapon.x;
		var weaponStartY = weapon.y;
		var weaponEndX = weapon.x + weapon.width;
		var weaponEndY = weapon.y + weapon.height;

		//check for X-collision first. If they collide on X line, check if they collide on Y aswell

		if ((weaponStartX > NPCstartX && weaponStartX <= NPCendX) || weaponEndX > NPCstartX && weaponEndX <= NPCendX) {
			if ((weaponStartY > NPCstartY && weaponStartY <= NPCendY) || weaponEndY > NPCstartY && weaponEndY <= NPCendY) {
				
				$(this).trigger('weaponCollision', weapon);
				return true;
			}
		}

		$(this).trigger('noWeaponCollision');
		return false;
	}

	$(this).on('weaponCollision', $.proxy(function(e, weapon) {
		if (this.isEnemy) {
			this.health -= weapon.damage;

			weapon.hasHitWithSwing = true;
		}
	}, this));
}

function Shop() {

	this.prototype = new Npc(this);
	this.prototype.isEnemy = false;
	this.prototype.color = 'blue';
	this.prototype.NPCname = 'Ye ol shoppe';

	$(this.prototype).on('playerCollision', $.proxy(function () {
		this.prototype.showTextBubble('Ga eens heel rap wat kopen van mij');
	}, this));

	$(this.prototype).on('noPlayerCollision', $.proxy(function () {
		//this.hideTextBubble();
	}, this));


	this.prototype.addToStage();
}

function Barbarian() {

	this.prototype = new Npc(this);
	this.prototype.isEnemy = true;
	this.prototype.color = 'yellow';
	this.prototype.NPCname = 'Badass Barbarian';
	this.prototype.x = 25;
	this.prototype.y = 100;
	this.prototype.health = 100;

	this.damage = 10;
	this.lastTimePlayerHit = 0;
	this.playerHitAllowedTime = 2000;
	
	$(this.prototype).on('playerCollision', $.proxy(function () {
		var now = new Date().getTime();
		if (now > this.lastTimePlayerHit + this.playerHitAllowedTime) {
			this.doDamageToPlayer();
			this.lastTimePlayerHit = new Date().getTime();
		}
		this.prototype.color = 'blue';

	}, this));

	$(this.prototype).on('noPlayerCollision', $.proxy(function () {
		this.prototype.color = 'yellow';
	}, this));

	$(this.prototype).on('death', $.proxy(function () {
		this.prototype.showTextBubble('I is kill!');
	}, this));

	

	this.doDamageToPlayer = function () {
		if (Player) {
			Player.decreaseHealth(this.damage, this.playerHitAllowedTime);
		}
	}

	this.prototype.addToStage();
}