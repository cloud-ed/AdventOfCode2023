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
fs.readFile("calibrationStrings.txt", "utf-8", (err, data) => {
  if (err) {
    console.error(err);
    return;
  }
  // Split the file into an array of lines
  let textFileInput = data.split("\n");
  for (let line of textFileInput) {
    // Get first number or digit name and store it
    let matchedStrings = line.match(firstRegex);
    let calibrationNumber = matchedStrings[0];
    // Reverse the string
    let reverseLine = reverseString(line);
    // Get last number or digit name and store it
    matchedStrings = reverseLine.match(lastRegex);
    // Reverse the string back to normal and store it
    calibrationNumber += reverseString(matchedStrings[0]);
    // Replace any digit names into numbers
    calibrationNumber = calibrationNumber.replace(
      /zero|one|two|three|four|five|six|seven|eight|nine/gi,
      (match) => digitNames[match]
    );
    // Add the calibrationNumber to the total sum and print it
    sumOfNum += Number(calibrationNumber);
    console.log("Current Calibration Number: " + calibrationNumber);
  }
  console.log("The sum of all the calibration numbers is " + sumOfNum);
});
