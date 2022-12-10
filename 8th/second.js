import fetch from "node-fetch";
import * as dotenv from "dotenv";
dotenv.config();

fetch("https://adventofcode.com/2022/day/8/input", {
  headers: {
    cookie: process.env.ID,
  },
})
  .then((res) => res.text())
  .then((data) => {
    let treeLines = data.split("\n").splice(0, data.split("\n").length - 1);
    let visibleTrees = [];

    visibleTrees = treeLines.map((line, lineIndex) => {
      const trees = line.split("");

      return trees.map((tree, treeIndex) => {
        const top = scoreTop(tree, treeLines, lineIndex, treeIndex);
        const bottom = scoreBottom(tree, treeLines, lineIndex, treeIndex);
        const right = scoreRight(tree, treeLines, lineIndex, treeIndex);
        const left = scoreLeft(tree, treeLines, lineIndex, treeIndex);

        return top * bottom * right * left;
      });
    });

    const treeScores = visibleTrees.flat();
    const answer = treeScores.sort((a, b) => b - a)[0];

    console.log(answer);
  });

const scoreTop = (tree, treeLines, lineIndex, treeIndex) => {
  let isVisible = true;
  let score = 0;
  for (let i = lineIndex - 1; i >= 0; i--) {
    if (isVisible) score++;
    if (Number(treeLines[i][treeIndex]) >= Number(tree)) {
      isVisible = false;
    }
  }
  return score;
};

const scoreBottom = (tree, treeLines, lineIndex, treeIndex) => {
  let isVisible = true;
  let score = 0;
  for (let i = Number(lineIndex) + 1; i < treeLines.length; i++) {
    if (isVisible) score++;
    if (Number(treeLines[i][treeIndex]) >= Number(tree)) {
      isVisible = false;
    }
  }
  return score;
};

const scoreRight = (tree, treeLines, lineIndex, treeIndex) => {
  let isVisible = true;
  let score = 0;
  for (let i = treeIndex - 1; i >= 0; i--) {
    if (isVisible) score++;
    if (Number(treeLines[lineIndex][i]) >= Number(tree)) {
      isVisible = false;
    }
  }
  return score;
};

const scoreLeft = (tree, treeLines, lineIndex, treeIndex) => {
  let isVisible = true;
  let score = 0;
  for (let i = Number(treeIndex) + 1; i < treeLines[0].length; i++) {
    if (isVisible) score++;
    if (Number(treeLines[lineIndex][i]) >= Number(tree)) {
      isVisible = false;
    }
  }
  return score;
};
