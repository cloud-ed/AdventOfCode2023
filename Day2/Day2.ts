import * as fs from "fs";

// console.log("Please input the amount of cubes of each colour there are in the bag.")
// const redLimit = prompt("Red cubes: ");
// const greenLimit = prompt("Green cubes: ")
// const blueLimit = prompt("Blue cubes: ")
/// The above code is what I would use for getting an input, but it wasn't working for my debug console and I don't really need to implement it to solve the problem.
const redLimit = 12;
const greenLimit = 13;
const blueLimit = 14;
// Create an array of the valid games by their number
const validGames: number[] = [];
fs.readFile("./Day2/gameStrings.txt", "utf-8", (err, data) => {
  if (err) {
    console.error("Error reading file: ", err);
    return;
  }
  const textFileInput = data.split("\n");
  let validGameSum = 0;
  let powerSum = 0;
  for (let line of textFileInput) {
    // Game is valid until proven otherwise
    let isValid = true;
    // removes \r from some strings
    if (line.includes("\r")) {
      line = line.replace(/\r/g, "");
    }
    // Splits the line into game number and the values
    const splitLine = line.split(": ");
    // Stores the current game number
    const currentGameNum = Number(splitLine[0].replace(/Game| /g, ""));
    // Stores the rest of the string
    const noGameNum = splitLine[1];
    // Removes spaces from the string and replaces the ';' with a ',' to make the string consistent
    const noSpaces = noGameNum.replace(/ /g, "");
    const listedColourNum = noSpaces.replace(/;/g, ",");
    const numsAndColours = listedColourNum.split(",");
    let redMax = 0;
    let greenMax = 0;
    let blueMax = 0;
    for (let i = 0; i < numsAndColours.length; i++) {
      if (numsAndColours[i].includes("red")) {
        const redNum = Number(numsAndColours[i].replace("red", ""));
        if (redMax < redNum) {
          redMax = redNum;
        }
        if (redNum > redLimit) {
          isValid = false;
        }
      } else if (numsAndColours[i].includes("green")) {
        const greenNum = Number(numsAndColours[i].replace("green", ""));
        if (greenMax < greenNum) {
          greenMax = greenNum;
        }
        if (greenNum > greenLimit) {
          isValid = false;
        }
      } else if (numsAndColours[i].includes("blue")) {
        const blueNum = Number(numsAndColours[i].replace("blue", ""));
        if (blueMax < blueNum) {
          blueMax = blueNum;
        }
        if (blueNum > blueLimit) {
          isValid = false;
          break;
        }
      }
    }
    const currentGamePower = redMax * greenMax * blueMax;
    console.log(
      `-=Game ${currentGameNum} =-\nCurrent game power: ${currentGamePower}`
    );
    powerSum += currentGamePower;
    if (isValid == true) {
      validGames.push(currentGameNum);
      validGameSum += currentGameNum;
    }
  }
  console.log(`The sum of all valid games is: ${validGameSum}`);
  console.log(`The sum power of all games minimum blocks is ${powerSum}`);
});
