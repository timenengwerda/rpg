function MeleeWeapon() {
	this.x = 0;
	this.y = 0;
	this.width = 22;
	this.height = 22;
	this.weaponColor = 'green';

	this.draw = function () {
		canvas.fillStyle = this.weaponColor;

		if (this.isSwinging) {
			this.x = this.x-8;

			if (this.x <= Player.x) {
				this.isSwinging = false;
				this.hasHitWithSwing = false;
			}

			if (npcs && !this.hasHitWithSwing) {
				this.checkForNPCColission(npcs);
			}
		}

		canvas.fillRect(this.x, this.y, this.width, this.height);
	}

	this.isSwinging = false;

	this.swing = function () {
		if (!this.isSwinging) {
			this.isSwinging = true;
		}
		
	}

	this.checkForNPCColission = function(npcs) {
		for (var i in npcs) {
			if (npcs[i].prototype.isEnemy) {
				npcs[i].prototype.isCollidingWithEnemy(this);
			}
		}
	}

	document.addEventListener('mousedown', $.proxy(this.swing, this));
}

function Sword() {
	this.prototype = new MeleeWeapon();
	this.prototype.width = 10;
	this.prototype.height = 65;

	this.prototype.damage = 10;

}