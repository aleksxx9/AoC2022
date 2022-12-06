import fetch from "node-fetch";
import * as dotenv from "dotenv";
dotenv.config();

fetch("https://adventofcode.com/2022/day/6/input", {
  headers: {
    cookie: process.env.ID,
  },
})
  .then((res) => res.text())
  .then((signalString) => {
    let answer;
    signalString.split("").forEach((signal, index) => {
      if (!answer) {
        const ping = signalString.slice(index, index + 14).split("");

        const isSignalDublicate = !ping.filter((signal, index) => {
          return ping.indexOf(signal) !== index;
        }).length;

        if (isSignalDublicate) {
          answer = index + 14;
        }
      }
    });

    console.log(answer);
  });
