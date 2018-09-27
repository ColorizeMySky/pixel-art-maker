let canvas = document.querySelector('.canvas');
let colorHolders = document.querySelectorAll('.color_holder');

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

//a listener for change color from the palette
for (color of colorHolders) {
	color.addEventListener('click', function(){
		let getColor = this.classList[color.classList.length - 1];	
		getColor =  getColor.replace(/(\w+)-\w+/, '$1');
		currentColor = 	colorsReplace[getColor];		
		return currentColor;		
	})	
}

//a listener for colorize table-data by click with using bubble
canvas.addEventListener('click', function(elem) {
	if(elem.target.classList.contains("canvas-dot")) {
		console.log(currentColor);
		elem.target.style.backgroundColor = currentColor;
	}
});