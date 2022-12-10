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
        const visibleTop = isVisibleTop(tree, treeLines, lineIndex, treeIndex);
        const visibleBottom = isVisibleBottom(
          tree,
          treeLines,
          lineIndex,
          treeIndex
        );
        const visibleRight = isVisibleRight(
          tree,
          treeLines,
          lineIndex,
          treeIndex
        );
        const visibleLeft = isVisibleLeft(
          tree,
          treeLines,
          lineIndex,
          treeIndex
        );

        return visibleTop || visibleBottom || visibleRight || visibleLeft;
      });
    });
    const answer = visibleTrees.reduce((sum, line) => {
      return sum + line.reduce((sum, tree) => (tree ? sum + tree : sum), 0);
    }, 0);
    console.log(answer);
  });

const isVisibleTop = (tree, treeLines, lineIndex, treeIndex) => {
  let isVisible = true;
  for (let i = lineIndex - 1; i >= 0; i--) {
    if (Number(treeLines[i][treeIndex]) >= Number(tree)) {
      isVisible = false;
    }
  }
  return isVisible;
};

const isVisibleBottom = (tree, treeLines, lineIndex, treeIndex) => {
  let isVisible = true;
  for (let i = Number(lineIndex) + 1; i < treeLines.length; i++) {
    if (Number(treeLines[i][treeIndex]) >= Number(tree)) {
      isVisible = false;
    }
  }
  return isVisible;
};

const isVisibleRight = (tree, treeLines, lineIndex, treeIndex) => {
  let isVisible = true;
  for (let i = treeIndex - 1; i >= 0; i--) {
    if (Number(treeLines[lineIndex][i]) >= Number(tree)) {
      isVisible = false;
    }
  }
  return isVisible;
};

const isVisibleLeft = (tree, treeLines, lineIndex, treeIndex) => {
  let isVisible = true;
  for (let i = Number(treeIndex) + 1; i < treeLines[0].length; i++) {
    if (Number(treeLines[lineIndex][i]) >= Number(tree)) {
      isVisible = false;
    }
  }
  return isVisible;
};
