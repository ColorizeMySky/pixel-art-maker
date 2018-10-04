function floodFill(elem){
	let oldColor = elem.target.style.backgroundColor;
	let checkDots = [];
	document.body.classList.add('unclickable');

	//Fix for filling the same color
	if (elem.target.style.backgroundColor != '') {
		//a bit of copipaste ^^
		function rgb2hex(rgb) {
		    rgb = rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
			    function hex(x) {
			        return ("0" + parseInt(x).toString(16)).slice(-2);
			    }
		    return "#" + hex(rgb[1]) + hex(rgb[2]) + hex(rgb[3]);
		}
		//

		let compareColor = rgb2hex(oldColor);

		if (compareColor == currentColor) {
			let partBlue = currentColor[5] + currentColor[6] + '';

			if (parseInt(partBlue, 16) < 255) {
				partBlue = parseInt(partBlue, 16) + 1;				
				partBlue = partBlue.toString(16);
			}
			else {
				partBlue = parseInt(partBlue, 16) - 1;
				partBlue = partBlue.toString(16);
			}

			if(partBlue.length < 2) {
				partBlue = '0' + partBlue;
			}

			currentColor = currentColor.substr(0, 5) + partBlue;
		}
	}
	//end: Fix for filling the same color

	checkDots.push(elem.target);

	while(checkDots.length > 0) {
		if(checkDots[0].nextElementSibling != null && checkDots[0].nextElementSibling.style.backgroundColor == oldColor) {
			let right = checkDots[0].nextElementSibling;

			if (!checkDots.includes(right)) {
				checkDots.push(right);
			}
			right.style.backgroundColor = currentColor;
		}
		
		if(checkDots[0].previousElementSibling != null && checkDots[0].previousElementSibling.style.backgroundColor == oldColor) {
			let left = checkDots[0].previousElementSibling;

			if (!checkDots.includes(left)) {
				checkDots.push(left);
			}
			left.style.backgroundColor = currentColor;
		}
		
		let row = checkDots[0].parentElement.children;
		for (var i = 0; i < row.length; i++) {
			if(row[i] == checkDots[0]) {
				var index = i;
				break;
			}
		}
		
		if(checkDots[0].parentElement.previousElementSibling != null) {
			if (checkDots[0].parentElement.previousElementSibling.children[index].style.backgroundColor == oldColor) {
				let up = checkDots[0].parentElement.previousElementSibling.children[index];

				if (!checkDots.includes(up)) {
					checkDots.push(up);
				}
				up.style.backgroundColor = currentColor;
			}
		}
		
		if(checkDots[0].parentElement.nextElementSibling != null) {
			if(checkDots[0].parentElement.nextElementSibling.children[index].style.backgroundColor == oldColor) {
				let down = checkDots[0].parentElement.nextElementSibling.children[index];

				if (!checkDots.includes(down)) {
					checkDots.push(down);
				}
				down.style.backgroundColor = currentColor;
			}
		}
	
		checkDots.shift();
	}

	setTimeout(function() {
		document.body.classList.remove('unclickable');
	}, 500);
}