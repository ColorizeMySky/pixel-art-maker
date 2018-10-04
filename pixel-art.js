let canvas = document.querySelector('.canvas');
let dots = document.querySelectorAll('.canvas-dot');
let colorHolders = document.querySelectorAll('.color_holder');
let currentIndicators = document.querySelectorAll('.current_color');
let colorpicker = document.querySelector('#colorpicker');
let saveButton = document.querySelector('.save');
let loadButton = document.querySelector('.load');
let brushButton = document.querySelector('.brush');
let currentColor;

//because in CSS the color made by using gradient and not the same of string color name
//Should use hex-format for avoid a bug with fill the same color
let colorsReplace = {
	'black' : '#000000',
	'white' : '#ffffff',
	'red' : '#ff0000',
	'orange' : '#ff8000',
	'yellow' : '#ffff00',
	'green' : '#00ff55',
	'blue' : '#00aaff',
	'purple' : '#8000ff',
	'brown' : '#805649'
}


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
canvas.addEventListener('click', colorByPixel);

function colorByPixel(elem) {
	if(elem.target.classList.contains('canvas-dot')) {
		elem.target.style.backgroundColor = currentColor;
	}
}

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
colorpicker.addEventListener('change', selectNewColor);

function selectNewColor() {
	let userColor = colorpicker.value;
	let userColorHolder = document.querySelector('.users-div');

	userColorHolder.style.backgroundColor = userColor;
	userColorHolder.addEventListener('click', function() {
		currentColor = userColor;
		indicatorColor();
	});
}


//Bonus 3
//Research LocalStorage and make a way to Save and Load a drawing. 
//Research JSON.stringify and JSON.parse as a way to put the drawing into LocalStorage.
saveButton.addEventListener('click', function() {
	let picture = [];

	for (dot of dots) {
		picture.push(dot.style.backgroundColor);
	}

	localStorage.clear();
	localStorage.setItem('picture', JSON.stringify(picture));

	showNotice();
	setTimeout(loadLocalStorage, 1000);
});

loadButton.addEventListener('click', loadLocalStorage);

function loadLocalStorage() {
	let picture = JSON.parse(localStorage.getItem('picture'));

	for (let i = 0; i <= picture.length - 1; i++) {
		dots[i].style.backgroundColor = picture[i];
	}
}


//Bonus 4
//Create a fill tool that will flood fill boundaries with a chosen paint color.
brushButton.addEventListener('click', function() {
	brushButton.classList.toggle('fill');

	if (brushButton.classList.contains('fill')) {
		brushButton.textContent = 'Fill';
		canvas.removeEventListener('click', colorByPixel);
		canvas.removeEventListener('mousedown', startDraw);
		canvas.removeEventListener('mouseup', stopDraw);
		canvas.addEventListener('click', floodFill);
	}
	else {
		brushButton.textContent = 'Brush';
		canvas.removeEventListener('click', floodFill);
		canvas.addEventListener('click', colorByPixel);
		canvas.addEventListener('mousedown', startDraw);
		canvas.addEventListener('mouseup', stopDraw);
	}	
});


//Additional functional (the functions are in another file)
let clearButton = document.querySelector('.clear');
let defaultButton = document.querySelector('.default');

window.addEventListener("load", function() {
	setTimeout(drawDefault, 2000);
});

clearButton.addEventListener('click', clearAll);
defaultButton.addEventListener('click', drawDefault);


//Add notice 'Saved' (variable in another file)
function showNotice() {
	clearAll();

	for (let i = 0; i <= noticeMessage.length - 1; i++) {
		dots[i].style.backgroundColor = noticeMessage[i];
	}
}