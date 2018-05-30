window.addEventListener("load", startGame);
const size = 5;
const type = "draw";
const color = "#000";
function startGame() {
	gameArea.start();
	document.getElementById("color").addEventListener("change", function() {
		gameArea.color = document.getElementById(this.id).value;
		gameArea.type = "draw";
	});
	document.getElementById("brush").addEventListener("click", function() {
		gameArea.type = "draw";
	});
	document.getElementById("eraser").addEventListener("click", function() {
		gameArea.type = "eraser";
	});
	document.getElementById("download").addEventListener("click", function() {
		document.getElementById(this.id).download = "image";
		document.getElementById(this.id).href = gameArea.canvas.toDataURL("image/jpeg");
	});
	document.getElementById("size").innerHTML = gameArea.size + " px";
}

var gameArea = {
	canvas: document.createElement("canvas")
}

gameArea.start = function() {
	this.canvas.width = document.documentElement.clientWidth;
	this.canvas.height = document.documentElement.clientHeight*(9/10);
	this.context = this.canvas.getContext("2d");
	document.getElementById("showGame").appendChild(this.canvas);
	this.context.fillStyle = "#ffffff";
	this.context.fillRect(0,0,this.canvas.width,this.canvas.height);
	this.color = color
	this.size = size;
	this.type = type;
	this.canvas.addEventListener("mousemove", function(e) {
		var o = gameArea.canvas.getBoundingClientRect();
		gameArea.x = e.pageX-o.left;
		gameArea.y = e.pageY-o.top;
		draw();
	});
	this.canvas.addEventListener("mousedown", function(e) {
		gameArea.moudeDown = true;
	});
	this.canvas.addEventListener("mouseup", function(e) {
		gameArea.moudeDown = false;
	});

	window.addEventListener("keydown", function(e) {
		gameArea.key = e.keyCode;
		keyboard();
	});
	window.addEventListener("keyup", function(e) {
		gameArea.key = false;
	})
	
}

function draw() {
	switch (gameArea.type) {
		case gameArea.type = "draw":
			if(gameArea.moudeDown == true) {
				ctx = gameArea.context;
				ctx.beginPath();
				ctx.fillStyle = gameArea.color;
				ctx.arc(gameArea.x,gameArea.y,gameArea.size,0,2*Math.PI);
				ctx.fill();
			}
			break;
			case gameArea.type = "eraser":
			if(gameArea.moudeDown == true) {
				ctx = gameArea.context;
				ctx.beginPath();
				ctx.fillStyle = "#fff";
				ctx.arc(gameArea.x,gameArea.y,gameArea.size,0,2*Math.PI);
				ctx.fill();
			}
			break;
	}
}

function keyboard() {
	if(gameArea.key) {
		if(gameArea.key == 171) {
			gameArea.size += 1;
			document.getElementById("size").innerHTML = gameArea.size + " px";
		}
		if(gameArea.key == 173) {
			gameArea.size -= 1;
			document.getElementById("size").innerHTML = gameArea.size; + " px"
		}
	}
}
