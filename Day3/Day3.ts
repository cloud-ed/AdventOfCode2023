import * as fs from "fs";

const numbers: number[] = [];
fs.readFile("./Day3/testStrings.txt", "utf-8", (err, data) => {
  if (err) {
    console.error("Error reading file: ", err);
    return;
  }
  const textFileInput = data.split("\n");
  for (const line of textFileInput) {
  }
});

let test1 = ["word", "banana"];
console.log(test1[0][1]);
