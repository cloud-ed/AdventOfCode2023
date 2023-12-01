const fs = require("fs");

// convert digitNames to actual numbers
const digitNames = {
  zero: 0,
  one: 1,
  two: 2,
  three: 3,
  four: 4,
  five: 5,
  six: 6,
  seven: 7,
  eight: 8,
  nine: 9,
};

// Regular and reversed search parameters
const firstRegex =
  /zero|one|two|three|four|five|six|seven|eight|nine|0|1|2|3|4|5|6|7|8|9/;

const lastRegex =
  /enin|thgie|neves|xis|evif|ruof|eerht|owt|eno|orez|0|1|2|3|4|5|6|7|8|9/;

// Reverses a string and returns the reversed string
function reverseString(stringInput) {
  let splitString = stringInput.split("");
  let reverseArray = splitString.reverse();
  let joinArray = reverseArray.join("");
  return joinArray;
}

// Start the sum total from zero and start the file reader
let sumOfNum = 0;
fs.readFile("part2_strings.txt", "utf-8", (err, data) => {
  if (err) {
    console.error(err);
    return;
  }
  let textFileInput = data.split("\n");
  for (let line of textFileInput) {
    let matchedStrings = line.match(firstRegex);
    let calibrationNumber = matchedStrings[0];
    let reverseLine = reverseString(line);
    matchedStrings = reverseLine.match(lastRegex);
    calibrationNumber += reverseString(matchedStrings[0]);
    calibrationNumber = calibrationNumber.replace(
      /zero|one|two|three|four|five|six|seven|eight|nine/gi,
      (match) => digitNames[match]
    );
    sumOfNum += Number(calibrationNumber);
    console.log("Current Calibration Number: " + calibrationNumber);
  }
  console.log("The sum of all the calibration numbers is " + sumOfNum);
});
