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

    pairs.forEach((pair) => {
      const firstPair = [];
      const secondPair = [];
      const tasksPairs = pair.split(",");

      joinPairs(tasksPairs, firstPair, secondPair);

      const firstPairOverlap = firstPair.filter((task) =>
        secondPair.includes(task)
      );
      const secondPairOverlap = secondPair.filter((task) =>
        firstPair.includes(task)
      );

      if (
        (JSON.stringify(firstPairOverlap) === JSON.stringify(firstPair) ||
          JSON.stringify(secondPairOverlap) === JSON.stringify(secondPair)) &&
        tasksPairs[0].length
      ) {
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

const joinPairs = (tasksPairs, firstPair, secondPair) => {
  tasksPairs.forEach((tasks, index) => {
    const firstPairTasksArray = tasks.split("-");
    const secondPairTasksArray = tasks.split("-");
    if (index === 0) {
      getFullPairs(firstPairTasksArray, firstPair);
    } else {
      getFullPairs(secondPairTasksArray, secondPair);
    }
  });
};
