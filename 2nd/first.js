import fetch from 'node-fetch';
import * as dotenv from 'dotenv';
dotenv.config()

fetch('https://adventofcode.com/2022/day/2/input', {
	headers: {
		cookie: process.env.ID
	}
})
	.then(res => res.text())
	.then(data => {
		const moves = data.split('\n');
		let points = 0;

		const shapeValues = {
			X: 1,
			Y: 2,
			Z: 3
		}
		//a,x=rock
		//b,y=paper
		//c,z=scissors

		moves.forEach(outcome => {
			if (!outcome) return null;
			switch (outcome) {
				case 'A Z':
				case 'B X':
				case 'C Y':
					points += shapeValues[outcome[2]]
					break;
				case 'A X':
				case 'B Y':
				case 'C Z':
					points += 3 + shapeValues[outcome[2]]
					break;
				default:
					points += 6 + shapeValues[outcome[2]]
					break;
			}
		});
		
		console.log(points)
	});
