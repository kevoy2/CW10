let ball = { 
	x: 10, 
	y: 10, 
	xInc: 3, 
	yInc: 3, 
	scale: 1, 
	check: true,
	img: document.getElementById("basketball"), 
	rotation: 0, 
	// Draw the ball 
	draw: function() {             
		this.rotation += 0.01;
		context.translate((this.x + this.img.width / 2), (this.y + this.img.height / 2));
		context.rotate(this.rotation);
		if(this.x < 0 || this.x + this.img.width > canvas.width || this.y < 0 || this.y + this.img.height > canvas.height) {
			if (this.check) {
				this.scale += 0.1;
				if (Math.floor(this.scale * 10) == 13) {
					this.check = false;
				}
			} else {
				this.scale -= 0.1;
				if (Math.floor(this.scale * 10) == 10) {
					this.check = true;
				}
			}
			console.log(Math.floor(this.scale * 10));
		}
		context.scale(this.scale, this.scale);
		context.translate((-1 * (this.x + this.img.width / 2)), (-1 * (this.y + this.img.height / 2)));
		context.drawImage(this.img, this.x, this.y); 
	}, 
	// Move the ball 
	move: function() { 
		// Increment x and y coordinates of img
		this.x += this.xInc; 
		this.y += this.yInc;
		// Bounce of the left and right canvas edges 
		if (this.x < 0 || this.x + this.img.width > canvas.width) { 
			this.xInc *= -1; 
		}
		// Bounce off the top and bottom canvas edges
		if (this.y < 0 || this.y + this.img.height > canvas.height) { 
			this.yInc *= -1; 
		}
	}
}; 
let canvas = document.getElementById("myCanvas"); 
let context = canvas.getContext("2d"); 
// Draw ball at starting position 
context.save(); 
ball.draw(); 
context.restore(); 
// Used to cancel animation  
let animFrameId; 
// Start the animation when the mouse is on the canvas 
canvas.addEventListener("mouseover", function(e) { 
	animFrameId = window.requestAnimationFrame(drawFrame); 
}); 
// Stop the animation when the mouse is moved off the canvas 
canvas.addEventListener("mouseout", function(e) { 
	window.cancelAnimationFrame(animFrameId); 
}); 
// Draw a single frame 
function drawFrame() {    
	context.clearRect(0, 0, canvas.width, canvas.height); 
	context.save();    
	ball.draw(); 
	ball.move();  
	context.restore(); 
	animFrameId = window.requestAnimationFrame(drawFrame); 
}