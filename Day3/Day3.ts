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

fs.readFile("./Day3/engineStrings.txt", "utf-8", (err, data) => {
  if (err) {
    console.error("Error reading file: ", err);
    return;
  }
  const textFileInput = data.split("\n");
  // Start zero-based line number counting
  let currentLineNumber = 0;
  let sumPartNumber = 0;
  for (const line of textFileInput) {
    // Split the string by '.', meaning you only get numbers and characters
    const lineItems = line.split(/\./g);
    const lineNumbers = lineItems
      // Remove blank strings in array and any that are not numbers
      .filter((item) => item.trim() !== "")
      .filter((item) => !isNaN(Number(item)));

    // If the array is empty then ignore it
    if (lineNumbers.length > 0) {
      // For each set of numbers in the line
      for (const numSet of lineNumbers) {
        const currentNumIndex = line.indexOf(numSet);
        // Search through all surrounding positions of the number set to see if they are adjacent to a symbol, if so return setIsValid as true
        let setIsValid = false;
        const surroundingCharacters: string[] = [];
        // Goes on the layer above, at and below the number set
        for (let y = -1; y <= 1; y++) {
          // Goes to the layer before, on and after the number set
          for (let x = -1; x <= numSet.length + 1; x++) {
            // Sets the xPos and yPos to the current search position
            const yPos = currentLineNumber + y;
            const xPos = currentNumIndex + x;
            // Check if the position is within bounds
            if (
              yPos >= 0 &&
              yPos < textFileInput.length &&
              xPos >= 0 &&
              xPos < textFileInput[currentLineNumber].length
            ) {
              surroundingCharacters.push(textFileInput[yPos][xPos]);
            }
          }
        }
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
      currentLineNumber++;
    }
  }
  console.log(sumPartNumber);
});
