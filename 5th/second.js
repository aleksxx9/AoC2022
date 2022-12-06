import fetch from "node-fetch";
import * as dotenv from "dotenv";
dotenv.config();

fetch("https://adventofcode.com/2022/day/5/input", {
  headers: {
    cookie: process.env.ID,
  },
})
  .then((res) => res.text())
  .then((data) => {
    const [stack, instructions] = data.split("\n\n");

    const orderedStack = getOrderedStack(stack);
    const instructionArr = getInstructions(instructions);

    instructionArr.forEach((inst) => {
      const instruction = inst.split(",");
      if (!instruction[0].length) return;
      const positionFrom = instruction[1].trim();
      const positionTo = instruction[2].trim();
      const temp = orderedStack[positionFrom].splice(0, instruction[0]);

      orderedStack[positionTo].unshift(...temp);
    });

    const answer = Object.values(orderedStack).map((item) => item[0]);

    console.log(answer.toString().replaceAll(",", ""));
  });

const getInstructions = (instructions) => {
  return instructions
    .split("\n")
    .map((instruction) =>
      instruction.replace("move ", "").replace(" from", ",").replace(" to", ",")
    );
};

const getOrderedStack = (stack) => {
  const orderedStack = {};
  const stackArr = [];

  stack.split("\n").forEach((stackItem) => {
    stackArr.push(
      stackItem.split(/(\s\s\s\s|\s\s\s|\s)/g).filter((item) => {
        if (!!item && item != "]" && item != "[" && item != " ") {
          return true;
        }
      })
    );
  });

  for (let i = 0; i <= stackArr.length; i++) {
    stackArr.slice(0, stackArr.length - 1).forEach((stack, ind) => {
      stack.forEach((stackItem, index) => {
        if (i === index && stackItem.trim()) {
          if (!orderedStack[i + 1]) orderedStack[i + 1] = [];
          orderedStack[i + 1].push(stackItem[1]);
        }
      });
    });
  }

  return orderedStack;
};
