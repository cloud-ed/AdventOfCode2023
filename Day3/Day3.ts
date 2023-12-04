import * as fs from "fs";

const symbols = [
  "!",
  "@",
  "#",
  "$",
  "%",
  "^",
  "&",
  "*",
  "(",
  ")",
  "-",
  "_",
  "+",
  "=",
  "\\",
  "/",
];

fs.readFile("./Day3/testStrings.txt", "utf-8", (err, data) => {
  if (err) {
    console.error("Error reading file: ", err);
    return;
  }
  const textFileInput = data.split("\n");
  // Start zero-based line number counting
  let currentLineNumber = 0;
  let sumPartNumber = 0;
  let gearRatioSum = 0;

  // Check for gear ratios
  let allGears;
  for (let line of textFileInput) {
    allGears = line.match(/\*/g);
    if (allGears !== null) {
      for (const gear of allGears) {
        // Search through all surrounding positions of the gear to see if they are adjacent to two numberSets, store both the gear numbers
        const currentGearIndex = line.indexOf(gear);
        const gearRatioInput = textFileInput;
        const validGearNums: string[] = [];

        // Goes on the layer above, at and below the gear
        for (let y = -1; y <= 1; y++) {
          // Goes to the layer before, on and after the gear
          for (let x = -1; x <= 1; x++) {
            // Sets the xPos and yPos to the current search position
            const yPos = currentLineNumber + y;
            const xPos = currentGearIndex + x;

            // Check if the position is within bounds
            if (
              yPos >= 0 &&
              yPos < textFileInput.length &&
              xPos >= 0 &&
              xPos < line.length
            ) {
              if (!isNaN(Number(gearRatioInput[yPos][xPos]))) {
                const tempFirstHalfGearNumSet: string[] = [];
                const tempSecondHalfGearNumSet: string[] = [];

                // Collect numbers to the left (starts one to the left as to avoid accidentally removing the first number, which is used as an anchor point)
                for (let currentX = xPos - 1; currentX > 0; currentX--) {
                  console.log;
                  if (!isNaN(Number(gearRatioInput[yPos][currentX]))) {
                    tempFirstHalfGearNumSet.push(
                      gearRatioInput[yPos][currentX]
                    );
                    const lineArray = gearRatioInput[yPos].split("");
                    lineArray[currentX] = ".";
                    gearRatioInput[yPos] = lineArray.join("");
                  } else {
                    break;
                  }
                }

                // Collect numbers to the right (line.length is the size of the line, xPos + 1 makes xPos no longer zero-based and aligns it with the .length)
                for (
                  let currentX = xPos;
                  currentX < line.length - xPos + 1;
                  currentX++
                ) {
                  console.log;
                  if (!isNaN(Number(gearRatioInput[yPos][currentX]))) {
                    tempSecondHalfGearNumSet.push(
                      gearRatioInput[yPos][currentX]
                    );
                    const lineArray = gearRatioInput[yPos].split("");
                    lineArray[currentX] = ".";
                    gearRatioInput[yPos] = lineArray.join("");
                  } else {
                    break;
                  }
                }
                const firstHalfGearNumSet = tempFirstHalfGearNumSet
                  .reverse()
                  .join("");
                const secondHalfGearNumSet = tempSecondHalfGearNumSet.join("");
                validGearNums.push(firstHalfGearNumSet + secondHalfGearNumSet);
              }
            }
          }
        }

        // If valid add to the sum of part numbers
        if (validGearNums.length > 1) {
          console.log(
            `Gear at Line: ${currentLineNumber} X: ${currentGearIndex} has gear numbers:\n${validGearNums[0]} & ${validGearNums[1]}`
          );
          gearRatioSum += Number(validGearNums[0]) * Number(validGearNums[1]);
        }
      }
    }
    currentLineNumber++;
  }

  // Check for sum part numbers
  const partNumberInput = textFileInput;
  for (let line of partNumberInput) {
    // Split the string by '.', meaning you only get numbers and characters
    const lineItems = line.match(/\d+/g);

    // If the array is empty then ignore it
    if (lineItems !== null) {
      const lineNumbers = lineItems

        // Remove blank strings in array and any that are not numbers
        .filter((item) => item.trim() !== "")
        .filter((item) => !isNaN(Number(item)));

      // For each set of numbers in the line
      for (const numSet of lineNumbers) {
        const currentNumIndex = line.indexOf(numSet);

        // Search through all surrounding positions of the number set to see if they are adjacent to a symbol, if so return setIsValid as true
        let setIsValid = false;
        const surroundingCharacters: string[] = [];

        // Goes on the layer above, at and below the number set
        for (let y = -1; y <= 1; y++) {
          // Goes to the layer before, on and after the number set
          for (let x = -1; x <= numSet.length; x++) {
            // Sets the xPos and yPos to the current search position
            const yPos = currentLineNumber + y;
            const xPos = currentNumIndex + x;

            // Check if the position is within bounds
            if (
              yPos >= 0 &&
              yPos < partNumberInput.length &&
              xPos >= 0 &&
              xPos < line.length
            ) {
              surroundingCharacters.push(partNumberInput[yPos][xPos]);
            }
          }
        }

        // When it has collected the surrounding characters, replace the numbers with '.' to avoid later confusion
        const lineArray = line.split("");
        for (let i = 0; i < numSet.length; i++) {
          lineArray[currentNumIndex + i] = ".";
        }
        line = lineArray.join("");

        // If any of the surrounding spaces are valid characters, the number set is valid
        for (const character of surroundingCharacters) {
          if (symbols.some((symbol) => character.includes(symbol))) {
            setIsValid = true;
            break;
          }
        }

        // If valid add to the sum of part numbers
        if (setIsValid) {
          sumPartNumber += Number(numSet);
        }
      }
    }
    currentLineNumber++;
  }
  console.log(`Sum Part Number: ${sumPartNumber}`);
  console.log(`Gear Ratio Sum: ${gearRatioSum}`);
});
