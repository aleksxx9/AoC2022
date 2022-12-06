import fetch from "node-fetch";
import * as dotenv from "dotenv";
dotenv.config();

fetch("https://adventofcode.com/2022/day/4/input", {
  headers: {
    cookie: process.env.ID,
  },
})
  .then((res) => res.text())
  .then((data) => {
    const pairs = data.split("\n");
    let overlapCount = 0;
    const fullPairsList = [];

    joinPairs(pairs, fullPairsList);

    fullPairsList.forEach((pairList) => {
      const overlappingArr = pairList.filter(
        (item, index) => pairList.indexOf(item) !== index
      );
      if (overlappingArr.length) {
        overlapCount++;
      }
    });

    console.log(overlapCount);
  });

const getFullPairs = (pair, taskPairs) => {
  for (let i = Number(pair[0]); i <= Number(pair[1]); i++) {
    taskPairs.push(i);
  }
};

const joinPairs = (pairs, fullPairsList) => {
  pairs.forEach((pair) => {
    const tasksPair = [];
    const tasksPairs = pair.split(",");

    tasksPairs.forEach((tasks) => {
      const taskPairArray = tasks.split("-");
      getFullPairs(taskPairArray, tasksPair);
    });

    fullPairsList.push(tasksPair);
  });
};
