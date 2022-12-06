import fetch from 'node-fetch';
import * as dotenv from 'dotenv';
dotenv.config()

fetch('https://adventofcode.com/2022/day/3/input', {
    headers: {
        cookie: process.env.ID
    }
})
    .then(res => res.text())
    .then(data => {
        const teamsBacks = data.match(/(?=[\s\S])(?:.*\n?){1,3}/g);
        let sumOfItems = 0;

        teamsBacks.forEach(items => {
            const backpackItems = items.split('\n');

            const matchingItem = backpackItems[0].split('').filter(backpackItem => {
                return backpackItems[1].includes(backpackItem) && backpackItems[2].includes(backpackItem);
            })[0]

            if (!matchingItem) return null;
            if (matchingItem.toUpperCase() === matchingItem) {
                sumOfItems += matchingItem.charCodeAt(0) - 38;
            } else {
                sumOfItems += matchingItem.charCodeAt(0) - 96;
            }
        })
        console.log(sumOfItems);
    });
