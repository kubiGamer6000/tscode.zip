document.body.onload = init;

if (!gameTitle) {
	const gameTitle: string = 'New Game';
}

document.head.title = gameTitle;

if (!endlessCanvas) {
	let endlessCanvas: boolean = false;
}

const canvas: HTMLElement = document.getElementById('canvas-id');

if (endlessCanvas) {
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
	window.onresize = () => {
		canvas.width = window.innerWidth;
		canvas.height = window.innerHeight;
	};
} else {
	canvas.width = 800;
	canvas.height = 600;
}
let context, ctx;
context = ctx = canvas.getContext('2d');

ctx.fillStyle = '#007acc';

let mouseX: number = 0;
let mouseY: number = 0;

let key_left: number = 37;
let key_up: number = 38;
let key_down: number = 40;
let key_a: number = 65;
let key_right: number = 39;
let key_z: number = 90;

let isKeyPressed: boolean[] = [];
for (let i = 0; i < 256; ++i) isKeyPressed = [ ...isKeyPressed, false ];

const reqAnimationFrame =
	window.requestAnimationFrame ||
	window.mozRequestAnimationFrame ||
	window.webkitRequestAnimationFrame ||
	window.msRequestAnimationFrame ||
	function(callback): void {
		setTimeout(callback, 1000 / 30);
	};

function reDraw(): void {
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	ctx.globalAlpha = 1;
	// draw grid
	//context.fillStyle = "#FF0000";
	ctx.font = '10px Arial';
	if (typeof gridSize != 'undefined' && gridSize >= 25) {
		ctx.fillText(0, 4, 10);
		ctx.beginPath();
		for (i = gridSize; i < canvas.width; i += gridSize) {
			ctx.moveTo(i, 0);
			ctx.lineTo(i, canvas.height);
			ctx.fillText(i, i + 4, 10);
		}
		for (i = gridSize; i < canvas.height; i += gridSize) {
			ctx.moveTo(0, i);
			ctx.lineTo(canvas.width, i);
			ctx.fillText(i, 4, i + 10);
		}
		ctx.stroke();
	}
	draw();
	reqAnimationFrame(reDraw);
}

function tryToLoad(img, backup): object {
	let result = {
		img: new Image(),
		color: backup
	};
	result.img.src = `images/${img}.png`;
	return result;
}
function drawImage(imgObj, x, y, xs, ys): void {
	try {
		if (xs) context.drawImage(imgObj.img, x, y, xs, ys);
		else context.drawImage(imgObj.img, x, y);
	} catch (e) {
		context.fillStyle = imgObj.color;
		if (!xs) {
			xs = 100;
			ys = 100;
		}
		context.fillRect(x, y, xs, ys);
	}
}

function areColliding(ax, ay, aw, ah, bx, by, bw, bh): boolean {
	if (bx <= ax + aw && ax <= bx + bw && by <= ay + ah && ay <= by + bh) return true;
	return false;
}

function init(): void {
	if ('ontouchstart' in window || navigator.maxTouchPoints) {
		isMobile = true;
		function updateMouse(e) {
			const touchObj = e.changedTouches[0];
			mouseX = parseInt(touchObj.pageX - canvas.offsetLeft);
			mouseY = parseInt(touchObj.pageY - canvas.offsetTop);
		}
		window.addEventListener('touchstart', (e) => {
			updateMouse(e);
			mousedown();
		});
		window.addEventListener('touchend', (e) => {
			updateMouse(e);
			mouseup();
		});
		window.addEventListener('touchmove', (e) => {
			updateMouse(e);
		});
	}
	window.addEventListener('mousemove', (e) => {
		mouseX = e.pageX - canvas.offsetLeft;
		mouseY = e.pageY - canvas.offsetTop;
	});
	if (mousemove) window.addEventListener('mousemove', mousemove);

	if (mouseup) window.addEventListener('mouseup', mouseup);

	if (mousedown) window.addEventListener('mousedown', mousedown);

	if (keydown)
		window.addEventListener('keydown', (e) => {
			isKeyPressed[e.keyCode] = true;
			keydown(e.keyCode);
		});
	else
		window.addEventListener('keydown', (e) => {
			isKeyPressed[e.keyCode] = true;
		});

	if (keyup)
		window.addEventListener('keyup', (e) => {
			isKeyPressed[e.keyCode] = false;
			keyup(e.keyCode);
		});
	else
		window.addEventListener('keyup', (e) => {
			isKeyPressed[e.keyCode] = false;
		});

	if (!draw) {
		reDraw = () => {
			context.clearRect(0, 0, canvas.width, canvas.height);
			context.globalAlpha = 1;
			context.fillStyle = '#fc5c65';
			context.font = '20px Arial';
			context.fillText('Error! Press F12 for more info.', 40, 40);
		};
	}
	reDraw();
	if (update) setInterval(update, 10);
}

// SUPERSET OF VERSION 9 USING TYPESCRIPT //
// Всеки код от версия 9+ (2016) ще работи тук //
// + Модернизиран код до ES8 стандарти + //
// Създатели: Ivo | Iashu //
// Модернизация: Dolan Bright //
