function floodFill(elem){
	let oldColor = elem.target.style.backgroundColor;
	let indicatorsColor = document.querySelector('.current_color').style.backgroundColor;
	let checkDots = [];
	document.body.classList.add('unclickable');

	//Fix for filling the same color
	if (oldColor == indicatorsColor && oldColor != '' || currentColor == undefined) {
		document.body.classList.remove('unclickable');
		return false;
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