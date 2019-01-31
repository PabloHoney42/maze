function sortearDireção(availableDir) {
	let t = 0, l = 0, r = 0, b = 0
	
	availableDir.map(dir => {
		dir === 'T' ? t++ : false
		dir === 'R' ? r++ : false
		dir === 'L' ? l++ : false
		dir === 'B' ? b++ : false
	})

	if (t < l && t < r && t < b) {
		return 'T'
	} else if (l < t && l < r && l < b) {
		return 'L'
	} else if (r < t && r < l && r < b) {
		return 'R'
	} else if (b < t && b < l && b < r) {
		return 'B'
	}

	const top = parseInt(Math.random() * t * 2) === 0
	const left = parseInt(Math.random() * l * 2) === 0
	const right = parseInt(Math.random() * r * 2) === 0
	const bottom = parseInt(Math.random() * b * 2) === 0

	if (top) {
		return 'T'
	} else if (right) {
		return 'R'
	} else if (left) {
		return 'L'
	} else if (bottom) {
		return 'B'
	} else {
		return availableDir[parseInt(Math.random() * availableDir.length)]
	}
}

export { sortearDireção }