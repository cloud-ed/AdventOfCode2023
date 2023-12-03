import * as fs from "fs";

fs.readFile("./Day3/testStrings.txt", "utf-8", (err, data) => {
  if (err) {
    console.error("Error reading file: ", err);
    return;
  }
  const textFileInput = data.split("\n");
  let lineNum = 0;
  for (const line of textFileInput) {
    const lineItems = line.split(/\./g);
    const lineNumbers = lineItems
      .filter((item) => item.trim() !== "")
      .filter((item) => !isNaN(Number(item)));
    if (lineNumbers.length > 0) {
      console.log(lineNumbers);
    }
    lineNum++;
  }
});

let test1 = ["word", "banana"];
console.log(test1[0][1]);
