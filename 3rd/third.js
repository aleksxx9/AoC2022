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
        const backpack = data.split('\n');
        let sumOfItems = 0;
        backpack.forEach(items => {
            const firstCompartment = items.substring(0, items.length / 2).split('');
            const secondCompartment = items.substring(items.length / 2, items.length).split('');

            const matchingItem = firstCompartment.filter(item => secondCompartment.includes(item))[0];

            if (!matchingItem) return null;
            if (matchingItem.toUpperCase() === matchingItem) {
                sumOfItems += matchingItem.charCodeAt(0) - 38;
            } else {
                sumOfItems += matchingItem.charCodeAt(0) - 96;
            }
        })
        console.log(sumOfItems);
    });
