/**
	Base class to represent a double buffered canvas object.
	Code by Rob Kleffner, 2011
*/

Enjine.GameCanvas = function() {
	this.Canvas = null;
	this.Context2D = null;
	this.BackBuffer = null;
	this.BackBufferContext2D = null;
};

Enjine.GameCanvas.prototype = {
	Initialize: function(canvasId, resWidth, resHeight) {
		this.Canvas = document.getElementById(canvasId);
		this.Context2D = this.Canvas.getContext("2d");

		this.Canvas.width = window.innerWidth;
		this.Canvas.height = window.innerHeight;

		this.BackBuffer = document.createElement("canvas");
		this.BackBuffer.width = resWidth;
		this.BackBuffer.height = resHeight;
		this.BackBufferContext2D = this.BackBuffer.getContext("2d");

		window.addEventListener("resize", () => {
			this.Canvas.width = window.innerWidth;
			this.Canvas.height = window.innerHeight;
		});
	},

	BeginDraw: function() {
		this.BackBufferContext2D.clearRect(0, 0, this.BackBuffer.width, this.BackBuffer.height);
		this.Context2D.clearRect(0, 0, this.Canvas.width, this.Canvas.height);
	},

	EndDraw: function() {
		this.Context2D.imageSmoothingEnabled = false;
		this.Context2D.drawImage(
			this.BackBuffer,
			0, 0, this.BackBuffer.width, this.BackBuffer.height,
			0, 0, this.Canvas.width, this.Canvas.height
		);
	}
};