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

		//a,x=rock/lose
		//b,y=paper/draw
		//c,z=scissors/win

		moves.forEach(outcome => {
			switch (outcome) {
				case 'B X':
					points += 1
					break;
				case 'C X':
					points += 2
					break;
				case 'A X':
					points += 3
					break;
				case 'A Y':
					points += 4
					break;
				case 'B Y':
					points += 5
					break;
				case 'C Y':
					points += 6
					break;
				case 'C Z':
					points += 7
					break;
				case 'A Z':
					points += 8
					break;
				case 'B Z':
					points += 9
					break;
			}
		});
		console.log(points)
	});
