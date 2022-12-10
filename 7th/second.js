import fetch from "node-fetch";
import * as dotenv from "dotenv";
dotenv.config();

fetch("https://adventofcode.com/2022/day/7/input", {
  headers: {
    cookie: process.env.ID,
  },
})
  .then((res) => res.text())
  .then((data) => {
    const cmdLines = data.split("\n");
    cmdLines.splice(cmdLines.length - 1, cmdLines.length);

    const totalDiskSpace = 70000000;
    const requiredDisckSpace = 30000000;
    let systemStructure = { "/": {} };
    let currentDir = "";
    const dirFileSizes = {};

    getFileStruct(cmdLines, systemStructure, currentDir);
    getDirFileSizes(systemStructure, dirFileSizes);

    systemStructure = Object.entries(systemStructure).sort((keya, keyb) => {
      return keya[0].length - keyb[0].length;
    });
    Object.values(systemStructure).forEach((dir) => {
      const [dirName, dirContent] = dir;

      Object.entries(dirContent).forEach(([fileName, fileType]) => {
        if (fileType !== "dir") return;
        dirName.split(",").forEach((dir, index) => {
          const currentDirName = dirName
            .split(",")
            .slice(0, dirName.split(",").length - index)
            .join();

          if (currentDirName) {
            dirFileSizes[currentDirName] +=
              dirFileSizes[`${dirName},${fileName}`];
          }
        });
      });
    });

    const neededSpace = -(
      totalDiskSpace -
      Number(dirFileSizes["/"]) -
      requiredDisckSpace
    );

    const dirForDelete = Object.entries(dirFileSizes).filter(
      ([_, size]) => size >= neededSpace
    );
    const answer = dirForDelete.sort((a, b) => a[1] - b[1])[0][1];
    console.log(answer);
  });

const getFileStruct = (lines, systemStructure, currentDir) => {
  lines.forEach((line) => {
    if (line[0] === "$") {
      const command = line.slice(2, 4);
      if (command === "ls") return;
      line = line.slice(5, line.length);
      if (line === "..") {
        const dirArr = currentDir.split(",");
        currentDir = dirArr.splice(0, dirArr.length - 1).join();
      } else {
        if (currentDir.length) {
          currentDir += `,${line}`;
        } else {
          currentDir += `${line}`;
        }
      }
    } else {
      const [size, name] = line.split(" ");
      systemStructure[currentDir] = {
        ...systemStructure[currentDir],
        [name]: size,
      };
    }
  });
};

const getDirFileSizes = (systemStructure, dirFileSizes) => {
  Object.entries(systemStructure).forEach(([dir, files]) => {
    if (!dirFileSizes[dir]) dirFileSizes[dir] = 0;
    Object.values(files).forEach((size) => {
      if (size !== "dir") {
        dirFileSizes[dir] += Number(size);
      }
    });
  });
};
