let canvas = document.querySelector('.canvas');
let dots = document.querySelectorAll('.canvas-dot');
let colorHolders = document.querySelectorAll('.color_holder');
let currentIndicators = document.querySelectorAll('.current_color');

//because in CSS the color made by using gradient and not the same of string color name
let colorsReplace = {
	'black' : 'hsla(0, 0%, 0%, 1)',
	'white' : 'hsla(0, 100%, 100%, 1)',
	'red' : 'hsla(0, 100%, 50%, 1)',
	'orange' : 'hsla(30, 100%, 50%, 1)',
	'yellow' : 'hsla(60, 100%, 50%, 1)',
	'green' : 'hsla(140, 100%, 50%, 1)',
	'blue' : 'hsla(200, 100%, 50%, 1)',
	'purple' : 'hsla(270, 100%, 50%, 1)',
	'brown' : 'hsla(16, 25%, 38%, 1)'
}
let currentColor = 'white';

let colorpicker = document.querySelector('#colorpicker');

//a listener for change color from the palette
for (color of colorHolders) {
	color.addEventListener('click', function(){
		let getColor = this.classList[color.classList.length - 1];	
		getColor =  getColor.replace(/(\w+)-\w+/, '$1');
		currentColor = 	colorsReplace[getColor];
		indicatorColor();
	})	
}


//a listener for colorize dot by click with using bubble
canvas.addEventListener('click', function(elem) {
	if(elem.target.classList.contains("canvas-dot")) {
		elem.target.style.backgroundColor = currentColor;
	}
});

//change color of indicators
function indicatorColor() {
	for (indicator of currentIndicators) {
		indicator.style.backgroundColor = currentColor;
	}	
}


//Bonus 1
//Improve the mouse so it behaves like a real paintbrush. 
//In other words, allow the user to paint by clicking and dragging across the canvas.

canvas.addEventListener('mousedown', startDraw);
canvas.addEventListener('mouseup', stopDraw);

function startDraw() {	
	for (dot of dots) {
		dot.addEventListener('mouseenter', changeColor);
	}
}

function stopDraw() {
	for (dot of dots) {
		dot.removeEventListener('mouseenter', changeColor);
	}
}

function changeColor() {
	this.style.backgroundColor = currentColor;
}

//Bonus 2
//Add a color picker which allows the user to select any brush color
colorpicker.addEventListener("change", selectNewColor);

function selectNewColor() {
	let userColor = colorpicker.value;
	let userColorHolder = document.querySelector('.users-div');

	userColorHolder.style.backgroundColor = userColor;
	userColorHolder.addEventListener('click', function() {
		currentColor = userColor;
		indicatorColor();
	});
}