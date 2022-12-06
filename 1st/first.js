import fetch from 'node-fetch';
import * as dotenv from 'dotenv';
dotenv.config()

fetch('https://adventofcode.com/2022/day/1/input', {
	headers: {
		cookie: process.env.ID
	}
})
	.then(res => res.text())
	.then(data => {
		const calories = data.split('\n')
		const answer = [];
		let elfsCalory = 0;
		calories.forEach(calory => {
			if (calory === '') {
				answer.push(elfsCalory);
				elfsCalory = 0;
			} else {
				elfsCalory += Number(calory);
			}
		});
		console.log(Math.max(...answer))
	});
