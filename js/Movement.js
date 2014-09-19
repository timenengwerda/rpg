function Movement() {
	this.up = false;
	this.down = false;
	this.left = false;
	this.right = false; 

	this.keyUp = function(e) {
		keyCode = (e.keyCode ? e.keyCode : e.which);

		if (keyCode == 37 || keyCode == 65) {
			this.left = false;
		}

		//spacebar
		if (keyCode == 32) {
		}

		if (keyCode == 39 || keyCode == 68) {
			this.right = false;
		}

		if (keyCode == 32 || keyCode == 87) {
			this.up = false;
		}

		if (keyCode == 40 || keyCode == 83) {
			this.down = false;
		}

		this.isDiagonal = false;
	}

	this.forceStopMoving = function() {
		this.left = false;
		this.up = false;
		this.right = false;
		this.down = false;
	}


	this.keyDown = function(e) {
		keyCode = (e.keyCode ? e.keyCode : e.which);
		if (keyCode == 37 || keyCode == 65) {
			this.left = true;
		}

		if (keyCode == 32 || keyCode == 87) {
			this.up = true;
		}

		if (keyCode == 39 || keyCode == 68) {
			this.right = true;
		}

		if (keyCode == 40 || keyCode == 83) {
			this.down = true;
		}

		$(this).trigger('move');
	}

	document.addEventListener('keyup', $.proxy(this.keyUp, this), false);
	document.addEventListener('keydown', $.proxy(this.keyDown, this), false);

}
